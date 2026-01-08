"use server";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const { 
  //to shorten the name
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    //Create a session for an existing user
    const response = await account.createEmailPasswordSession(email, password);

    //Save the session secret in the same cookie
    cookies().set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(response);
  } 
  catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;

  let newUserAccount;
  try {
    //Use Appwrite to create a user account.
    const { account, database } = await createAdminClient();

    //Create a new Appwrite user (admin power)
    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if(!newUserAccount) throw new Error('Error creating user')

      const dwollaCustomerUrl = await createDwollaCustomer({
        ...userData,
        type: 'personal'
      })

      if(!dwollaCustomerUrl) throw new Error ('Error creating Dwolla customer')

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl); 
        const newUser = await database.createDocument(
          DATABASE_ID!,
          USER_COLLECTION_ID!,
          ID.unique(),
          {
            ...userData,
            userId: newUserAccount.$id,
            dwollaCustomerId,
            dwollaCustomerUrl
          }
          
        )


    //Log that user in (create a session)
    const session = await account.createEmailPasswordSession(email, password);

    //Store the session secret in an HTTP-only cookie
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } 
  catch (error) {
    console.error("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } 
  catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  try{
    const {account} = await createSessionClient();  //Connects to Appwrite, asynchronous so use promise
    await account.deleteSession('current');  //Invalidate this session ID.
    cookies().delete('appwrite-session');  //Removes cookies from the user's browser.
  }
  catch(error){
    return null;
  }
}
//If the account client relies on reading the cookie from the request to authenticate the deleteSession call, 
// deleting the cookie first might cause the server request to fail (Unauthorized).

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = { //To generate new link token
      user: {
        client_user_id: user.$id
      },
        client_name: user.name,
        products: ['auth'] as Products[],
        language: 'en',
        country_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ linkToken: response.data.link_token})
  } catch (error) {
    console.log(error);
  }
}

export const createBankAccount = async ({
userId,
bankId,
accountId,
accessToken,
fundingSourceUrl,
shareableId}: createBankAccountProps) => {  
  //Now we can use the props to create a bank account.
  //We create a Bank Account as a document within our database. (AppWrite)
  try {
    const { database } = await createAdminClient(); //This is the appwrite client allowing us to create new document.
    const bankAccount = await database.createDocument(
      //It's a method you call on the database model, that allows you to create a new document and add it to a specific collection.
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    );    
    //Once we get the bank account back we can return it to the front-end
    return parseStringify(bankAccount);
  } catch (error) {
    
  }
}

export const exchangePublicToken = async ({publicToken,user}: exchangePublicTokenProps) => {
  try {
    //Exchange public token for access token and Item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    })
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet(
      {
        access_token:accessToken,
      }
    );

    //After we get the account response we can get the account data.
    const accountData = accountsResponse.data.accounts[0];
    
    //Create a processor token for Dwolla using the access token & account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum,
    };
    //After we've the request token we can generate a processor token 
    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;
    //Now we've to fund our account
    //Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name (Connecting the payment processing functionality to our specific bankaccount so that,
    // it can send and recieve funds.)
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    //If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    //If funding source exists we wanna create a bank account
    //Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and sharble ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });
    //once we create a new Bank Account we Revalidate the path to reflect the changes
    revalidatePath("/");

    //Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    })
  } catch (error) {
    console.error("An error occurred while creatin exchanging token:",error);
  }
}
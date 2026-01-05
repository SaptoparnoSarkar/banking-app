'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async ({email,password}: signInProps) => {
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
    } catch (error) {
        console.error('Error',error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData;
    try {
        //Use Appwrite to create a user account.
        const { account } = await createAdminClient();

        //Create a new Appwrite user (admin power)
        const newUserAccount = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`
    );

    //Log that user in (create a session)
    const session = await account.createEmailPasswordSession(email,password);

    //Store the session secret in an HTTP-only cookie
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
  });

  return parseStringify(newUserAccount);
}
    catch (error) {
        console.error('Error',error)
    }
}



export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
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
/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import {z} from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
  

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type:String) => z.object({
  // Sign-up
  firstName: type === 'sign-in' ? z.string().optional() : 
  z.string().min(3, "First Name must be at least 3 characters")
  .regex(/^[A-Za-z]+$/, "First Name must contain only letters"),

  lastName: type === 'sign-in' ? z.string().optional() : 
  z.string().min(3, "Last Name must be at least 3 characters")
  .regex(/^[A-Za-z]+$/, "Last Name must contain only letters"),

  address1: type === 'sign-in' ? z.string().optional() : 
  z.string().max(50, "Cannot exceed more than 50 characters"),

  city: type === 'sign-in' ? z.string().optional():
  z.string().max(15, "Cannot exceed more than 15 characters"),

  state: type === 'sign-in' ? z.string().optional() : 
  z.string().max(3, "Cannot exceed more than 3 characters").min(2, "Cannot be less than 2 characters"),

  postalCode: type === 'sign-in' ? z.string().optional() :
  z.string().min(3, "Cannot be less than 3 digits")
  .max(6, "Cannot exceed more than 6 digits")
  .regex(/^\d+$/, "Must contain numbers only"),

  dateOfBirth: type === 'sign-in' ? z.string().optional() : 
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD format"),

  ssn: type === 'sign-in' ? z.string().optional() :
  z.string().max(15).regex(/^\d+$/, "SSN must contain numbers only"),

  // Sign-in && Sign-up
  email: z.string().email("Please enter a valid email address"),
  password: z.
  string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be at most 32 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/\d/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export const paymentFormSchema = () => z.object
({
    senderBank: z.string().min(1, "Please select a valid bank account"),
    name: z.string().min(4, "Transfer note is too short"),
    email: z.string().email("Please enter a valid email address"),
    sharebleId: z.string().min(1, "Recipient account is required"),
    amount: z.string()
      .regex(/[0-9]/, "Please enter a valid number")
      .min(1, "Amount must be at least 10 rupees")
      .max(100000, "Amount cannot exceed 1 lakh rupees"),
  });

export const getCustomCategory = (category:string):string => {
  const CATEGORY_MAP: Record<string, string> = {
    FOOD_AND_DRINK: "Food & Entertainment",
    TRANSPORTATION: "Commute",
    TRAVEL: "Commute",
    ENTERTAINMENT: "Food & Entertainment",
    INCOME: "Transfer",
    TRANSFER_OUT: "Transfer",
    Transfer: "Transfer",
    LOAN_PAYMENTS: "Transfer",
  };
  // Fallback: formats "LOAN_PAYMENTS" to "Loan Payments"
  return (
    CATEGORY_MAP[category] ||
    category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  );
}
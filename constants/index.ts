
export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  }, 
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  Commute: {
    bg: "bg-blue-25 dark:bg-vaultflow-commute/20",
    circleBg: "bg-blue-100 dark:bg-vaultflow-commute",
    text: {
      main: "text-blue-900 dark:text-vaultflow-white",
      count: "text-blue-700 dark:text-vaultflow-muted",
    },
    progress: {
      bg: "bg-blue-100 dark:bg-vaultflow-commute/10",
      indicator: "bg-blue-700 dark:bg-vaultflow-commute",
    },
    icon: "/icons/commute-sharp.svg",
  },
  "Food & Entertainment": {
    bg: "bg-pink-25 dark:bg-vaultflow-transfer/20",
    circleBg: "bg-pink-100 dark:bg-vaultflow-transfer",
    text: {
      main: "text-pink-900 dark:text-vaultflow-white",
      count: "text-pink-700 dark:text-vaultflow-muted",
    },
    progress: {
      bg: "bg-pink-100 dark:bg-vaultflow-transfer/10",
      indicator: "bg-pink-700 dark:bg-vaultflow-transfer",
    },
    icon: "/icons/shopping-bag.svg",
  },
  default: {
    bg: "bg-success-25 dark:bg-vaultflow-success/20",
    circleBg: "bg-success-100 dark:bg-vaultflow-success",
    text: {
      main: "text-success-900 dark:text-vaultflow-white",
      count: "text-success-700 dark:text-vaultflow-muted",
    },
    progress: {
      bg: "bg-success-100 dark:bg-vaultflow-success/10",
      indicator: "bg-success-700 dark:bg-vaultflow-success",
    },
    icon: "/icons/coins.svg",
  },
};

export const transactionCategoryStyles = {
  "Food & Entertainment": {
    borderColor: "border-pink-600 dark:border-vaultflow-transfer",
    backgroundColor: "bg-pink-500 dark:bg-vaultflow-transfer",
    textColor: "text-pink-700 dark:text-orange-50",
    chipBackgroundColor: "bg-pink-500/10 dark:bg-none",
  },
  Transfer: {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700 dark:text-success-50",
    chipBackgroundColor: "bg-[#ECFDF3] dark:bg-transparent ",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit dark:bg-none",
  },
  Income: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit dark:bg-none",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7] dark:bg-none",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  Commute: {
    borderColor: "border-[#0047AB]",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700 dark:text-blue-50",
    chipBackgroundColor: "bg-blue-25 dark:bg-transparent",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit dark:bg-none",
  },
};

import React from "react";
import Image from "next/image";
import { logoutAccount } from "@/lib/server actions/user.actions";
import { useRouter } from "next/navigation";


const Footer = ({ user, type = "desktop" }: FooterProps) => {

  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) {
      router.push("/sign-in");
    }
  }

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name_mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700 dark:text-gray-200">
          {user?.firstName[0]}
        </p>
      </div>

      <div
        className={type === "mobile" ? "footer_email_mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate text-gray-700 font-semibold dark:text-white">
          {user?.firstName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600 dark:text-vaultflow-muted">
          {user.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" fill alt="logout" className="dark:brightness-[3]"/>
      </div>
    </footer>
  );
};

export default Footer;

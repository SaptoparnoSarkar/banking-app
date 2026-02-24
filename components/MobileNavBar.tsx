"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";
import { ThemeToggle } from "./ThemeToggle";

const MobileNavBar = ({ user }: MobileNavProps) => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <div className="bg-white dark:bg-white p-2 rounded-[16px]">
            <Image
              src="/icons/hamburger.svg"
              width={30}
              height={30}
              alt="menu"
              className="cursor-pointer"
            />
          </div>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="border-none bg-white dark:bg-vaultflow-sidebar"
        >
          <Link
            href="/"
            className="cursor-pointer flex items-center px-4 gap-1"
          >
            <Image
              src="/icons/logoBank2.svg"
              width={34}
              height={34}
              alt="VaultFlow Logo"
            />
            <h1 className="text-26 font-ibm-plex-serif pl-2 font-bold text-[#2c4baa] dark:text-vaultflow-white">
              VaultFlow
            </h1>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex flex-col h-full gap-6 pt-16 text-white">
                {/* Links for all the other pages for our App. */}
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathName === item.route ||
                    pathName.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn("mobilenav-sheet_close", {
                          "bg-bankGradient dark:bg-vaultflow-accent": isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                            "dark:brightness-[3]": !isActive,
                          })}
                        />
                        <p
                          className={cn(
                            "text-16 font-semibold text-black-1 dark:text-vaultflow-white",
                            {
                              "!text-white": isActive,
                            },
                          )}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                <PlaidLink user={user} />
              </nav>
            </SheetClose>
            <div className="mt-auto flex flex-col gap-2">
              <div className="px-3 xl:px-0">
                <ThemeToggle />
              </div>
              <Footer user={user} type="mobile" />
            </div>

            {/* type mobile for mobile and default is for desktop */}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};
export default MobileNavBar;

'use client';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from "./Footer";
import PlaidLink from './PlaidLink';
import { ThemeToggle } from './ThemeToggle';

const Sidebar = ({ user }: SiderbarProps) => {

  const pathName = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        {/* Logo Link */}
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <div className="bg-white dark:bg-white p-2 rounded-[16px]">
            <Image
              src="/icons/logoBank2.svg"
              width={34}
              height={34}
              alt="VaultFlow Logo"
              className="size-[30px] max-xl:size-14 mt-[1px] max-xl:ml-[47px]"
            />
          </div>
          <h1 className="sidebar-logo">VaultFlow</h1>
        </Link>

        {/* Navigation Links */}
        {sidebarLinks.map((element) => {
          const isActive =
            pathName === element.route ||
            pathName.startsWith(`${element.route}/`);

          return (
            <Link
              href={element.route}
              key={element.label}
              className={cn("sidebar-link", {
                "bg-bankGradient dark:bg-vaultflow-accent": isActive,
              })} >
              <div className="relative size-6">
                <Image
                  src={element.imgURL}
                  alt={element.label}
                  fill
                  className={cn({
                    "brightness-[3] invert-0 ": isActive,
                    "dark:brightness-[3]": !isActive,
                  })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {element.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user} />
      </nav>
      <div className="mt-auto flex flex-col gap-2">
        <div className="px-3 xl:px-0">
          <ThemeToggle />
        </div>
        <div className="border-t border-gray-300 pt-2">
          <Footer user={user} />
        </div>
      </div>
    </section>
  );
};

export default Sidebar

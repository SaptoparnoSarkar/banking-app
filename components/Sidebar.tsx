'use client';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from "./Footer";
import PlaidLink from './PlaidLink';

const Sidebar = ({ user }: SiderbarProps) => {

  const pathName = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        {/* Logo Link */}
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="FlexBank Logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">FlexBank</h1>
        </Link>

        {/* Navigation Links */}
        {sidebarLinks.map((element) => {
          const isActive =
            pathName === element.route || pathName.startsWith(`${element.route}/`);

          return (
            <Link
              href={element.route}
              key={element.label}
              className={cn("sidebar-link", { "bg-bankGradient": isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={element.imgURL}
                  alt={element.label}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {element.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink 
          user = {user}
        />
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar

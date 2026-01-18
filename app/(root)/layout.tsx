import MobileNavBar from "@/components/MobileNavBar";
import Sidebar from "@/components/Sidebar";
import Image from 'next/image'
import { getLoggedInUser } from "@/lib/server actions/user.actions";
import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar 
      user={loggedIn}
      />
      
      {/* For Smaller Screens */}
      <div className="flex flex-col size-full">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="menu" />
          <div>
            <MobileNavBar 
            user={loggedIn}
            />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
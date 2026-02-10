'use client'
import Image from "next/image";
import Snowfall from "react-snowfall";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter dark:bg-white dark:text-vaultflow-black">
      {children}
      <div className="auth-asset relative overflow-hidden">
        <div className="absolute inset-0 z-50 pointer-events-none w-screen h-screen">
          <Snowfall
            color="blue"
            snowflakeCount={200}
          />
        </div>
        <div>
          <Image
            src="/icons/auth-image.png"
            alt="Auth Image"
            width={600}
            height={600}
            className="border-t-4 border-l-4 border-b-4 border-cyan-900"
          />
        </div>
      </div>
    </main>
  );
}

import FaviconSwitcher from "@/components/favicon-switcher";
import { ThemeToggle } from "@/components/theme-toggle-button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "안성진",
  description: "웹 개발자 안성진 입니다.",
  openGraph: {
    images: "/og.png",
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang={"ko"} className="dark">
      <head>
        <link rel="shortcut icon" href="/favicon-light.svg" />
        <link rel="icon" href="/favicon-light.svg" />
        <link rel="apple-touch-icon" href="/favicon-light.svg" />
      </head>
      <body>
        <main
          className={cn(
            "pt-14 pb-4 px-40",
            "flex items-center justify-between",
            "relative break-words h-dvh min-h-screen max-md:p-4 bg-transparent max-sm:pt-20",
            "bg-[radial-gradient(#88888830_1px,transparent_1px)] [background-size:24px_24px]"
          )}
        >
          {children}
          <ThemeToggle />
        </main>
        <FaviconSwitcher />
      </body>
    </html>
  );
};

export default RootLayout;

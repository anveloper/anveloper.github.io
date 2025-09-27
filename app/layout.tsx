import FaviconSwitcher from "@/components/favicon-switcher";
import { NavBar } from "@/components/nav-bar";
import { Providers } from "@/components/providers";
import { ThemeToggle } from "@/components/theme-toggle-button";
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
        <Providers>
          {children}
          <ThemeToggle />
          <NavBar />
        </Providers>
        <FaviconSwitcher />
      </body>
    </html>
  );
};

export default RootLayout;

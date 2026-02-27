import FaviconSwitcher from "@/components/favicon-switcher";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "안성진 | Full-Stack Developer",
    template: "%s | 안성진",
  },
  description: "언어로 세상을 표현하는 개발자, 안성진입니다. Full-Stack Developer & UX Team Lead",
  metadataBase: new URL("https://anveloper.dev"),
  openGraph: {
    title: "안성진 | Full-Stack Developer",
    description: "언어로 세상을 표현하는 개발자",
    url: "https://anveloper.dev",
    siteName: "안성진 포트폴리오",
    locale: "ko_KR",
    type: "website",
    images: "/og.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "안성진 | Full-Stack Developer",
    description: "언어로 세상을 표현하는 개발자",
    images: "/og.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "kpYkq06WB0cQDLByVOdZD_5HXLkbxzFAvQKQ-Rp9sKY",
  },
};

const themeInitScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var valid = ['light', 'dark', 'korean', 'terminal'];
      var root = document.documentElement;
      root.classList.remove('light', 'dark', 'korean', 'terminal');
      if (valid.indexOf(theme) !== -1) {
        root.classList.add(theme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      }
    } catch (e) {}
  })();
`;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preload" href="/fonts/PretendardVariable-subset.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.shields.io" />
        <link rel="shortcut icon" href="/favicon-light.svg" />
        <link rel="icon" href="/favicon-light.svg" />
        <link rel="apple-touch-icon" href="/favicon-light.svg" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
          <NavBar />

          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        <FaviconSwitcher />
      </body>
    </html>
  );
};

export default RootLayout;

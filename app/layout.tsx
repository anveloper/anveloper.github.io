import FaviconSwitcher from "@/components/favicon-switcher";
import { NavBar } from "@/components/nav-bar";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "안성진 | Full-Stack Developer",
    template: "%s | 안성진",
  },
  description: "언어로 세상을 표현하는 개발자, 안성진입니다. Full-Stack Developer & UX Team Lead",
  metadataBase: new URL("https://anveloper.github.io"),
  openGraph: {
    title: "안성진 | Full-Stack Developer",
    description: "언어로 세상을 표현하는 개발자",
    url: "https://anveloper.github.io",
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
};

const themeInitScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="shortcut icon" href="/favicon-light.svg" />
        <link rel="icon" href="/favicon-light.svg" />
        <link rel="apple-touch-icon" href="/favicon-light.svg" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Providers>
          <NavBar />

          <main className="flex-1 flex flex-col">{children}</main>
        </Providers>
        <FaviconSwitcher />
      </body>
    </html>
  );
};

export default RootLayout;

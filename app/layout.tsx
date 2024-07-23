import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = { title: "Anveloper", description: "안밸로퍼 블로그" };

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="ko">
      <body className={noto.className}>
        <div className={"blur-layer"}></div>
        <div className={"container"}>{children}</div>
      </body>
    </html>
  );
};
export default RootLayout;

import { Kanit, Noto_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header"

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-kanit",
});

const notoLooped = Noto_Sans_Thai_Looped({
  subsets: ["thai"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-looped",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body
        className={`${kanit.variable} ${notoLooped.variable} font-noto-looped`}
      >
        <Header />

        {children}
      </body>
    </html>
  );
}

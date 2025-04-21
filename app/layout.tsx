import type { Metadata } from "next";
import { Geist, Geist_Mono, Rowdies } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rowdies = Rowdies({
  variable: "--font-rowdies",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Wishlisty",
  description: "Create your WishList",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rowdies.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Rowdies } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Wishlisty - Save & Remind Yourself to Buy What You Want",
  description:
    "Save products you desire, set a reminder date, and receive an email when it’s time to purchase them.",
  keywords: [
    "wishlist",
    "reminder",
    "shopping",
    "buy",
    "wishlist app",
    "reminder app",
    "wishlisty",
  ],
  openGraph: {
    title: "Wishlisty - Never Forget What You Want to Buy",
    description:
      "Save products you desire, set a reminder, and get an email when it's time to make a purchase. Stay on top of your wish list!",
    url: "https://wishlisty.rohitjuyal.com",
    siteName: "Wishlisty",
    images: [
      {
        url: "https://wishlisty.rohitjuyal.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wishlisty - Save and Remember Your Desired Products",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wishlisty - Save & Remind Yourself to Buy What You Want",
    description:
      "Never forget the products you want to buy! Set reminders and get notified via email.",
    image: "https://wishlisty.rohitjuyal.com/assets/og-image.png",
    creator: "@rohitjuyal21",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rowdies.variable} ${playfair.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}

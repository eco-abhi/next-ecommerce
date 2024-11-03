import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/layout/Footer";
import { WixClientContextProvider } from "../context/wixContext";
import MergedNavbar from "@/components/layout/MergedNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
};

const messages = [
  "Welcome to our store! 🎉",
  "Get 20% off on all winter collection! ❄️",
  "Free shipping on orders above $50 📦",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#FCFAF8]"}>
        <WixClientContextProvider>
          <MergedNavbar messages={messages} />
          {children}
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}

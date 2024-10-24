import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Nanobar from "@/components/Nanobar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#FCFAF8]"}>
        <Nanobar messages={["Welcome to Lama Dev", "Enjoy your stay!"]} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

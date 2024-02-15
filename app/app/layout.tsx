import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getMetaTitle } from "@/utils/metadata-utils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: getMetaTitle(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="max-w-screen-sm mx-auto px-4 py-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

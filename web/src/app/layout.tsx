import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My one mile",
  description: "Changing our country, one mile at a time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/cc0e184fdf.js" ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getTheme } from "./actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My one mile",
  description: "Changing our country, one mile at a time!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/cc0e184fdf.js" ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body className={`inter.className theme-${theme}`}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const monserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Sales Studios",
  description: "Developed by Qazi Adan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          className={monserrat.className}
        >
          <EdgeStoreProvider> {children}</EdgeStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

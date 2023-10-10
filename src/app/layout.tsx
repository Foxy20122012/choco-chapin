// RootLayout.js
"use client";
// RootLayout.js
import React from "react";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import AllContexts from "@/context/AllContext";
import BtnAppBar from "@/components/appBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex  md:my-12 md:ml-4">
          <AllContexts>
            <BtnAppBar />
            {children}
          </AllContexts>
        </div>
      </body>
    </html>
  );
}

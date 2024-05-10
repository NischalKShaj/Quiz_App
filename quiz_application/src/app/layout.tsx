"use client";
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { Inter } from "next/font/google";
import "./globals.css";
import useQuiz from "./store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  quiz,
}: {
  children: React.ReactNode;
  quiz: React.ReactNode;
}) {
  const config = useQuiz((state) => state.config);
  const render = config.status ? quiz : children;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{render}</ThemeProvider>
      </body>
    </html>
  );
}

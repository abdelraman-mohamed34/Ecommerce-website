'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import Header from "./header/Header";
import Footer from "./Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative pb-[600px] md:pb-[310px] h-full min-h-screen`}
      >
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

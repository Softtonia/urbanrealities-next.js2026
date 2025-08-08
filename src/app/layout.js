// app/layout.js

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/Components/Navebar/Navbar";
import Footer from "@/Components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "@/Components/BootstrapClient";
import { SiteSettingsProvider } from "@/Components/mycontext/siteSettingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const res = await fetch(`${process.env.LARAVEL_API_BASE_URL}/api/site-setting`, {
    cache: 'no-store',
    headers: {
      "X-Client-ID": process.env.X_CLIENT_ID,
      "X-Client-Secret": process.env.X_CLIENT_SECRET,
      "Content-Type": "application/json",
      Origin: process.env.NEXT_PUBLIC_API_URL,
    }
  });

  const settings = await res.json();

  const title = settings?.site_name || 'UrbanRealitiess';
  const description = settings?.site_short_description || 'We build your dream';
  const favicon = settings?.favicon?.trim()
    ? settings.favicon.startsWith('http') || settings.favicon.startsWith('/')
      ? settings.favicon
      : `/uploads/${settings.favicon}`
    : '/default-favicon.png';

  return {
    title,
    description,
    icons: {
      icon: [
        {
          url: favicon,
          type: 'image/png',
          sizes: '32x32',
        },
      ],
      shortcut: favicon,
      apple: favicon,
    },
    other: {
      'msapplication-TileImage': favicon,
    },
  };
}

export default async function RootLayout({ children }) {
  const res = await fetch(`${process.env.LARAVEL_API_BASE_URL}/api/site-setting`, {
    cache: 'no-store',
    headers: {
      "X-Client-ID": process.env.X_CLIENT_ID,
      "X-Client-Secret": process.env.X_CLIENT_SECRET,
      "Content-Type": "application/json",
      Origin: process.env.NEXT_PUBLIC_API_URL,
    }
  });
  const response = await res.json();

  const settings = response.data

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-pFZpXtdTQGO4A5YxRgqVhxRyGZhTzFrMRcCNnU5n0t6zq8LkbAs6Sje4oqGBlX8hYuLxRBToIb9lSk65yYFbRw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="antialiased">
        <SiteSettingsProvider initialSettings={settings}>
          <BootstrapClient />
          <Navbar  />
          <main>{children}</main>
          <Footer  />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}

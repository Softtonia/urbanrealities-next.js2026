// app/layout.js
export const dynamic = 'force-dynamic';
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/Components/Navebar/Navbar";
import Footer from "@/Components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "@/Components/BootstrapClient";
import { SiteSettingsProvider } from "@/Components/mycontext/siteSettingContext";
import { CityProvider } from "@/utils/CityContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  try {
    const res = await fetch(`${process.env.LARAVEL_API_BASE_URL}/api/site-setting`, {
      cache: 'no-store',
      headers: {
        "X-Client-ID": process.env.X_CLIENT_ID,
        "X-Client-Secret": process.env.X_CLIENT_SECRET,
        'X-App-Type':process.env.X_APP_TYPE,
        "Content-Type": "application/json",
        Origin: process.env.NEXT_PUBLIC_API_URL,
      }
    });

    // if (!res.ok) throw new Error(`Failed to fetch site settings: ${res.status}`);

    const settings = await res.json();

    return {
      title: settings?.site_name || 'UrbanRealities',
      description: settings?.site_short_description || 'We build your dream',
      icons: {
        icon: [
          {
            url: settings?.favicon?.trim()
              ? (settings.favicon.startsWith('http') || settings.favicon.startsWith('/'))
                ? settings.favicon
                : `/uploads/${settings.favicon}`
              : '/default-favicon.png',
            type: 'image/png',
            sizes: '32x32',
          },
        ],
        shortcut: settings?.favicon || '/default-favicon.png',
        apple: settings?.favicon || '/default-favicon.png',
      },
      other: {
        'msapplication-TileImage': settings?.favicon || '/default-favicon.png',
      },
    };
  } catch (error) {
    // console.error("Error in generateMetadata:", error.message);
    // Return fallback metadata so page still renders
    return {
      title: 'UrbanRealitiess',
      description: 'We build your dream',
      icons: {
        icon: [{ url: '/default-favicon.png', type: 'image/png', sizes: '32x32' }],
        shortcut: '/default-favicon.png',
        apple: '/default-favicon.png',
      },
      other: { 'msapplication-TileImage': '/default-favicon.png' },
    };
  }
}


export default async function RootLayout({ children }) {
  let settings = {};

  try {
    const res = await fetch(`${process.env.LARAVEL_API_BASE_URL}/api/site-setting`, {
      cache: "no-store",
      headers: {
        "X-Client-ID": process.env.X_CLIENT_ID,
        "X-Client-Secret": process.env.X_CLIENT_SECRET,
        'X-App-Type':process.env.X_APP_TYPE,
        "Content-Type": "application/json",
        Origin: process.env.NEXT_PUBLIC_API_URL,
      },
    });

    // if (!res.ok) {
    //   throw new Error(`Failed to fetch site settings: ${res.status}`);
    // }

    const response = await res.json();
    settings = response.data || {};
  } catch (error) {
    console.log("Error fetching site settings:", error.message);
    settings = {
      site_name: "UrbanRealitiess",
      site_short_description: "We build your dream",
      favicon: "/favicon.png",
    };
  }

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
        <CityProvider>
        <SiteSettingsProvider initialSettings={settings}>
          <BootstrapClient />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </SiteSettingsProvider>
        </CityProvider>
      </body>
    </html>
  );
}
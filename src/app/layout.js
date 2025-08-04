

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/Components/Navebar/Navbar";
import Footer from "@/Components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "@/Components/BootstrapClient";
import getSiteSettings from "@/utils/getsitedata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export async function generateMetadata() {
  const settings = await getSiteSettings();
// console.log(settings)

  return {
    title: settings.site_name || 'UrbanRealitiess',
    description: settings.site_short_description || 'We build your dream',
    icons: {
      icon: [
        {
          url: settings.favicon || '/favicon.ico',
          type: 'image/png',
          sizes: '32x32',
        },
      ],
      shortcut: settings.favicon || '/favicon.ico',
      apple: settings.favicon || '/favicon.ico',
    },
    other: {
      'msapplication-TileImage': settings.favicon || '/favicon.ico',
    },
  };
}



export default async function RootLayout({ children }) {
 const serverData = await getSiteSettings();
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

      <body className={`antialiased`}>
        <BootstrapClient />
        <Navbar 
        serverData={serverData} 
        />
        <main>{children}</main>
        <Footer
          serverData={serverData}
        />
      </body>
    </html>
  );
}

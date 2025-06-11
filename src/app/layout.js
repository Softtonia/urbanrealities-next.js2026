import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/Components/Navebar/Navbar";
import Footer from "@/Components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "@/Components/BootstrapClient";
// import "../app/layout.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// async function getSiteSettings() {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/site-setting`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch site settings');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching site settings:', error);
//     return {
//       site_name: 'UrbanRealities',
//       site_short_description: 'We build your dream'
//     };
//   }
// }

// export async function generateMetadata() {
//   const settings = await getSiteSettings();
//   console.log(settings.data.site_name)

//   return {
//     title: settings.data.site_name || 'UrbanRealities',
//     description: settings.data.site_short_description || 'We build your dream',
//     icons: {
//       icon: [
//         {
//           url: settings.data.favicon || '/favicon.ico',
//           type: 'image/png',
//           sizes: '32x32',
//         },
//       ],
//       shortcut: settings.data.favicon || '/favicon.ico',
//       apple: settings.data.favicon || '/favicon.ico',
//     },
//     other: {
//       'msapplication-TileImage': settings.data.favicon || '/favicon.ico',
//     },
//   };}


export default function RootLayout({ children }) {
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
        <BootstrapClient/>
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}

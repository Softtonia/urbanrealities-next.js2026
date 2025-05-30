<<<<<<< HEAD
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/Components/Navebar/Navbar";
import Footer from "@/Components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "@/Components/BootstrapClient";
import "../app/layout.css";
=======
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navebar/Navbar";
import PropertySearch from "@/Components/PropertySearch/PropertySearch";
// layout.tsx (or global.css)
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Footer from "@/Components/Footer/Footer";
import SearchPropertySection from "@/Components/SearchPropertySection/SearchPropertySection";
import SubHero from "@/Components/SubHero/SubHero";

import "../app/layout.css"
import "../Components/PropertySearch/PropertySearch.css"
import "../Components/PropertySearch/Searchbar.css"
import PropertyListing from "@/Components/PropertyListing/PropertyListing";
import FeaturesCopy from "@/Components/FeaturesCopy/FeaturesCopy"
import SponsoredProperty from "@/Components/SponsoredProperty/SponsoredProperty";
import OwnerProperties from "@/Components/OwnerProperties/OwnerProperties";
import ProjectCarousel from "@/Components/ProjectCarousel/ProjectCarousel";
import AdviceAndTools from "@/Components/AdviceAndTools/AdviceAndTools";
import PropertyServices from "@/Components/PropertyServices/PropertyServices";
import WhyChoose99Acres from "@/Components/WhyChoose99Acres/WhyChoose99Acres";
import PopularCities from "@/Components/PopularCities/PopularCities";
import Testimonials from "@/Components/Testimonials/Testimonials";
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

<<<<<<< HEAD
async function getSiteSettings() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/site-setting`);
    if (!response.ok) {
      throw new Error('Failed to fetch site settings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {
      site_name: 'UrbanRealities',
      site_short_description: 'We build your dream'
    };
  }
}

export async function generateMetadata() {
  const settings = await getSiteSettings();
  console.log(settings.data.site_name)

  return {
    title: settings.data.site_name || 'UrbanRealities',
    description: settings.data.site_short_description || 'We build your dream',
    icons: {
      icon: [
        {
          url: settings.data.favicon || '/favicon.ico',
          type: 'image/png',
          sizes: '32x32',
        },
      ],
      shortcut: settings.data.favicon || '/favicon.ico',
      apple: settings.data.favicon || '/favicon.ico',
    },
    other: {
      'msapplication-TileImage': settings.data.favicon || '/favicon.ico',
    },
  };}

=======
export const metadata = {
  title: "UrbanRealities",
  description: "We build your dream", // fixed typo from "dreem"
};
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<<<<<<< HEAD
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
=======
      <body className={` antialiased`}>
        {/* <div className="test">
        <div className="container">
          <h1 className="text-black">Hello</h1>
        </div>
      </div> */}
        <Navbar />
        {/* <PropertySearch /> */}
          <SearchPropertySection />

          {/* <PropertySearch /> */}

                    {/* <FeturesProjectCrasual /> */}
                    <FeaturesCopy />

          <SubHero subHeroHeading={"PROPERTY LISTINGSS"} subHeroText={"PROPERTIES FOR RENT"} />
          <PropertyListing />

          {/* Displaying two SponsoredProperty cards using the component itself */}
          <SponsoredProperty />

          {/* <OwnerProperties /> */}

          <SubHero subHeroHeading={"Features Project"} subHeroText={""} />

          <ProjectCarousel />

          <AdviceAndTools />

          <PropertyServices />

          <WhyChoose99Acres />

          <PopularCities />

          <Testimonials />


        <Footer/>
        <main>{children}</main>



      </body>




      

>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
    </html>
  );
}

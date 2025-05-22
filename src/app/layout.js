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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UrbanRealities",
  description: "We build your dream", // fixed typo from "dreem"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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




      

    </html>
  );
}

import SearchPropertySection from "@/Components/SearchPropertySection/SearchPropertySection";
import PropertyListing from "@/Components/PropertyListing/PropertyListing";
import FeaturesCopy from "@/Components/FeaturesCopy/FeaturesCopy";
import SponsoredProperty from "@/Components/SponsoredProperty/SponsoredProperty";
import ProjectCarousel from "@/Components/ProjectCarousel/ProjectCarousel";
import AdviceAndTools from "@/Components/AdviceAndTools/AdviceAndTools";
import PropertyServices from "@/Components/PropertyServices/PropertyServices";
import WhyChooseus from "@/Components/WhyChoose/WhyChooseus";
import PopularCities from "@/Components/PopularCities/PopularCities";
import Testimonials from "@/Components/Testimonials/Testimonials";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";



export default function Home() {
  return (
    <>
      <SearchPropertySection />
      <FeaturesCopy />
      <PropertyListing />
      <SponsoredProperty />
      <ProjectCarousel />
      <AdviceAndTools />
      <PropertyServices />
      <WhyChooseus />
      <PopularCities />
      <Testimonials />
    </>
  );
}

import React from 'react';
import Projectviewcards from './components/Project-viewcards/Projects-viewcards';
import Filtertabs from '@/Components/PropertyFilters/filtertabs';
import BannerSection from './components/banner/BannerSection';
import style from './components/Project-viewcards/Projects-viewcards.module.css'
const Projectpage = () => {
  return (
    <div style={{  width: '100%', height: '100%'}} >
      {/* <PropertyFilters /> */}
      {/* <Filtertabs /> */}
      <BannerSection/>
      <Projectviewcards />
    </div>
  );
}

export default Projectpage;


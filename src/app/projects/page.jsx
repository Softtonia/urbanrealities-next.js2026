import React from 'react';
import Projectviewcards from './components/Project-viewcards/Projects-viewcards';
import Filtertabs from '@/Components/PropertyFilters/filtertabs';
const Projectpage = () => {
  return (
    <div style={{  width: '100%', height: '100%'}}>
      {/* <PropertyFilters /> */}
      <Filtertabs />
      <Projectviewcards />
    </div>
  );
}

export default Projectpage;


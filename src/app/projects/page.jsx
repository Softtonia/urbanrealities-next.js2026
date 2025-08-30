import React from 'react';
import PropertyFilters from '@/Components/PropertyFilters/PropertyFilters';
import Projectviewcards from './components/Project-viewcards/Projects-viewcards';
import Filtertabs from '@/Components/PropertyFilters/filtertabs';
const Projectpage = () => {
  return (
    <div>
      {/* <PropertyFilters /> */}
      <Filtertabs />
      <Projectviewcards />
    </div>
  );
}

export default Projectpage;


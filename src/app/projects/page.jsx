import React from 'react';
import PropertyFilters from '@/Components/PropertyFilters/PropertyFilters';
import Projectviewcards from './components/Project-viewcards/Projects-viewcards';
const Projectpage = () => {
  return (
    <div>
      <PropertyFilters />
      <Projectviewcards />
    </div>
  );
}

export default Projectpage;


'use client';

import React from 'react';
import ProjectTileData from './ProjectTileData';
import { useDeveloper } from '../../context/DeveloperContext';
const CompletedProjectTiles = () => {
  const developer = useDeveloper();
  return (
    <div>
      <ProjectTileData  headingText={`Complete Project by ${developer.name}`}/>
    </div>
  );
}

export default CompletedProjectTiles;

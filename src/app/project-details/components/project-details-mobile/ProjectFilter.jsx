'use client';

import React from "react";
import styles from "./ProjectTileData.module.css";

const ProjectFilter = ({ city, setCity, type, setType, status, setStatus }) => {
  return (
    <div className={styles.filterRow}>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">All Cities</option>
        <option value="Ernakulam">Ernakulam</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Property Type</option>
        <option value="Builder Floor">Builder Floor</option>
        <option value="Flat">Flat</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Status</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default ProjectFilter;

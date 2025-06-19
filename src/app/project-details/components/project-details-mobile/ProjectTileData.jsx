import React, { useState } from "react";
import styles from "./ProjectTileData.module.css";
import ProjectFilter from "./ProjectFilter";
import ProjectTile from "./ProjectTile";
import TextHeading from "./TextHeading";

const ProjectTileData = ( { headingText = "Projects" }) => {
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const allTiles = [
    {
      imageUrl: "/image-card.png",
      price: "₹ 3 Crore",
      rating: 4.5,
      bhk: "3BHK",
      type: "Builder Floor",
      size: "1700sqft.",
      location: "Ernakulam, Kerala",
      projectName: "Ganesh Property",
      availableFor: "Family",
      carpetArea: "1720 sqft",
      city: "Ernakulam",
      status: "Ongoing",
    },
  ];

  const repeatedTiles = Array(6).fill(allTiles[0]);

  const filteredTiles = repeatedTiles.filter(
    (tile) =>
      (city === "" || tile.city === city) &&
      (type === "" || tile.type === type) &&
      (status === "" || tile.status === status)
  );

  return (
    <div className={styles.TileContainer}>
<TextHeading 
  subHeroHeading={headingText}
/>

      <ProjectFilter
        city={city}
        setCity={setCity}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
      />

      <div className={styles.scrollContainer}>
        {filteredTiles.map((data, index) => (
          <ProjectTile key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default ProjectTileData;

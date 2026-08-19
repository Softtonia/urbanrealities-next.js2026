"use client";

import "./SubHero.css"

const SubHero = ({ subHeroHeading, subHeroText }) => {
  return (
    <div className="container p-0">
      <div className="modern-section-header text-start">
        {subHeroText && <span className="modern-eyebrow">{subHeroText}</span>}
        <h2 className="modern-title">{subHeroHeading}</h2>
      </div>
    </div>
  );
};

export default SubHero;
import React from 'react';
import './AdviceAndTools.css';
import '../../app/globals.css';
import SubHero from '../SubHero/SubHero';

const AdviceAndTools = () => {

  const cardData = [
    {
      title: 'Property Valuation',
      description: 'Know the actual value of your property',
      imgSrc: '/adviceandtools.png',
    },
    {
      title: 'Property Valuation',
      description: 'Know the actual value of your property',
      imgSrc: '/adviceandtools.png',
    },
    {
      title: 'Property Valuation',
      description: 'Know the actual value of your property',
      imgSrc: '/adviceandtools.png',
    },
    {
      title: 'Property Valuation',
      description: 'Know the actual value of your property',
      imgSrc: '/adviceandtools.png',
    },
  ];

  return (
    <div className="container adviceandtools-container">
      <SubHero subHeroHeading={"Advice And Tools"} subHeroText={""} />
      <div className="maincontainer">
        {cardData.map((card, index) => (
          <div className='advicecard' key={index}>
            <div className="cardinner">
              <div className="iconsection">
                <img src={card.imgSrc} alt={card.title} />
              </div>
              <div className="textsection">
                <div className="textcontent">
                  <h6 className='propertyvaluation'>{card.title}</h6>
                  <h6 className='actualvalue'>{card.description}</h6>
                </div>
                <div className='advicebtndiv'>
                  <a className='advicebtn btn-secondary-wt body-text-14'>Know More</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdviceAndTools;
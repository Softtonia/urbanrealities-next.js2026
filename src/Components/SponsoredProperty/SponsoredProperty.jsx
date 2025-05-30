<<<<<<< HEAD

'use client';
=======
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
import React from 'react';
import './SponsoredProperty.css';

const SponsoredProperty = () => {
  return (
    <div className='container'>
<<<<<<< HEAD
      <div className="sponsored-property-row-container">

        {[1, 2, 3].map((_, index) => (
          <div key={index} className="sponsored-property-card">
            <div className="sponsored-property-image-container">
              <img
                src="/sponsored-property-image.png"
                alt="Sponsored Property"
                className="sponsored-property-image"
             
              />
              <div className="sponser-tag">Sponsored</div>
            </div>
            <div className="sponsored-property-content">
              <div className="sponsored-property-content-inner">
                <div className="sponsored-property-title body-text-16 text-dark">Ganesh Property</div>
                <div className="sponsored-property-info-row">
                  <div className="sponsored-property-description text-gray body-text-14">3BHK Builder Floor 1700sqft.</div>
                  <div className="sponsored-property-location text-gray body-text-14">Ernakulam, Kerala</div>
                  <div className="sponsored-property-price body-text-14">₹ 3 Crore</div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
=======
        <div className="sponsored-property-row-container">
      {/* First Sponsored Property Card */}
      <div className="sponsored-property-card">
          <div className="sponsored-property-image-container">
              <img src={'/sponsored-property-image.png'} alt="Sponsored Property" className="sponsored-property-image" />
              <div className="sponser-tag">Sponsored</div>
          </div>
          <div className="sponsored-property-content">
              <div className='sponsored-property-content-inner'>
                  <div className='sponsored-property-title body-text-16 text-dark'>Ganesh Property</div>
                  <div className='sponsored-property-info-row'>
                      <div className='sponsored-property-description text-gray body-text-14'>3BHK Builder Floor 1700sqft.</div>
                      <div className='sponsored-property-location text-gray body-text-14'>Ernakulam, Kerala</div>
                      <div className='sponsored-property-price body-text-14'>₹ 3 Crore</div>
                  </div>

              </div>
          </div>
      </div>

      {/* Second Sponsored Property Card */}
      <div className="sponsored-property-card">
          <div className="sponsored-property-image-container">
              <img src={'/sponsored-property-image.png'} alt="Sponsored Property" className="sponsored-property-image" />
              <div className="sponser-tag">Sponsored</div>
          </div>
          <div className="sponsored-property-content">
              <div className='sponsored-property-content-inner'>
                  <div className='sponsored-property-title body-text-14'>Ganesh Property</div>
                  <div className='sponsored-property-info-row'>
                      <div className='sponsored-property-description body-text-14'>3BHK Builder Floor 1700sqft.</div>
                      <div className='sponsored-property-location body-text-14'>Ernakulam, Kerala</div>
                      <div className='sponsored-property-price body-text-14'>₹ 3 Crore</div>
                  </div>

              </div>
          </div>
      </div>

      {/* Third Sponsored Property Card */}
      <div className="sponsored-property-card">
          <div className="sponsored-property-image-container">
              <img src={'/sponsored-property-image.png'} alt="Sponsored Property" className="sponsored-property-image" />
              <div className="sponser-tag">Sponsored</div>
          </div>
          <div className="sponsored-property-content">
              <div className='sponsored-property-content-inner'>
                  <div className='sponsored-property-title body-text-14'>Ganesh Property</div>
                  <div className='sponsored-property-info-row'>
                      <div className='sponsored-property-description body-text-14'>3BHK Builder Floor 1700sqft.</div>
                      <div className='sponsored-property-location body-text-14'>Ernakulam, Kerala</div>
                      <div className='sponsored-property-price body-text-14'>₹ 3 Crore</div>
                  </div>

              </div>
          </div>
      </div>


      
    </div>
    </div>
    
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
  );
};

export default SponsoredProperty;

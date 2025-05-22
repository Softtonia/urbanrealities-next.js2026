import React from 'react';
import './PropertyListing.css';

const properties = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  titleSegments: ['3BHK', 'Builder', 'Floor', '1700sqft.'],
  location: 'Ernakulam, Kerala',
  builder: 'Ganesh Property',
  status: 'Ready To Move',
  carpetArea: '1720 sqft',
  imageUrl: '/propertylistingimage.png',
}));

const PropertyCard = ({ property }) => (
  <div className="property-card">
    <img src={property.imageUrl} alt="Property" className="property-image" />

    <div className="property-content">
      <div className="property-title body-text-14 bord-bottom">
        {property.titleSegments.map((segment, i) => (
          <span key={i}>
            {segment}
            {i < property.titleSegments.length - 1 && <span className="pipe-divider"> | </span>}
          </span>
        ))}
      </div>

      <div className="property-info-row bord-bottom">
        <div className="property-location">{property.location}</div>
        <div className="property-builder">{property.builder}</div>
      </div>

      <div className="property-details body-text-14 bord-bottom">
        <span>{property.status}</span>
        <span>Carpet Area {property.carpetArea}</span>
      </div>
    </div>

    <div className="btn-property-detail btn-more-details">More Details</div>
  </div>
);

const PropertyListing = () => {
  return (
    <div className='container'>

      <div className="property-listing-scroll">
        <div className="property-listing">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;

"use client";
import { useState } from "react";
import "./Propertyprice.css";

const Propertyprice = ({ property }) => {
  const [showAll, setShowAll] = useState(false);

  // list of template labels you gave
  const templates = [
    "property.booking.amount",
    "property.price.per.sq.ft",
    "property.basic.price",
    "property.corpus.fund",
    "property.high.rise.charges",
    "property.corner.charges",
    "property.parking.space.charges",
    "property.amenities.charges",
    "property.preferential.location.charge",
    "property.rental.value",
    "property.maintanace.charges",
    "property.stamp.duty",
    "property.registration.charges",
    "property.goods.and.service.tax",
    "property.legal.expenses",
    "property.documentaion.charges",
    "property.katha.bifurcation.liaison",
    "property.one.time.clubhouse.membership",
    "proeperty.society.formation.charges",
    "property.electric.connection.charges",
    "property.water.charges",
    "property.infrastructure.development.charges",
    "property.pipeline.gas.connection",
    "property.brokerge.fee",
    "property.interior.design.cost",
    "property.additional.parking.charges",
  ];
console.log("property",property)
  // get matched fields from property
  const fieldData = templates.map((templateLabel) => {
    const field = Array.isArray(property?.repeater_fields) ? property?.repeater_fields?.find(
      (f) =>{const tmp = (f?.template?.name)?.toLowerCase(); return tmp === templateLabel}
    ):[];
    
    if (!field || !field.field_value) return null;

    return {
      label: field.field_label, // pretty label
      value: Array.isArray(field.field_value)
        ? field.field_value.join(", ")
        : field.field_value,
    };
  }).filter(Boolean);


  // slice for view more/less
  const visibleFields = showAll ? fieldData : fieldData.slice(0, 12);

  console.log("==>>",visibleFields)
  if (!visibleFields.length ) return null;

  return (
    <div className="property-price-details-box">
      <h4 className="property-section-title">Price Details</h4>
  
      <div className="property-price-grid">
        
        {visibleFields
          .filter(item => item.value) // only keep items with value
          .map((item, index) => (
            <div key={index} className="property-price-column">
              <div className="d-flex justify-content-between">
                <p className="property-label">{item.label}</p>
                <p className="property-value">{item.value}</p>
              </div>
              
            </div>
          ))}
      </div>
  
      {fieldData.filter(item => item.value).length > 12 && ( // check only items with value
        <button
          className="property-view-more"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "View less Details" : "View all Details"}
        </button>
      )}
    </div>
  );
  
};

export default Propertyprice;

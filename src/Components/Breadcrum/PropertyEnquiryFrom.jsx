import React from "react";
import "./PropertyEnquiryFrom.css";

const PropertyEnquiryFrom = () => {
  return (
    <div className="enquiry-form-container">
      <div className="enquiry-box m-0 p-0">
        <h3 className="enquiry-title body-text-20">Fill the enquiry form</h3>
      </div>
      <form className="enquiry-form">
        <input
          type="text"
          placeholder="Name"
          className="enquiry-form__input"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="enquiry-form__input"
        />
        <input
          type="text"
          placeholder="Contact number"
          className="enquiry-form__input"
        />
        <textarea
          placeholder="Message"
          rows="4"
          className="enquiry-form__textarea"
        ></textarea>
        <div className=" d-flex justify-content-center">
        <button type="submit" className="enquiry-form__button">
          Send Enquiry
        </button></div>
      </form>
    </div>
  );
};

export default PropertyEnquiryFrom;

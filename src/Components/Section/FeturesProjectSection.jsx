import React, { useState } from "react";
import "../FeturesProjectCrasual/FeturesProjectCrasual.css";
import "../../app/globals.css";
import SubHero from "../SubHero/SubHero";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1666846795617-5a79453e6f6c?q=80&w=3402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const FeturesProjectSection = () => {
  const [current, setCurrent] = useState(1);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-light fetures-section ">
      <div>
        <SubHero
          subHeroHeading={
            '"Our diverse range of properties ensures there\'s Something for everyone."'
          }
        />

        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "red", height: "100%", position: "relative", marginTop:"130px" }}
        >
          <div className="carousel__container">
            <div className="carousel d-flex justify-content-center flex-wrap">
              {slides.map((slide, index) => {
                let className = "carousel__item";
                const left2 = (current - 2 + slides.length) % slides.length;
                const left1 = (current - 1 + slides.length) % slides.length;
                const right1 = (current + 1) % slides.length;
                const right2 = (current + 2) % slides.length;

                if (index === current) className += " carousel__item--main";
                else if (index === left1) className += " carousel__item--left1";
                else if (index === left2) className += " carousel__item--left2";
                else if (index === right1) className += " carousel__item--right1";
                else if (index === right2) className += " carousel__item--right2";

                return (
                  <div className={className} key={index}>
                    <img src={slide.image} alt="img" className="img-fluid" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="d-flex gap-3 justify-content-center align-items-center"
          style={{
            marginTop: "130px",
          }}
        >
          <button
            onClick={handlePrev}
            className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeturesProjectSection;

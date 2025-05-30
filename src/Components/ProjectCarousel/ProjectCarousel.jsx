<<<<<<< HEAD
"use client";
import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./ProjectCarousel.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SubHero from "../SubHero/SubHero";
=======
import "bootstrap/dist/css/bootstrap.min.css";

import './ProjectCarousel.css';
import '../../app/globals.css';

import React from 'react';
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058

const projectData = [
  {
    location: "Ernakulam, Kerala",
    builder: "Ganesh Property",
    reraNo: "HN-604501",
    rating: 4,
    propertyType: "Residents",
    ongoingPrice: "2 - 3 Cr",
    areaSqft: "1720sqft",
    bhk: "3BHK",
    builderFloor: "1700sqft",
    status: "Underconstruction",
    image: "/projectcarouselimage.png"
  },
  {
    location: "Mumbai, Maharashtra",
    builder: "Shriram Realty",
    reraNo: "MH-892341",
    rating: 5,
    propertyType: "Apartments",
    ongoingPrice: "1.5 - 2.2 Cr",
    areaSqft: "1500sqft",
    bhk: "2BHK",
    builderFloor: "1480sqft",
    status: "Ready to Move",
    image: "/projectcarouselimage.png"
  },
<<<<<<< HEAD
  {
    location: "Bangalore, Karnataka",
    builder: "Prestige Group",
    reraNo: "KA-123456",
    rating: 5,
    propertyType: "Villa",
    ongoingPrice: "3.2 Cr",
    areaSqft: "2000sqft",
    bhk: "4BHK",
    builderFloor: "1980sqft",
    status: "Underconstruction",
    image: "/projectcarouselimage.png"
  }
];

const ProjectCarousel = () => {
  const router = useRouter();
  const carouselRef = useRef(null);
  const scrollAmount = 850;

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= scrollAmount;
    }
  };

  const handleViewProject = () => {
    router.push("/project-details");
  };

  return (
    <div className="container">
      <div className="project-caro-title">
        <SubHero subHeroHeading={"Features Project"} subHeroText={""} />
      </div>

      <div className="project-carousel" ref={carouselRef}>
        {projectData.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-card__image-wrapper">
              <Image
                src={project.image}
                alt="project-img"
                width={300}
                height={280}
                className="project-card__image"
              />
            </div>

            <div className="project-carousel__content">
              <div className="project-card__body">
                <p className="project-card__location m-0">{project.location}</p>
                <h3 className="project-card__builder m-0">{project.builder}</h3>
                <p className="project-card__rera m-0">Rera No: {project.reraNo}</p>
                <div className="project-card__rating m-0">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      className="star "
                      src={i < project.rating ? "/yellowstar.png" : "/graystar.png"}
                      alt="star"
                    />
                  ))}
                  <span className="project-card__rating-value">({project.rating}.0)</span>
                </div>
                <p className="project-card__property-type m-0">Property Type: {project.propertyType}</p>
                <p className="project-card__price m-0">Ongoing Price: {project.ongoingPrice}</p>
                <p className="project-card__area m-0">Area: {project.areaSqft}</p>
                <p className="project-card__bhk m-0">{project.bhk}</p>
                <p className="project-card__builder-floor m-0">Builder Floor: {project.builderFloor}</p>

                <div className="d-flex justify-content-between align-items-center m-0 w-100">
                  <p className="project-card__status m-0">
                    Status: <strong>{project.status}</strong>
                  </p>
                  <button className="project-card__btn-view btn-viewproject m-0" onClick={handleViewProject}>
                    View Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="project-carousel__buttons">
        <button
          onClick={handlePrev}
          className="project-carousel__nav-btn project-carousel__nav-btn--prev "
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="project-carousel__nav-btn project-carousel__nav-btn--next"
        >
          <FaArrowRight />
=======
];

const ProjectCarousel = () => {
  return (
    <div className="container mt-3">
      <div id="projectCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">

          {projectData.map((project, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="projcarouselsection mx-auto">
                <div className="imgdiv text-white">
                  <img src={project.image} alt={`project-${index}`} className="img-fluid h-100 w-100" />
                </div>
                <div className="contentdiv">
                  <div className="innercontent">
                    <div className="innercontent1">
                      <div className="innercontent1textdiv">
                        <h6 className="location">{project.location}</h6>
                        <h6 className="builder">{project.builder}</h6>
                        <div className="area">
                          <span className="rareatitle">Rera No: </span>
                          <span className="rareadesc">{project.reraNo}</span>
                        </div>
                      </div>
                      <div className="innercontent1ratingdiv">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            className="star"
                            src={i < project.rating ? "/yellowstar.png" : "/graystar.png"}
                            alt="star"
                          />
                        ))}
                        <h6 className="ratingtext">({project.rating}.0)</h6>
                      </div>
                    </div>

                    <div className="innercontent2">
                      <h6 className="propertytype">Property Type: {project.propertyType}</h6>
                      <h6 className="ongoingprice">Ongoing Price: {project.ongoingPrice}</h6>
                      <h6 className="areasqft">Area: {project.areaSqft}</h6>
                      <h6 className="bhk">{project.bhk}</h6>
                      <h6 className="builderfloor">Builder Floor: {project.builderFloor}</h6>
                    </div>

                    <div className="innercontent3">
                      <div className="innercontent3statusdiv">
                        <h6 className="status">Status: {project.status}</h6>
                      </div>
                      <button className="innercontent3btn btn-viewproject">View Project</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Left & Right Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#projectCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#projectCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
<<<<<<< HEAD
=======


// import "bootstrap/dist/css/bootstrap.min.css";
// import './ProjectCarousel.css';
// import '../../app/globals.css';

// import React from 'react';

// const ProjectCarousel = () => {
//   const projectData = [
//     {
//       location: "Ernakulam, Kerala",
//       builder: "Ganesh Property",
//       reraNo: "HN-604501",
//       rating: 4,
//       propertyType: "Residents",
//       ongoingPrice: "2 - 3 Cr",
//       areaSqft: "1720sqft",
//       bhk: "3BHK",
//       builderFloor: "1700sqft",
//       status: "Underconstruction",
//       image: "/projectcarouselimage.png"
//     },
//     {
//       location: "Ernakulam, Kerala",
//       builder: "Ganesh Property",
//       reraNo: "HN-604501",
//       rating: 4,
//       propertyType: "Residents",
//       ongoingPrice: "2 - 3 Cr",
//       areaSqft: "1720sqft",
//       bhk: "3BHK",
//       builderFloor: "1700sqft",
//       status: "Underconstruction",
//       image: "/projectcarouselimage.png"
//     },
//   ];

//   return (
//     <div className="container">
//       {projectData.map((project, index) => (
//         <div className="projcarouselsection" key={index}>
//           <div className="imgdiv text-white">
//             <img src={project.image} alt={`project-${index}`} />
//           </div>
//           <div className="contentdiv flex-fill">
//             <div className="innercontent">
//               <div className="innercontent1">
//                 <div className="innercontent1textdiv">
//                   <h6 className="location">{project.location}</h6>
//                   <h6 className="builder">{project.builder}</h6>
//                   <div className="area">
//                     <span className="rareatitle">Rera No: </span>
//                     <span className="rareadesc">{project.reraNo}</span>
//                   </div>
//                 </div>
//                 <div className="innercontent1ratingdiv">
//                   {[...Array(5)].map((_, i) => (
//                     <img
//                       key={i}
//                       className="star"
//                       src={i < project.rating ? "/yellowstar.png" : "/graystar.png"}
//                       alt="star"
//                     />
//                   ))}
//                   <h6 className="ratingtext">({project.rating}.0)</h6>
//                 </div>
//               </div>
//               <div className="innercontent2">
//                 <h6 className="propertytype">Property Type: {project.propertyType}</h6>
//                 <h6 className="ongoingprice">Ongoing Price: {project.ongoingPrice}</h6>
//                 <h6 className="areasqft">Area: {project.areaSqft}</h6>
//                 <h6 className="bhk">{project.bhk}</h6>
//                 <h6 className="builderfloor">Builder Floor: {project.builderFloor}</h6>
//               </div>
//               <div className="innercontent3">
//                 <div className="innercontent3statusdiv">
//                   <h6 className="status">Status: {project.status}</h6>
//                 </div>
//                 <button className="innercontent3btn btn-viewproject">
//                   View Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProjectCarousel;

>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058

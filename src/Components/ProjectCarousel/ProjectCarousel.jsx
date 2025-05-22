import "bootstrap/dist/css/bootstrap.min.css";

import './ProjectCarousel.css';
import '../../app/globals.css';

import React from 'react';

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
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;


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


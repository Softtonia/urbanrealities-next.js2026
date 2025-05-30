<<<<<<< HEAD
// 

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import "./FeaturesCopy.css";
// import "../../app/globals.css";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const FeaturesCopy = () => {
//   const [current, setCurrent] = useState(0);
//   const carouselRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const slides = [
//     {
//       image: "https://images.unsplash.com/photo-1666846795617-5a79453e6f6c?q=80&w=3402&auto=format&fit=crop",
//     },
//     {
//       image: "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop",
//     },
//     {
//       image: "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop",
//     },
//     {
//       image: "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop",
//     },
//     {
//       image: "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop",
//     },
//   ];

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const handlePrev = () => {
//     setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   const getSlideClass = (index) => {
//     const diff = (index - current + slides.length) % slides.length;
//     switch (diff) {
//       case 0: return "slide-main";
//       case 1: return "slide-right1";
//       case 2: return "slide-right2";
//       case slides.length - 1: return "slide-left1";
//       case slides.length - 2: return "slide-left2";
//       default: return "slide-hidden";
//     }
//   };

//   return (
//     <div className="features-copy-section">
//       <div className="features-copy container">
//         <div className="features-copy-heading">
//           <h2>"Featured Projects"</h2>
//           <div className="heading-underline"></div>
//         </div>

//         <div className="carousel-wrapper">
//           <div className="carousel-row" ref={carouselRef}>
//             {isMobile ? (
//               slides.map((slide, i) => (
//                 <div className="slide-card slide-main" key={i}>
//                   <img src={slide.image} alt={`Property ${i + 1}`} className="slide-image" />
//                   <div className="property-overlay">
//                     <div className="property-info">
//                       <span className="property-count">999+</span>
//                       <span className="property-status">Ready To Move in</span>
//                     </div>
//                     <div className="property-action">
//                       <a href="#" className="explore-btn">Explore All</a>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               slides.map((slide, i) => (
//                 <div className={`slide-card ${getSlideClass(i)}`} key={i}>
//                   <img src={slide.image} alt={`Property ${i + 1}`} className="slide-image" />
//                   <div className="property-overlay">
//                     <div className="property-info">
//                       <span className="property-count">999+</span>
//                       <span className="property-status">Ready To Move in</span>
//                     </div>
//                     <div className="property-action">
//                       <a href="#" className="explore-btn">Explore All</a>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="carousel-controls">
//             <button onClick={handlePrev} className="control-btn prev-btn">
//               <FaArrowLeft />
//             </button>
//             <button onClick={handleNext} className="control-btn next-btn">
//               <FaArrowRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturesCopy;

"use client";
=======
"use client"
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058

import React, { useState, useEffect, useRef } from "react";
import "./FeaturesCopy.css";
import "../../app/globals.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
<<<<<<< HEAD
import SubHero from "../SubHero/SubHero";

const FeaturesCopy = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1666846795617-5a79453e6f6c?q=80&w=3402&auto=format&fit=crop",
    },
    {
      image: "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop",
    },
    {
      image: "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop",
    },
    {
      image: "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop",
    },
    {
      image: "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop",
    },
  ];

=======

const FeaturesCopy = () => {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
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

  // Check if we're on mobile
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
<<<<<<< HEAD

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrev = () => {
    // if (isMobile) {
    //   scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: "smooth" });
    // } else {
    //   setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    // }
  if (isMobile) {
    const scrollContainer = scrollRef.current;
    if (scrollContainer.scrollLeft <= 0) {
      // Scroll to end (loop back)
      scrollContainer.scrollTo({
        left: scrollContainer.scrollWidth,
        behavior: "smooth",
      });
    } else {
      scrollContainer.scrollBy({
        left: -scrollContainer.offsetWidth,
        behavior: "smooth",
      });
    }
  } else {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }
  };

  const handleNext = () => {
    // if (isMobile) {
    //   scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: "smooth" });
    // } else {
    //   setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    // }
      if (isMobile) {
    const scrollContainer = scrollRef.current;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.offsetWidth;

    if (scrollContainer.scrollLeft >= maxScrollLeft - 5) {
      // Scroll to beginning (loop back)
      scrollContainer.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      scrollContainer.scrollBy({
        left: scrollContainer.offsetWidth,
        behavior: "smooth",
      });
    }
  } else {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }
  };

  const getSlideClass = (index) => {
    const diff = (index - current + slides.length) % slides.length;
    switch (diff) {
      case 0: return "slide-main";
      case 1: return "slide-right1";
      case 2: return "slide-right2";
      case slides.length - 1: return "slide-left1";
      case slides.length - 2: return "slide-left2";
      default: return "slide-hidden";
    }
  };

  return (
    <div className="features-copy-section">
      <div className="features-copy container">
        <div className="features-copy-heading">
          <h2>Our diverse range of properties ensures</h2>
                <SubHero subHeroHeading={"there's something for everyone."} subHeroText={""} />

        </div>

        <div className="carousel-wrapper">
          <div
            className={`carousel-row ${isMobile ? "mobile-scroll" : ""}`}
            ref={scrollRef}
          >
            {slides.map((slide, i) => (
              <div
                className={`slide-card ${
                  isMobile ? "mobile-slide-card" : getSlideClass(i)
                }`}
                key={i}
              >
                <img src={slide.image} alt={`Property ${i + 1}`} className="slide-image" />
                <div className="property-overlay">
                  <div className="property-info">
                    <span className="property-count">999+</span>
                    <span className="property-status">Ready To Move in</span>
                  </div>
                  <div className="property-action">
                    <a href="#" className="explore-btn">Explore All</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button onClick={handlePrev} className="control-btn prev-btn">
              <FaArrowLeft />
            </button>
            <button onClick={handleNext} className="control-btn next-btn">
=======
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = () => {
    if (isMobile && carouselRef.current) {
      // On mobile, scroll the container
      const cardWidth = 260 + 15; // card width + gap
      carouselRef.current.scrollLeft -= cardWidth;
    } else {
      // On desktop, update the active slide index
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (isMobile && carouselRef.current) {
      // On mobile, scroll the container
      const cardWidth = 260 + 15; // card width + gap
      carouselRef.current.scrollLeft += cardWidth;
    } else {
      // On desktop, update the active slide index
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  };

  // Calculate indices for visible slides
  const left2 = (current - 2 + slides.length) % slides.length;
  const left1 = (current - 1 + slides.length) % slides.length;
  const right1 = (current + 1) % slides.length;
  const right2 = (current + 2) % slides.length;

    return (
    <div className="features-copy-section">
      <div className="features-copy-container">
        <div className="features-copy-heading">
          <h2>"Featured Projects"</h2>
          <div className="heading-underline"></div>
        </div>

        <div className="carousel-wrapper">
          <div className="carousel-row" ref={carouselRef}>
            {!isMobile ? (
              <>
                {/* Left 2 */}
                <div className="slide-card slide-left2">
                  <img 
                    src={slides[left2].image} 
                    alt="Property" 
                    className="slide-image"
                  />
                  <div className="property-overlay">
                    <div className="property-info">
                      <span className="property-count">999+</span>
                      <span className="property-status">Ready To Move in</span>
                    </div>
                    <div className="property-action">
                      <a href="#" className="explore-btn">Explore All</a>
                    </div>
                  </div>
                </div>
                
                {/* Left 1 */}
                <div className="slide-card slide-left1">
                  <img 
                    src={slides[left1].image} 
                    alt="Property" 
                    className="slide-image"
                  />
                  <div className="property-overlay">
                    <div className="property-info">
                      <span className="property-count">999+</span>
                      <span className="property-status">Ready To Move in</span>
                    </div>
                    <div className="property-action">
                      <a href="#" className="explore-btn">Explore All</a>
                    </div>
                  </div>
                </div>
                
                {/* Right 1 */}
                <div className="slide-card slide-right1">
                  <img 
                    src={slides[right1].image} 
                    alt="Property" 
                    className="slide-image"
                  />
                  <div className="property-overlay">
                    <div className="property-info">
                      <span className="property-count">999+</span>
                      <span className="property-status">Ready To Move in</span>
                    </div>
                    <div className="property-action">
                      <a href="#" className="explore-btn">Explore All</a>
                    </div>
                  </div>
                </div>
                
                {/* Right 2 */}
                <div className="slide-card slide-right2">
                  <img 
                    src={slides[right2].image} 
                    alt="Property" 
                    className="slide-image"
                  />
                  <div className="property-overlay">
                    <div className="property-info">
                      <span className="property-count">999+</span>
                      <span className="property-status">Ready To Move in</span>
                    </div>
                    <div className="property-action">
                      <a href="#" className="explore-btn">Explore All</a>
                    </div>
                  </div>
                </div>
                
                {/* Main (center) card rendered last for overlap) */}
                <div className="slide-card slide-main">
                  <img 
                    src={slides[current].image} 
                    alt="Property" 
                    className="slide-image"
                  />
                  <div className="property-overlay">
                    <div className="property-info">
                      <span className="property-count">999+</span>
                      <span className="property-status">Ready To Move in</span>
                    </div>
                    <div className="property-action">
                      <a href="#" className="explore-btn">Explore All</a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // For mobile: horizontal slider with all slides
              <>
                {slides.map((slide, index) => (
                  <div className="slide-card" key={index}>
                    <img 
                      src={slide.image} 
                      alt={`Property ${index + 1}`} 
                      className="slide-image"
                    />
                    <div className="property-overlay">
                      <div className="property-info">
                        <span className="property-count">999+</span>
                        <span className="property-status">Ready To Move in</span>
                      </div>
                      <div className="property-action">
                        <a href="#" className="explore-btn">Explore All</a>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          <div className="carousel-controls">
            <button
              onClick={handlePrev}
              className="control-btn prev-btn"
              aria-label="Previous slide"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleNext}
              className="control-btn next-btn"
              aria-label="Next slide"
            >
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default FeaturesCopy;
=======
export default FeaturesCopy;
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058

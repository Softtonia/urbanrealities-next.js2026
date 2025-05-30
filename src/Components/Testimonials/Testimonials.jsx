"use client"

import React, { useEffect , useState } from 'react';
import './Testimonials.css';
import '../../app/globals.css';
import SubHero from '../SubHero/SubHero';
import axios from 'axios';

const testimonialsData = [
  {
    name: 'Lilly Bennett',
    location: 'Ernakulam, Kerala',
    rating: 5,
    text: '“Urbanrealities is a full stack service provider for all real estate needs, with 15+ services”'
  },
  {
    name: 'Lilly Bennett',
    location: 'Ernakulam, Kerala',
    rating: 5,
    text: '“Urbanrealities is a full stack service provider for all real estate needs, with 15+ services”'
  },
  {
    name: 'Lilly Bennett',
    location: 'Ernakulam, Kerala',
    rating: 5,
    text: '“Urbanrealities is a full stack service provider for all real estate needs, with 15+ services”'
  },
];

const Testimonials = () => {
  const [reviews,setReviews] = useState([])


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/get-client-review`);
        const data = response.data; // ✅ access actual data
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className='testimonialsssection'>
      <div className="container">
        <h6 className='testimonials-title text-center'>Where Every Home Tells a Story: </h6>
        <SubHero 
          subHeroHeading={`Discover the Experiences of Our Satisfied Clients.”`} 
          subHeroText={""} 
        />
        
        <div className="testimonialsmainbody">
          <div className="testimonialscarddiv">
      {reviews.map((testimonial, index) => (
        <div className="testimonialcard" key={index}>
          <div className="ratingdiv">
            <div className="starsdiv">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className="testimonialstar"
                  src={i < 5 ? "/yellowstar.png" : "/graystar.png"} // Hardcoded 5 stars for now
                  alt="star"
                />
              ))}
            </div>
            <h6 className="ratingtext">{testimonial.review}</h6>
          </div>

          <div className="persondiv">
            
            <h6 className="name">{testimonial.title}</h6>
            <h6 className="location">{testimonial.short_description}</h6>
          </div>
        </div>
      ))}
    </div>

          <div className="navigationdiv">
            <button className='navigationbtn left-btn'>
              <img src="/arrowvector.svg" alt="left arrow" />
            </button>
            <button className='navigationbtn'>
              <img src="/arrowvector.svg" alt="right arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
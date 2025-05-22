import React from 'react';
import './Testimonials.css';
import '../../app/globals.css';
import SubHero from '../SubHero/SubHero';

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
  return (
    <div className='testimonialsssection'>
      <div className="container">
        <SubHero 
          subHeroHeading={`“Where Every Home Tells a Story: Discover the Experiences of Our Satisfied Clients.”`} 
          subHeroText={""} 
        />
        
        <div className="testimonialsmainbody">
          <div className="testimonialscarddiv">
            {testimonialsData.map((testimonial, index) => (
              <div className="testimonialcard" key={index}>
                <div className="ratingdiv">
                  <div className="starsdiv">
                    {[...Array(5)].map((_, i) => (
                      <img 
                        key={i} 
                        className='testimonialstar' 
                        src={i < testimonial.rating ? "/yellowstar.png" : "/graystar.png"} 
                        alt="star" 
                      />
                    ))}
                  </div>
                  <h6 className='ratingtext'>{testimonial.text}</h6>
                </div>
                <div className="persondiv">
                  <h6 className="name">{testimonial.name}</h6>
                  <h6 className="location">{testimonial.location}</h6>
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
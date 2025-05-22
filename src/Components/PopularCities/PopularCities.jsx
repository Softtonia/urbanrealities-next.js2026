import React from 'react'
import './PopularCities.css'
import '../../app/globals.css'
import SubHero from '../SubHero/SubHero'

const places = [
  {
    image: '/delhi_image.png',
    title: 'Delhi/NCR',
    properties: '162,000+ Properties'
  },
  {
    image: '/bangalore_image.png',
    title: 'Bangalore',
    properties: '39,000+ Properties'
  },
  {
    image: '/pune_image.png',
    title: 'Pune',
    properties: '42,000+ Properties'
  },
  {
    image: '/cheni_image.png',
    title: 'Cheni',
    properties: '29,000+ Properties'
  },
  {
    image: '/mumbai_image.png',
    title: 'Mumbai',
    properties: '41,000+ Properties'
  },
  {
    image: '/hyderabad_image.png',
    title: 'Hyderabad',
    properties: '24,000+ Properties'
  },
  {
    image: '/kolkata_image.png',
    title: 'Kolkata',
    properties: '25,000+ Properties'
  },
  {
    image: '/pune_2_image.png',
    title: 'Pune',
    properties: '17,000+ Properties'
  }
]

const PopularCities = () => {
  return (
    <div className="popularcitiessection">
      <div className="container">
        <SubHero subHeroHeading={"Explore Real Estate in popular Cities"} subHeroText={"TOP CITIES"} />

        <div className="popularcitiesmainbody">
        
          {places.map((place, index) => (
            <div className="placecard" key={index}>
              <div className="placeimagediv">
                <img src={place.image} alt={`${place.title}_image`} />
              </div>
              <div className="placetext">
                <h6 className="placetitle">{place.title}</h6>
                <h6 className="placeproperties">{place.properties}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularCities


// import React from 'react'
// import './PopularCities.css'
// import '../../app/globals.css'
// import SubHero from '../SubHero/SubHero'

// const PopularCities = () => {
//   return (
//     <div className="popularcitiessection">
//       <div className="container">
//           <SubHero subHeroHeading={"Explore Real Estate in popular Cities"} subHeroText={"TOP CITIES"} />

//           <div className="popularcitiesmainbody">
//             <div className="placecard">
//               <div className="placeimagediv">
//                 <img src="/delhi_image.png" alt="delhi_image.png" />
//               </div>
//               <div className="placetext">
//                 <h6 className="placetitle">Delhi/NCR</h6>
//                 <h6 className="placeproperties">162,000+ Properties</h6>
//               </div>
//             </div>
//           </div>
//       </div>
//     </div>
//   )
// }

// export default PopularCities
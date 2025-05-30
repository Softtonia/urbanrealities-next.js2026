import React from 'react'
import './PropertyServices.css'
import '../../app/globals.css'
import SubHero from '../SubHero/SubHero'

const propertyServicesData = [
  {
    image: "/packers-movers-image.png",
    title: "Packers & Movers",
    description: "Bibendum a pulvinar sem. Nunc um a pulvinar sem. Nunc endum a pulvinar sem. Nunc um a pulvinar sem.",
    link: "#"
  },
  {
    image: "/vastu-image.png",
    title: "Vaastu",
    description: "Bibendum a pulvinar sem. Nunc um a pulvinar sem. Nunc endum a pulvinar sem. Nunc um a pulvinar sem.",
    link: "#"
  },
  {
    image: "/interior-design-image.png",
    title: "Interior Design",
<<<<<<< HEAD
    description: "Bibendum a pulvinar sem. Nunc um a pulvinar sem. Nunc endum a pulvinar sem. Nunc um a pulvinar sem.",
=======
    description: "BibendBibendum a pulvinar sem. Nunc um a pulvinar sem. Nunc endum a pulvinar sem. Nunc um a pulvinar sem.",
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
    link: "#"
  },
  {
    image: "/interior-design-image.png",
    title: "Interior Design",
<<<<<<< HEAD
    description: "Bibendum a pulvinar sem. Nunc um a pulvinar sem. Nunc endum a pulvinar sem. Nunc um a pulvinar sem.",
=======
    description: "BibendBibendum a pulvinar sem. Nunc um a pulvinar sem. Nunc endum a pulvinar sem. Nunc um a pulvinar sem.",
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
    link: "#"
  }
]

const PropertyServices = () => {
  return (
    <div className="propertyserviceswrapper">

      <div className="container">
        <SubHero subHeroHeading={"Property Services"} subHeroText={""} />
        <div className="propservicescontainer">
          {propertyServicesData.map((service, index) => (
<<<<<<< HEAD
            <div className="propservicescard m-0" key={index}>
=======
            <div className="propservicescard" key={index}>
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
              <div className="propservicesimgdiv">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="propservicescontent">
                <h6 className='propservicestitle'>{service.title}</h6>
                <h6 className='propservicesdesc'>{service.description}</h6>
                <a className='viewmorelink btn-secondary-wt' href={service.link}>View More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PropertyServices


// import React from 'react'
// import './PropertyServices.css'
// import '../../app/globals.css'

// const PropertyServices = () => {
//   return (
//     <div className="container">
//         <div className="propservicescontainer">
//             <div className="propservicescard">
//                 <div className="propservicesimgdiv">
//                     <img src="/packers-movers-image.png" alt="packers-movers-image.png"/>
//                 </div>
//                 <div className="propservicescontent">
//                     <h6 className='propservicestitle'>Packers & Movers</h6>
//                     <h6 className='propservicesdesc'>BibendBibendum a pulvinar sem. Nunc um a pulvinar sem. Nunc endum a pulvinar sem. Nunc um a pulvinar sem. </h6>
//                     <a className='viewmorelink btn-secondary-wt' href="#">View More</a>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default PropertyServices
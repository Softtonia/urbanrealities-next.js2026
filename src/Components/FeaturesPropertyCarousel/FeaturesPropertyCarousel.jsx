import React from 'react'
import './FeaturesPropertyCarousel.css'
import '../../app/globals.css'

const FeaturesPropertyCarousel = () => {
  return (
    <div className='container'>
      <div className='featurespropcarsec'>
        <h1 className='featurespropcarheader'>Features Property</h1>
        <div className='featurespropcarinner'>
          <div className='featurespropcarcard'>
            <div className='featurespropcarimgdiv'>
              <img className='featurespropcarimg' src="/featurespropertycarouselimage.png" alt="" />
            </div>
            <div className='featurespropcarcardcontent'>
              <h6 className='featurescarousellocation'></h6>
              <h1 className='featurescarouselbuilder'></h1>
              <h6 className='areano'></h6>
              <h6 className='rating'></h6>
              <h6 className='proptype'></h6>
              <h6 className='origprice'></h6>



            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPropertyCarousel

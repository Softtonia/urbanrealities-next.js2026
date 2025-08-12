"'use client';"

import "../SubHero/SubHero.css"
const SubHero = ({subHeroHeading,subHeroText}) => {
  
  return (
    <>
  <div className="container">
    <div className="featured-wrapper text-center">
        <div className="d-flex align-items-center justify-content-center featured-header">
          <div className="lines">
            <div className="line long"></div>
            <div className="line short"></div>
            <div className="line thired"></div>

          </div>
      
          <h2 className="featured-title ">{subHeroHeading }</h2>
          
          <div className="lines one">
            <div className="line longon"></div>
            <div className="line shorton"></div>
            <div className="line thiredon"></div>

          </div>
        </div>
      
        <p className="featured-subtitle">{subHeroText}</p>
      </div>
    </div>
    </>
  )
}

export default SubHero
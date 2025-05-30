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
      
<<<<<<< HEAD
          <h2 className="featured-title ">{subHeroHeading }</h2>
      
          <div className="lines one">
            <div className="line longon"></div>
            <div className="line shorton"></div>
            <div className="line thiredon"></div>
=======
          <h2 className=" mb-0 featured-title " style={{ width: "600px"}} >{subHeroHeading }</h2>
      
          <div className="lines">
            <div className="line long"></div>
            <div className="line short"></div>
            <div className="line thired"></div>
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058

          </div>
        </div>
      
<<<<<<< HEAD
        <p className="featured-subtitle">{subHeroText}</p>
=======
        <p className="featured-subtitle mt-2">{subHeroText}</p>
>>>>>>> affe8e027f897efe58cb99ae907056a34ed7d058
      </div>
    </div>
    </>
  )
}

export default SubHero
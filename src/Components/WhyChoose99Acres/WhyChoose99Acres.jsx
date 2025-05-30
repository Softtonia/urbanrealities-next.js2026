import React from 'react'
import './WhyChoose99Acres.css'
import '../../app/globals.css'
import SubHero from '../SubHero/SubHero'
import "bootstrap/dist/css/bootstrap.min.css";

const WhyChoose99Acres = () => {
  return (
    <div className="whychoosesection">

        <div className="titlediv">
            <SubHero subHeroHeading={"Why choose 99acres"} subHeroText={"BENEFITS OF 99ACRES"} />
        </div>
        <div className="whychoosemainbody">
            <div className="reason1">
                <div className="icondiv">
                    <img src="/real_estate_agent.png" alt="real_estate_agent.png" />
                </div>
                <div className="reason1textdiv">
                    <h6 className="highlight">1. Over 12Lac properties</h6>
                    <h6 className="description">10,000+ properties are added every day</h6>
                </div>
            </div>
            <div className="reason2">
                <div className="icondiv">
                    <img src="/add_home_work.png" alt="add_home_work.png" />
                </div>
                <div className="reason2textdiv">
                    <h6 className="highlight">2. Verification by 99aces team</h6>
                    <h6 className="description">Photos/Videos and other details are Verified on location</h6>
                </div>
            </div>
            <div className="reason3">
                <div className="icondiv">
                    <img src="/person_apron.png" alt="person_apron.png" />
                </div>
                <div className="reason3textdiv">
                    <h6 className="highlight">3. Large user base</h6>
                    <h6 className="description">High active user count and user engagement to find  and close deals</h6>
                </div>
            </div>
        </div>
                

    </div>
  )
}

export default WhyChoose99Acres
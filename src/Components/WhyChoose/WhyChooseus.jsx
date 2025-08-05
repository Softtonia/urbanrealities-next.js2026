"'use client';"
import React from 'react'
import './WhyChooseus.css'
import '../../app/globals.css'
import SubHero from '../SubHero/SubHero'
import "bootstrap/dist/css/bootstrap.min.css";

const WhyChooseus = () => {
  return (
    <div className="whychoosesection">

        <div className="titlediv">
            <SubHero subHeroHeading={"Why choose Urbanrealities"} subHeroText={"BENEFITS OF Urbanrealities"} />
        </div>
        <div className="whychoosemainbody container">
            <div className="reason1">
                <div className="icondiv">
                    <img src="/real_estate_agent.png" alt="real_estate_agent.png" className='benifit-icon' />
                </div>
                {/* <div className="reason1textdiv"> */}
                    <h4 className="highlight">1. Over 12Lac properties</h4>
                    <div className="description body-text-16">10,000+ properties are added every day</div>
                {/* </div> */}
            </div>
            <div className="reason1">
                <div className="icondiv">
                    <img src="/add_home_work.png" alt="add_home_work.png" className='benifit-icon'  />
                </div>
                {/* <div className="reason1textdiv"> */}
                    <h4 className=" highlight">2. Verification by 99aces team</h4>
                    <div className="description body-text-16">Photos/Videos and other details are<br/> Verified on location</div>
                {/* </div> */}
            </div>
            <div className="reason1">
                <div className="icondiv">
                    <img src="/person_apron.png" alt="person_apron.png" className='benifit-icon'  />
                </div>
                {/* <div className="reason1textdiv"> */}
                    <h4 className="highlight">3. Large user base</h4>
                    <div className="description body-text-16">High active user count and user engagement to<br/> find  and close deals</div>
                {/* </div> */}
            </div>
        </div>
                

    </div>
  )
}

export default WhyChooseus
"'use client';"

import './OwnerProperties.css'
import '../../app/globals.css'

const OwnerProperties = () => {
    return (
        <div className="container">
            <div className="ownerpropertiessection">

                {/* first card */}
                <div className="ownerpropertiescard">
                    <div className="ownerpropimgdiv">
                        <img className='ownerpropimg' src="/ownerproperties1.png" alt="ownerproperties1.png" />
                    </div>
                    <div className="ownerpropcontent">
                        <span className="ownerproppricespan">
                            <div className='ownerpropprice body-text-16'>14,785</div>
                            <div className='ownerproplabel'>Owner Properties</div>
                        </span>
                        <span className="ownerpropbtnspan">
                            <button className='btn'>Explore</button>
                            <img src='/arrowvector.svg' alt="arrow" />
                        </span>
                    </div>
                </div>

                {/* second card */}
                <div className="ownerpropertiescard">
                    <div className="ownerpropimgdiv">
                        <img className='ownerpropimg' src="/ownerproperties2.png" alt="ownerproperties2.png" />
                    </div>
                    <div className="ownerpropcontent">
                        <span className="ownerproppricespan">
                            <div className='ownerpropprice'>14,785</div>
                            <div className='ownerproplabel'>Owner Properties</div>
                        </span>
                        <span className="ownerpropbtnspan">
                            <button className='btn'>Explore</button>
                            <img src='/arrowvector.svg' alt="arrow" />
                        </span>
                    </div>
                </div>

                {/* third card */}
                <div className="ownerpropertiescard">
                    <div className="ownerpropimgdiv">
                        <img className='ownerpropimg' src="/ownerproperties3.png" alt="ownerproperties3.png" />
                    </div>
                    <div className="ownerpropcontent">
                        <span className="ownerproppricespan">
                            <div className='ownerpropprice'>14,785</div>
                            <div className='ownerproplabel'>Owner Properties</div>
                        </span>
                        <span className="ownerpropbtnspan">
                            <button className='btn'>Explore</button>
                            <img src='/arrowvector.svg' alt="arrow" />
                        </span>
                    </div>
                </div>

                {/* fourth card */}
                <div className="ownerpropertiescard">
                    <div className="ownerpropimgdiv">
                        <img className='ownerpropimg' src="/ownerproperties4.png" alt="ownerproperties4.png"/>
                    </div>
                    <div className="ownerpropcontent">
                        <span className="ownerproppricespan">
                            <div className='ownerpropprice'>14,785</div>
                            <div className='ownerproplabel'>Owner Properties</div>
                        </span>
                        <span className="ownerpropbtnspan">
                            <button className='btn'>Explore</button>
                            <img src='/arrowvector.svg' alt="arrow" />
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OwnerProperties


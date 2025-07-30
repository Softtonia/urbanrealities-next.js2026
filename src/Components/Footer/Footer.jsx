"use client";

import React, { useEffect, useState } from "react";
// import axios from "axios";
import "../Footer/Footer.css";
import "../../app/globals.css";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { get } from "@/lib/api";
import getSiteSettings from "@/utils/getsitedata";
const Footer = () => {
  const [siteData, setSiteData] = useState({});
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchSiteData = async () => {
      try {

        const data =await getSiteSettings();
        
        setSiteData(data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };

    fetchSiteData();
  }, []);

  console.log("demo",siteData)


  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/-subscribe-email`, { email })
      const data = response.data;
      console.log(data)
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <>
      <div className="footer-main-div bg-dark-footer text-white">
        <div className="container">
          <div className="row d-flex">
            <div className="col-xl-4 col-lg-12">
              <div className="footer-aboutus footer-primiry-heading">About Us</div>
              <p className="body-text-14">
                {siteData?.site_short_description || "Loading..."}
              </p>
            </div>

            <div className="col-xl-2 col-lg-6">
              <div className="footer-properties footer-primiry-heading">Properties in India</div>
              <ul className="footer-list-none">
                <li>Properties in Delhi</li>
                <li>Properties in Hyderabad</li>
                <li>Properties in Kerala</li>
                <li>Properties in Gujarat</li>
                <li>Properties in Pune</li>
                <li>Properties in Bangalore</li>
                <li>Properties in Mumbai</li>
              </ul>
            </div>

            <div className="col-xl-2 col-lg-6">
              <div className="footer-company footer-primiry-heading">Company</div>
              <ul className="list-color footer-list-none">
                <li><a href="">About Us</a></li>
                <li><a href="">Careers</a></li>
                <li><a href="">FAQs</a></li>
                <li><a href="">Contact Us</a></li>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Terms of Use</a></li>
                <li><a href="">Legal</a></li>
              </ul>
            </div>

            <div className="col-xl-4 col-lg-12">
              <div className="footer-subscribe footer-primiry-heading">Subscribe</div>
              <form className="d-flex gap-2" onSubmit={handlesubmit}>
                <div>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
                </div>
                <div>
                  <button className="btn btn-subscribe text-white" type="submit">Subscribe</button>
                </div>
              </form>

              <div className="mb-3 mt-3">
                <a href={siteData?.facebook || "#"} target="blank" className="text-white me-3"><FaFacebook /></a>
                <a href={siteData?.instagram || "#"} target="blank" className="text-white me-3"><FaInstagram /></a>
                <a href={siteData?.twitter || "#"} target="blank" className="text-white me-3"><FaTwitter /></a>
              </div>

              <p className="body-text-14 mt-0">
                {siteData?.subscribe_short_description || "Loading..."}
              </p>
            </div>
          </div>

          {/* ...Keep your remaining footer layout... */}

          <hr className="border-secondary" />
          <div className="text-end">
            <span className="me-3">Privacy Policy</span>
            <span className="me-3">Terms of Use</span>
            <span className="me-3">Sales and Refunds</span>
            <span className="mb-0 me-3">Legal</span>
          </div>
        </div>
      </div>

      <div className="footer-secondary text-white bg-dark">
        <div className="container">
          <div className="text-center mt-3">
            <p className="body-text-12">
              {siteData?.disclaimer || "Loading..."}
            </p>
          </div>
          <div className="text-center mt-3">
            <p className="body-text-12">
              {siteData?.copyright_text || "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

// import React from "react";
// import "../Footer/Footer.css"
// import "../../app/globals.css"
// const Footer = () => {
//   return (
//     <>
//       <div className="footer-main-div bg-dark-footer text-white">
//         <div className="container">
//           <div className="row d-flex">
//             <div className="col-xl-4 col-lg-12">
//               <div className="footer-aboutus footer-primiry-heading">about us</div>
//               <p className="body-text-14">
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
//                 quae nemo obcaecati eius similique vero a officiis nesciunt
//                 excepturi incidunt at tenetur, quos voluptatibus temporibus quas
//                 veritatis ipsum sint eaque libero culpa modi adipisci possimus.
//                 Odit excepturi assumenda quasi odio eveniet aliquam ex similique
//                 doloribus quidem fugiat. Quae, ratione autem?
//               </p>
//             </div>
//             <div className="col-xl-2 col-lg-6">
//               <div className="footer-properties footer-primiry-heading">
//                 properties in india
//               </div>
//               <ul className="footer-list-none">
//                 <li>Properties in Delhi</li>
//                 <li>Properties in Hyderabad</li>
//                 <li>Properties in Kerala</li>
//                 <li>Properties in Gujarat</li>
//                 <li>Properties in Pune</li>
//                 <li>Properties in Bangalore</li>
//                 <li>Properties in Mumbai</li>
//               </ul>
//             </div>
//             <div className="col-xl-2 col-lg-6">
//               <div className="footer-company footer-primiry-heading">company</div>
//               <ul className="list-color footer-list-none">
//                 <li>
//                   <a href="">about us</a>
//                 </li>
//                 <li>
//                   <a href="">careers</a>
//                 </li>
//                 <li>
//                   <a href="">FAQs</a>
//                 </li>
//                 <li>
//                   <a href="">Contact Us</a>
//                 </li>
//                 <li>
//                   <a href="">Privacy Policy</a>
//                 </li>
//                 <li>
//                   <a href="">Terms of Use</a>
//                 </li>
//                 <li>
//                   <a href="">Legal</a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-xl-4 col-lg-12">
//               <div className="footer-subscribe footer-primiry-heading">
//                 Subscribe
//               </div>
//               <form className="d-flex gap-2">
//                <div>
//                <input
//                   type="email"
//                   className="form-control me-"
//                   placeholder="Enter your email address"
//                 />
//                </div>
//                 <div><button className="btn btn-subscribe text-white">Subscribe</button></div>
//               </form>
//               <div className="mb-3 mt-3">
//                 <a href="#" className="text-white me-3">
//                   <i className="fab fa-facebook-f"></i>
//                 </a>
//                 <a href="#" className="text-white me-3">
//                   <i className="fab fa-instagram"></i>
//                 </a>
//                 <a href="#" className="text-white me-3">
//                   <i className="fab fa-twitter"></i>
//                 </a>
//               </div>
//               <p className="body-text-14 mt-0">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Repudiandae, dolores voluptatum dolorum quam ipsam dolore
//                 reiciendis, eligendi facilis consequatur voluptatem at quaerat
//                 aliquam inventore consectetur quibusdam rerum atque sequi
//                 maiores.
//               </p>
//             </div>
//           </div>

//           <div className="row d-flex">
//             <div className="col-xl-6 col-lg-6">
//               <div className="footer-project footer-primiry-heading">
//                 Project in india
//               </div>

//               <div className="list-color">
//                 <span>
//                   {" "}
//                   <a href="">Project in new Delhi|</a>
//                 </span>
//                 <span>
//                   {" "}
//                   <a href="">Property in Mumbai|</a>
//                 </span>
//                 <span>
//                   {" "}
//                   <a href="">Property in chennai|</a>
//                 </span>
//                 <span>
//                   {" "}
//                   <a href="">Property in Pune|</a>
//                 </span>
//                 <br />
//                 <span>
//                   {" "}
//                   <a href="">Property in Nodia|</a>
//                 </span>
//                 <span>
//                   {" "}
//                   <a href="">Property in Gurgaon|</a>
//                 </span>
//                 <span>
//                   {" "}
//                   <a href="">Property in Bangalore|</a>
//                 </span>
//                 <span>
//                   {" "}
//                   <a href="">Property in Ahmedabad|</a>
//                 </span>
//                 <br />
//                 <span>
//                   {" "}
//                   <a href="">Property in Hyderabad|</a>
//                 </span>
//                 <span>
//                   {" "}
//                   <a href="">Property in Kerala|</a>
//                 </span>
//               </div>
//             </div>
//             <div className="col-xl-6 col-lg-6">
//               <div className="footer-new-properties footer-primiry-heading">
//                 Properties in india
//               </div>
//               <div className="list-color">
//                 <span>
//                   <a href="">New Projects in New Delhi| </a>
//                 </span>
//                 <span>
//                   <a href="">New Projects in Mumbai|</a>
//                 </span>
//                 <span>
//                   <a href="">New Projects in chennai|</a>
//                 </span>
//                 <br />
//                 <span>
//                   <a href="">New Projects in Nodia|</a>
//                 </span>
//                 <span>
//                   <a href="">New Projects in Gurgaon|</a>
//                 </span>
//                 <span>
//                   <a href="">New Projects in Bangalore|</a>
//                 </span>
//                 <br />
//                 <span>
//                   <a href="">New Projects in Ahmedabad|</a>
//                 </span>
//                 <span>
//                   <a href="">New Projects in Pune|</a>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <hr className="border-secondary" />
//           <div className="text-end">
//             <span className="me-3">Privacy Policy</span>
//             <span className="me-3">Terms of Use </span>
//             <span className="me-3">Sales and Refunds</span>
//             <span className="mb-0 me-3">Legal</span>
//           </div>
//         </div>
//       </div>

//       <div className="footer-secondary text-white bg-dark">
//         <div className="container">
//           <div className="text-center mt-3">
//             <p className="body-text-12">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
//               quia ut magnam laudantium aperiam, iusto saepe! Expedita
//               accusantium veritatis fugiat nostrum et aspernatur provident ad
//               dolore quia. Consectetur temporibus qui delectus optio praesentium
//               suscipit reprehenderit! Maiores vero ullam vitae, adipisci
//               perferendis veniam possimus, magni esse corrupti a ex. Porro,
//               deserunt!
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Footer;

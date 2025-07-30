"use client";

import React, { useEffect, useState } from "react";
import "../Footer/Footer.css";
import "../../app/globals.css";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import getSiteSettings from "@/utils/getsitedata";

const Footer = () => {
  const [siteData, setSiteData] = useState({});
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchsiteData = async() => {
      try {

        const res = await fetch('/api/site-setting'); // 🔒 safe server-side API
        if (!res.ok) throw new Error('Failed to fetch site settings');
        const data = await res.json();
        setSiteData(data.data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchsiteData();
  }, []);
  // console.log("siteData", siteData);

  // const handlesubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/subscribe-email`, { email })
  //     const data = response.data;
  //     console.log(data)
  //   } catch (error) {
  //     console.error(error)
  //   }

  // }

  return (
    <>
      <div className="footer-main-div bg-dark-footer text-white">
        <div className="container">
          <div className="row d-flex">
            <div className="col-xl-4 col-lg-12">
              <div className="footer-aboutus footer-primiry-heading">
                About Us
              </div>
              <p className="body-text-14">
                {siteData?.site_short_description || "Loading..."}
              </p>

              <div className="footer-aboutus footer-primiry-heading">
                Address
              </div>
              <p className="body-text-14">
                {siteData?.address || "Loading..."}
              </p>
              <p className="body-text-14">
                {siteData?.mobile_number || "Loading..."}
              </p>
            </div>

            <div className="col-xl-2 col-lg-6">
              <div className="footer-properties footer-primiry-heading">
                Properties in India
              </div>
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
              <div className="footer-company footer-primiry-heading">
                Company
              </div>
              <ul className="list-color footer-list-none">
                <li>
                  <a href="">About Us</a>
                </li>
                <li>
                  <a href="">Careers</a>
                </li>
                <li>
                  <a href="">FAQs</a>
                </li>
                <li>
                  <a href="">Contact Us</a>
                </li>
                <li>
                  <a href="">Privacy Policy</a>
                </li>
                <li>
                  <a href="">Terms of Use</a>
                </li>
                <li>
                  <a href="">Legal</a>
                </li>
              </ul>
            </div>

            <div className="col-xl-4 col-lg-12">
              <div className="footer-subscribe footer-primiry-heading">
                Subscribe
              </div>
              <form className="d-flex gap-2">
                {/* onSubmit={handlesubmit} */}
                <div>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <button
                    className="btn btn-subscribe text-white"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              <div className="mb-3 mt-3">
                <a
                  href={siteData?.facebook || ""}
                  target="_blank"
                  className="text-white me-3"
                >
                  <FaFacebook />
                </a>
                <a
                  href={siteData?.instagram || ""}
                  target="_blank"
                  className="text-white me-3"
                >
                  <FaInstagram />
                </a>
                <a
                  href={siteData?.twitter || ""}
                  target="_blank"
                  className="text-white me-3"
                >
                  <FaTwitter />
                </a>
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


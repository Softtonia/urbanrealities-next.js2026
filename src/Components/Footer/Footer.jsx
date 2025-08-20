"use client";

import React, { useEffect, useState, useMemo } from "react";
import "../Footer/Footer.css";
import "../../app/globals.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { useSiteSettings } from "../mycontext/siteSettingContext";

const Footer = () => {
  // const [siteData, setSiteData] = useState(serverData || null); // null for initial state
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const [year, setYear] = useState(null);
  const { settings } = useSiteSettings();

  const siteData = settings || {
    site_short_description: "We build your dream",
    address: "Not available",
    mobile_number: "Not available",
    disclaimer: "All rights reserved",
    copyright_text: `© ${new Date().getFullYear()} Your Company`,
    subscribe_short_description: "Stay updated with our newsletter",
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  //  const initialData = useMemo(() => serverData || null, [serverData]);
  // useEffect(() => {
  //   if (!initialData) {
  //     const fetchSiteData = async () => {
  //       try {
  //         const res = await fetch("/api/site-setting");
  //         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  //         const data = await res.json();
  //         setSiteData(data.data || {});
  //       } catch (error) {
  //         console.error("Fetch error:", error);
  //         setSiteData({});
  //       }
  //     };
  //     fetchSiteData();
  //   }
  // }, [initialData]);

  // Enhanced email submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateEmail(email)) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      const response = 1;
      // await post(
      //   `/api/insert-subscribe-email`,
      //   { email },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ email }),
      //     credentials: "include",
      //   }
      // );

      if (!response.ok) {
        throw new Error(response.data?.message || "Subscription failed");
      }

      setSubmitStatus({
        success: true,
        message: "Thank you for subscribing!",
      });
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setSubmitStatus({
        success: false,
        message: error.message || "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Email validation helper
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Social URL formatter
  const formatSocialUrl = (url, platform) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    if (url.startsWith("www.")) return `https://${url}`;

    switch (platform) {
      case "facebook":
        return `https://facebook.com/${url.replace("@", "")}`;
      case "instagram":
        return `https://instagram.com/${url.replace("@", "")}`;
      case "twitter":
        return `https://twitter.com/${url.replace("@", "")}`;
      default:
        return `https://${url}`;
    }
  };

  // Loading state
  // if (siteData === null) {
  //   return (
  //     <div className="footer-main-div bg-dark-footer text-white">
  //       <div className="container text-center py-4">Loading footer data...</div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="footer-main-div bg-dark-footer text-white">
        <div className="container">
          <div className="row d-flex">
            {/* About Us Section */}
            <div className="col-xl-3 col-md-6">
              <div className="footer-aboutus footer-primiry-heading">
                About Us
              </div>
              <p className="body-text-14">
                {siteData.site_short_description || "Not available"}
              </p>
            </div>
            <div className="col-xl-2 col-md-6">
              <div className="footer-address footer-primiry-heading">
                Address
              </div>
              <p className="body-text-14">
                {siteData.address || "Not available"}
              </p>
              <p className="body-text-14">
                {siteData.mobile_number || "Not available"}
              </p>
            </div>
            {/* Properties Section */}
            <div className="col-xl-2 col-md-6">
              <div className="footer-properties footer-primiry-heading">
                Properties in India
              </div>
              <ul className="footer-list-none">
                {[
                  "Delhi",
                  "Hyderabad",
                  "Kerala",
                  "Gujarat",
                  "Pune",
                  "Bangalore",
                  "Mumbai",
                ].map((city) => (
                  <li key={city}>Properties in {city}</li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div className="col-xl-2 col-md-6">
              <div className="footer-company footer-primiry-heading">
                Company
              </div>
              <ul className="list-color footer-list-none">
                {[
                  { label: "About Us", href: "/about-us" },
                  { label: "Careers", href: "/careers" },
                  { label: "FAQs", href: "/faqs" },
                  { label: "Contact Us", href: "/contact-us" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms of Use", href: "/terms-of-use" },
                  { label: "Legal", href: "/legal" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="  "
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe Section */}
            <div className="col-xl-3 col-md-6">
              <div className="footer-subscribe footer-primiry-heading">
                Subscribe
              </div>
              <form className="d-flex gap-2" onSubmit={handleSubmit}>
                <div className="flex-grow-1">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <button
                    className="btn btn-subscribe text-white"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
              </form>

              {submitStatus.message && (
                <div
                  className={`mt-2 alert ${
                    submitStatus.success ? "alert-success" : "alert-danger"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="mb-3 mt-3">
                {siteData.facebook && (
                  <a
                    href={formatSocialUrl(siteData.facebook, "facebook") || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white me-3"
                  >
                    <FaFacebook />
                  </a>
                )}
                {siteData.instagram && (
                  <a
                    href={
                      formatSocialUrl(siteData.instagram, "instagram") || "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white me-3"
                  >
                    <FaInstagram />
                  </a>
                )}
                {siteData.twitter && (
                  <a
                    href={formatSocialUrl(siteData.twitter, "twitter") || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white me-3"
                  >
                    <FaTwitter />
                  </a>
                )}
              </div>

              <p className="body-text-14 mt-0">
                {siteData.subscribe_short_description ||
                  "Stay updated with our newsletter"}
              </p>
            </div>
          </div>

          <hr className="border-secondary" />
          <div className="text-center text-md-end">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Use", href: "/terms-of-use" },
              { label: "Sales and Refunds", href: "/sales-refunds" },
              { label: "Legal", href: "/legal" },
              { label: "Testimonials", href: "/testimonials" },
            ].map(({ label, href }) => (
              <Link
                href={href}
                key={label}
                className="me-3 text-white text-decoration-none"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-secondary text-white bg-dark">
        <div className="container">
          <div className="text-center py-3">
            <p className="body-text-12 mb-1">
              {siteData.disclaimer || "All rights reserved"}
            </p>
            <p className="body-text-12 mb-0">
              {siteData.copyright_text || (year && `© ${year} Your Company`)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

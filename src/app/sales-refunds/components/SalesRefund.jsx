// "use client";
// import React, { useEffect, useState } from "react";
// import styles from "./SalesRefund.module.css";
// import Image from "next/image";

// const faqs = [
//   {
//     question: "How do I request a refund?",
//     answer:
//       "Submit your refund request via our support form or email within 7 days of purchase.",
//   },
//   {
//     question: "How long does it take to process a refund?",
//     answer:
//       "Refunds are usually processed within 5-7 business days after approval.",
//   },
//   {
//     question: "Are there any items that are non-refundable?",
//     answer:
//       "Digital products, customized items, and opened packages are generally non-refundable.",
//   },
// ];

// const steps = [
//   "Submit your refund request via the support form or email.",
//   "Our team reviews your request within 48 hours.",
//   "If approved, refund is credited to your account within 5-7 days.",
// ];

// const SalesRefund = () => {
//   const [activeFaq, setActiveFaq] = useState(null);
//   const [salerefund, setSaleRefund] = useState(null);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchsalerefund = async () => {
//       try {
//         const res = await fetch(`/api/sales-&-refunds`);
//         const data = await res.json();
//         console.log("Fetched terms:", data);
//         setSaleRefund(data.data);
//       } catch (err) {
//         console.error("Error fetching:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchsalerefund();
//   }, []);
//   if (loading) return <p>Loading...</p>;

//   const toggleFaq = (index) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   return (
//     <div className={styles.pageWrapper}>
//       <h1>{salerefund.page_title}</h1>
// <p>{salerefund.content}</p>

//       {/* Hero Section */}
//       <section className={styles.hero}>
//         <div className={styles.heroText}>
//           <h1>Sales & Refund Policy</h1>
//           <p>
//             Your satisfaction is our priority. Learn how our sales and refund
//             policy works.
//           </p>
//           <button className={styles.ctaButton}>Request a Refund</button>
//         </div>
//         <div className={styles.heroImage}>
//           <Image
//             src="/homeloan.png"
//             alt="Refund Illustration"
//             width={512}
//             height={300}
//           />
//         </div>
//       </section>

//       {/* Steps Section */}
//       <section className={styles.steps}>
//         <h2>How Refund Works</h2>
//         <ol>
//           {steps.map((step, index) => (
//             <li key={index}>{step}</li>
//           ))}
//         </ol>
//       </section>

//       {/* FAQ Section */}
//       <section className={styles.faqs}>
//         <h2>Frequently Asked Questions</h2>
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             className={`${styles.faqItem} ${
//               activeFaq === index ? styles.active : ""
//             }`}
//             onClick={() => toggleFaq(index)}
//           >
//             <h3>{faq.question}</h3>
//             {activeFaq === index && <p>{faq.answer}</p>}
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default SalesRefund;


import React from 'react';
import styles from "./SalesRefund.module.css";

const SalesRefund = ({salerefund}) => {
    if (!salerefund) return <p>No sale & refunds content available.</p>;

  return (
      <div className={`${styles.pageWrapper} container`}>
      <div dangerouslySetInnerHTML={{ __html: salerefund.content }} />
    </div>
  );
}

export default SalesRefund;

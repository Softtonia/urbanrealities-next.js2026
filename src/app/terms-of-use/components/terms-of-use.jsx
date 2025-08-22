// "use client";
// import React, { useState, useEffect } from "react";
// import styles from "./terms-of-use.module.css";

// const termsData = [
//   { id: 1, title: "Acceptance of Terms", content: "By using this site, you agree to these Terms of Use. If you do not agree, please do not use the site." },
//   { id: 2, title: "Changes to Terms", content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting." },
//   { id: 3, title: "Use of Content", content: "All content on this site is for informational purposes only. Unauthorized use is prohibited." },
//   { id: 4, title: "Limitation of Liability", content: "We are not liable for any damages arising from the use of this site." },
//   { id: 5, title: "Contact", content: "For questions about these terms, please contact us." },
// ];

// const TermsOfUse = () => {
//   const [activeId, setActiveId] = useState(1);
//   const [useterms, setUseTerms] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch terms
//   useEffect(() => {
//     const fetchTerms = async () => {
//       try {
//         const res = await fetch(`/api/terms-of-use`);
//         const data = await res.json();
//         // console.log("Fetched terms:", data);
//         setUseTerms(data.data);
//       } catch (err) {
//         console.error("Error fetching:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTerms();
//   }, []);

//   // Scroll listener
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll(`.${styles.termItem}`);
//       let current = 1;
//       sections.forEach((section) => {
//         const top = section.getBoundingClientRect().top;
//         if (top < 150) current = Number(section.dataset.id);
//       });
//       setActiveId(current);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Render
//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.pageWrapper}>
//       <h1>{useterms.page_title}</h1>
// <p>{useterms.content}</p>



//       <div className={styles.termsContainer}>
//         <div className={styles.termList}>
//           {termsData.map((term) => (
//             <div
//               key={term.id}
//               className={`${styles.termNumber} ${activeId === term.id ? styles.active : ""}`}
//             >
//               {term.id}. {term.title}
//             </div>
//           ))}
//         </div>
//         <div className={styles.termContent}>
//           {termsData.map((term) => (
//             <div key={term.id} className={styles.termItem} data-id={term.id}>
//               <h2>{term.id}. {term.title}</h2>
//               <p>{term.content}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsOfUse;
import React from 'react';
import styles from "./terms-of-use.module.css";

const TermsOfUse = ({useterms}) => {
    if (!useterms) return <p>No Terms Of Use content available.</p>;

  return (
      <div className={`${styles.pageWrapper} container`}>
      <div dangerouslySetInnerHTML={{ __html: useterms.content }} />
    </div>
  );
}

export default TermsOfUse;

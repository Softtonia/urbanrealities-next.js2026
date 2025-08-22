// "use client";
// import React, { useState } from "react";
// import styles from "./legal.module.css";

// const legalSections = [
//   { id: 1, title: "Terms of Service", content: "By using our website, you agree to our Terms of Service. Read carefully before using our services." },
//   { id: 2, title: "Privacy Policy", content: "We respect your privacy and handle your data responsibly." },
//   { id: 3, title: "Disclaimer", content: "All information on this website is for informational purposes only." },
//   { id: 4, title: "Cookies & Tracking", content: "We use cookies to improve your experience. You can manage your preferences." },
//   { id: 5, title: "Contact", content: "For any legal inquiries, contact our support team via email or phone." },
// ];

// const LegalPage = () => {
//   const [activeId, setActiveId] = useState(null);

//   const toggleSection = (id) => setActiveId(activeId === id ? null : id);

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.hero}>
//         <h1 className={styles.title}>Legal & Policies</h1>
//         <p className={styles.subtitle}>
//           Read our policies carefully to understand your rights and responsibilities.
//         </p>
//       </div>

//       <div className={styles.sections}>
//         {legalSections.map((section) => (
//           <div
//             key={section.id}
//             className={`${styles.sectionItem} ${activeId === section.id ? styles.active : ""}`}
//             onClick={() => toggleSection(section.id)}
//           >
//             <h2>{section.title}</h2>
//             {activeId === section.id && <p>{section.content}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LegalPage;

import React from 'react';
import styles from "./legal.module.css";

const LegalPage = ({legal}) => {
    if (!legal) return <p>No Legal content available.</p>;

  return (
      <div className={`${styles.pageWrapper} container`}>
      <div dangerouslySetInnerHTML={{ __html: legal.content }} />
    </div>
  );
}

export default LegalPage;
// 'use client'
// import React,{useState,useEffect} from 'react';
// import styles from './Privacy-Policy.module.css'

// const PrivacyPolicy = () => {
//     const [policy, setPolicy] = useState(null); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//       const fetchPolicy  = async () => {
//         try {
//           const res = await fetch(`/api/privacypolicy`);
//           const data = await res.json();
//           if (data) {
//             setPolicy(data.data);
//           }
//         } catch (err) {
//           console.error("Error fetching agent:", err);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchPolicy();
//     }, []);
  
//     if (loading) return <p>Loading...</p>;
//   return (

// <div className={` ${styles.privacySection} container `}>
//   <h1>{policy.page_title}</h1>
//   <p>{policy.content}</p>



//     </div> 
    
// );
// }

// export default PrivacyPolicy;

import React from 'react';
import styles from './Privacy-Policy.module.css';

const PrivacyPolicy = ({ policy }) => {
  if (!policy) return <p>No policy content available.</p>;

  return (
    <div className={`${styles.privacySection} container`}>
      <div dangerouslySetInnerHTML={{ __html: policy.content }} />
    </div>
  );
};

export default PrivacyPolicy;

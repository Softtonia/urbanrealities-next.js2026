// "use client";
// import { useState } from "react";
// import "./Propertyprice.css";

// const Propertyprice = () => {
//    const [showAll, setShowAll] = useState(false);

//   const priceData = Array(8).fill({ price: "₹ 1.3 Cr.", booking: "₹ 1,00,000" });

//   return (
//     <div className="price-details-box">
//       <h4 className="section-title">Price Details</h4>
//       <div className="price-grid">
//         {(showAll ? priceData : priceData.slice(0, 4)).map((item, index) => (
//           <div key={index} className="price-column">
//             <div>
//               <p className="label">Price Breakup</p>
//               <p className="value">{item.price}</p>
//             </div>
//             <div>
//               <p className="label">Booking Amount</p>
//               <p className="value">{item.booking}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <p className="view-more" onClick={() => setShowAll(!showAll)}>
//         {showAll ? "View less Details" : "View all Details"}
//       </p>
//     </div>
//   );
// }

// export default Propertyprice;

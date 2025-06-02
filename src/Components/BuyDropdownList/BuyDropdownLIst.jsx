// import { Link, useNavigate } from "react-router-dom";
// import BuyDropdownList from "./BuyDropdownList";
// import RentDropdownList from "./RentDropdownList";
// import Hamburger from "./Hamburger";
// import add_home from "../../../img/add_home.svg";

// export default function HeaderTwo({ setting, auth, handleLogout, HandleClick }) {
//   const nav = useNavigate();
//   return (
//     <div className="bg-black sticky top-0 left-0 right-0 z-[80] py-[22px]">
//       <div className="container flex justify-between items-center">
//         <div className="flex items-center">
//           <Link to="/">
//             <img src={setting?.website_logo} className="hidden md:block" />
//             <img src={setting?.mobile_logo} className="block md:hidden" />
//           </Link>
//           <button
//             className="ml-[30px]"
//             onClick={HandleClick}
//             style={{ background: "transparent", border: "none", outline: "none" }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="14"
//               height="16"
//               viewBox="0 0 14 16"
//               fill="none"
//             >
//               <path
//                 d="M7.00296 7.75182C7.44227 7.75182 7.81713 7.61123 8.12754 7.33004C8.43795 7.04886 8.59315 6.71055 8.59315 6.31511C8.59315 5.91968 8.43696 5.58226 8.12458 5.30285C7.81154 5.02344 7.43569 4.88373 6.99704 4.88373C6.55839 4.88373 6.18353 5.02462 5.87246 5.3064C5.56205 5.58758 5.40685 5.92589 5.40685 6.32133C5.40685 6.71676 5.56304 7.05418 5.87542 7.33359C6.18846 7.613 6.56431 7.75271 7.00296 7.75271M7 16C4.68179 14.1548 2.93574 12.434 1.76184 10.8375C0.587279 9.24091 0 7.78793 0 6.4785C0 4.60018 0.67935 3.051 2.03805 1.83096C3.39741 0.610319 5.05139 0 7 0C8.94861 0 10.6026 0.610319 11.962 1.83096C13.3207 3.051 14 4.60018 14 6.4785C14 7.78793 13.413 9.24091 12.2391 10.8375C11.0646 12.434 9.31821 14.1548 7 16Z"
//                 fill="#ffffff"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="flex items-center">
//           <ul className="flex items-center m-0 gap-4">
//             <li className="relative group">
//               <Link className="text-white text-sm font-medium">Buy</Link>
//               <span className="ml-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   height="5"
//                   viewBox="0 0 10 5"
//                   fill="none"
//                 >
//                   <path d="M0 0L5 5L10 0H0Z" fill="white" />
//                 </svg>
//               </span>
//               <ul className="absolute top-full left-0 hidden group-hover:block">
//                 <li>
//                   <div className="bg-white p-2 shadow-md">
//                     <BuyDropdownList />
//                   </div>
//                 </li>
//               </ul>
//             </li>
//             <li className="relative group">
//               <Link className="text-white text-sm font-medium">Rent</Link>
//               <span className="ml-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   height="5"
//                   viewBox="0 0 10 5"
//                   fill="none"
//                 >
//                   <path d="M0 0L5 5L10 0H0Z" fill="white" />
//                 </svg>
//               </span>
//               <ul className="absolute top-full left-0 hidden group-hover:block">
//                 <li>
//                   <div className="bg-white p-2 shadow-md">
//                     <RentDropdownList />
//                   </div>
//                 </li>
//               </ul>
//             </li>
//             <li>
//               <Link to="/find-agent" className="text-white text-sm font-medium">Find Agent</Link>
//             </li>
//             <li>
//               <Link to="/all-projects" className="text-white text-sm font-medium">Projects</Link>
//             </li>
//             <li>
//               <Link className="text-white text-sm font-medium">Services</Link>
//             </li>
//             <li>
//               <Link className="text-white text-sm font-medium">Home Loans</Link>
//             </li>
//           </ul>
//           <button onClick={() => nav('/list-property')} className="ml-4 flex items-center text-white font-bold">
//             <img src={add_home} alt="Add Home" />
//             <span className="ml-2 text-sm">Post Property</span>
//             <span className="ml-1 bg-orange-500 text-white px-2 py-0.5 rounded text-sm">Free</span>
//           </button>
//           <div className="flex items-center ml-4">
//             <button onClick={() => nav('/help')} className="text-white text-sm font-medium">Help</button>
//             <div className="w-px h-6 bg-gray-500 mx-3"></div>
//             {auth.isLoggedIn ? (
//               <div className="relative group">
//                 <a className="text-white text-sm font-medium cursor-pointer">My Account</a>
//                 <ul className="absolute right-0 mt-2 bg-white text-black rounded shadow-md hidden group-hover:block">
//                   <li>
//                     <Link to="/my-account" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
//                   </li>
//                   <li>
//                     <a href="#" className="block px-4 py-2 hover:bg-gray-100">Message</a>
//                   </li>
//                   <li>
//                     <a href="#" className="block px-4 py-2 hover:bg-gray-100">Notifications</a>
//                   </li>
//                   <li onClick={handleLogout}>
//                     <a className="block px-4 py-2 text-red-600 hover:bg-gray-100">Log Out</a>
//                   </li>
//                 </ul>
//               </div>
//             ) : (
//               <button onClick={() => nav("/login")} className="text-white text-sm font-medium">Sign in</button>
//             )}
//           </div>
//         </div>
//         <Hamburger />
//       </div>
//     </div>
//   );
// }

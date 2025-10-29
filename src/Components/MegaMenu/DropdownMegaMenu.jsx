// "use client";
// import "./DropdownMegaMenu.css";
// // import BuyData from './../MobileMenudata/BuyData';

// const menuData = [
//   {
//     heading: "Popular Choices",
//     items: [
//       { name: "Ready to Move", href: "#" },
//       { name: "Owner Properties", href: "#" },
//       { name: "Budget Homes", href: "#" },
//       { name: "Premium Homes", href: "#" },
//       { name: "New Projects", href: "#", badge: "Urbanrealities" },
//     ],
//   },
//   {
//     heading: "Property Types",
//     items: [
//       { name: "Flats in Bangalore", href: "#" },
//       { name: "House for Sale", href: "#" },
//       { name: "Villa in Bangalore", href: "#" },
//       { name: "Plot in Bangalore", href: "#" },
//       { name: "Office Space", href: "#" },
//     ],
//   },
//   {
//     heading: "Budget",
//     items: [
//       { name: "Under ₹ 50 Lac", href: "#" },
//       { name: "₹ 50 Lac - ₹ 1 Cr", href: "#" },
//       { name: "₹ 1 Cr - ₹ 1.5 Cr", href: "#" },
//       { name: "Above ₹ 1.5 Cr", href: "#" },
//     ],
//   },
// ];

// const DropdownMegaMenu = () => {
//   return (
//     <div className="nav-item dropdown position-static">
//       <div className="container">
//         <div className="row">
//           {menuData.map((column, idx) => (
//             <div className="col" key={idx}>
//               <h6 className="dropdown-header ">{column.heading}</h6>
//               {column.items.map((item, i) => (
//                 <a className="dropdown-item" href={item.href} key={i}>
//                   {item.name}
//                   {item.badge && (
//                     <span className="badge border ms-2">{item.badge}</span>
//                   )}
//                 </a>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DropdownMegaMenu;


"use client";
import "./DropdownMegaMenu.css";
import { buildSlug } from "@/utils/seoSlug";
import Link from "next/link";
import { useCity } from "@/utils/CityContext"

const menuData = [
  {
    heading: "Popular Choices",
    items: [
      { name: "Ready to Move" },
      { name: "Owner Properties" },
      { name: "Budget Homes" },
      { name: "Premium Homes" },
      { name: "New Projects", badge: "Urbanrealities" },
    ],
  },
  {
    heading: "Property Types",
    items: [
      { name: "Flats " },
      { name: "House for Sale" },
      { name: "Villa " },
      { name: "Plot " },
      { name: "Office Space" },
    ],
  },
  {
    heading: "Budget",
    items: [
      { name: "Under ₹ 50 Lac" },
      { name: "₹ 50 Lac - ₹ 1 Cr" },
      { name: "₹ 1 Cr - ₹ 1.5 Cr" },
      { name: "Above ₹ 1.5 Cr" },
    ],
  },
];

export default function DropdownMegaMenu() {
  // ✅ Default value SSR + CSR match kare
  const { city } = useCity();


  const makeSlug = (heading, label) => {
    const filters = {};
    if (heading === "Popular Choices") filters.popularChoice = label;
    if (heading === "Property Types") filters.propertyType = label;
    if (heading === "Budget") filters.budget = label;

    filters.city = city?city.name:'';
    return buildSlug(filters);
  };

  return (
    <div className="nav-item dropdown position-static">
      <div className="container">
        <div className="row">
          {menuData.map((column, idx) => (
            <div className="col" key={idx}>
              <h6 className="dropdown-header">{column.heading}</h6>
              {column.items.map((item, i) => {
                const slug = makeSlug(column.heading, item.name);
                return (
                  <Link
                    href={`/search/query?search=${slug}`}
                    key={i}
                    className="dropdown-item"
                  >
                    {item.name}
                    {item.badge && (
                      <span className="badge border ms-2">{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

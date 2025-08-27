
import React from 'react';
import PropertyAllDetails from './components/PropertyAllDetails'
import { get } from '@/lib/api';

async function fetchProperty(id) {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/get-data-properties-no-auth/${id}`);
    const data = response?.data;
    console.log("=>", data)

    if (data) return data;
    return [];
  } catch (err) {
    console.log(err.response)
    console.error("Error fetching related properties:", err);
    return [];
  }
}
async function fetchLeadType() {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/lead-types`);
    const data = response?.data;
    console.log("=>", data)

    if (data.success) return data.data;
    return [];
  } catch (err) {
    console.log(err.response)
    console.error("Error fetching Lead Type:", err);
    return [];
  }
}

const PropertyDetailspage =async ({params}) => {
  const id = params.id;
  const property =await fetchProperty(id)
  const leadTypes =await fetchLeadType()
 
  return (
    <div>
      <PropertyAllDetails property={property} leadTypes={leadTypes}/>
    </div>
  );
}

export default PropertyDetailspage;


// import React from "react";
// import "./components/PropertyAllDetails.css";
// import PropertydetailsBreadcrum from "./components/PropertydetailsBreadcrum";
// import PropertygalleryBreadcrum from "./components/PropertygalleryBreadcrum";
// import PropertyHighlights from "./components/PropertyHighlights";
// import Projectactive from "./components/Projectactive";
// import Projectagent from "./components/Propertyagent";
// import ProjectDescription from "./components/PropertyDescription";
// import PropertyEnquiryFrom from "./components/PropertyEnquiryFrom";
// import Propertyareadata from "./components/Propertyareadata";
// import Propertyprice from "./components/Propertyprice";





// const PropertyDetails = () => {

  
//   return (
//     <div>
//       <PropertydetailsBreadcrum />
//       <PropertygalleryBreadcrum />


// <div className="project-highlight-background">
//       <div className="container">
//         <div className="row background-row">
//           <div className="col-8 large-col">
//             <PropertyHighlights/>
//             <ProjectDescription/>
//             <Propertyareadata/>
//             <Propertyprice/>
//           </div>
//           <div className="col-4 small-col">
//             <Projectactive/>
//             <Projectagent/>
//             <PropertyEnquiryFrom/>
//           </div>

//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default PropertyDetails;

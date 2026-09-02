
import React from 'react';
import PropertyAllDetails from './components/PropertyAllDetails'
import { get, getssr } from '@/lib/api';

async function fetchProperty(id) {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await getssr(`/api/guest/posts/property-listing/${id}`);
    const data = response?.data;
    console.log("=>", data)

    if (data?.post) {
      const post = data.post;
      return {
        ...post,
        name: post.title,
        description: post.content,
        property_id_name: post.listing_code,
        project_unique_id: post.listing_code,
        property_unique_id: post.listing_code,
        date: post.published_at,
        posted_on: new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        ...(post.location || {}),
        original_data: data
      };
    }

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
    const response = await getssr(`/api/lead-types`);
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
async function fetchUser(id) {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await getssr(`/api/get-userdata-by-id?id=${id}`);
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

const PropertyDetailspage = async ({ params, searchParams }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  // Prefer query string (?id=27) but fallback to path parameter (/propertydetails/27)
  const id = resolvedSearchParams?.id || resolvedParams?.id; 
  console.log("Property ID:", id);
  const property = await fetchProperty(id);
  let userDetail = null;
  if (property?.user_id) {
    userDetail = await fetchUser(property.user_id);
  }
  const leadTypes = await fetchLeadType();
  console.log("userDetail:", userDetail);
 
  let customWidth = '100%';
  if (property?.layout_json) {
    try {
      const parsedLayout = typeof property.layout_json === 'string' ? JSON.parse(property.layout_json) : property.layout_json;
      if (parsedLayout?.settings?.contentWidthType === 'custom' && parsedLayout?.settings?.customWidth) {
        customWidth = parsedLayout.settings.customWidth;
      }
    } catch (e) {
      console.error("Error parsing layout_json:", e);
    }
  }

  return (
    <div style={{ maxWidth: customWidth, margin: '0 auto', width: '100%' }}>
      <PropertyAllDetails property={property} leadTypes={leadTypes} userDetail={userDetail}/>
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

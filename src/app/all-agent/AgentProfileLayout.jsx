'use client'
import React, { useEffect, useState } from 'react';
import styles from './components/AgentProfileLayout.module.css'
import AgentForm from './components/agent-profile/AboutForm';
import AboutAgent from './components/about-agent/AboutAgent';
import AgentReviews from './components/agent-reviews/AgentReviews';
import AgentPropertyList from "./components/agent-propertylist/AgentPropertyList"
import ContactInfo from './components/contact-info/ContactInfo';
import SubHero from '@/Components/SubHero/SubHero';
import Breadcrumbs from '@/Components/All-Breadcrumbs/Breadcrumbs';





import AgentProfileDetails from './components/agent-profile/AgentProfile';
import { PropertyCard } from '@/Components/PropertyListing/PropertyListing';
import { useParams, useRouter } from 'next/navigation';

const data = [{
  heading: " Quick Enquiry",
  usernameLabel: "Username",
  usernamePlaceholder: "Enter Username",
  emailLabel: "Email",
  emailPlaceholder: "Enter email",
  phoneLabel: "Phone Number",
  phonePlaceholder: "Enter Phone Number",
  nextButton: "Request Call-back",
}, {
  usernameLabel: "Username",
  usernamePlaceholder: "Enter Username",
  emailLabel: "Email",
  emailPlaceholder: "Enter email",
  phoneLabel: "Phone Number",
  phonePlaceholder: "Enter Phone Number",
  nextButton: "Request Call-back",
}];
//  const breadcrumbPaths = [
//     { label: 'Home', href: '/' },
//     { label: 'Properties', href: '/properties' },
//     { label: 'Delhi', href: '/properties/delhi' },
//     { label: 'Green Park Villa', href: '/properties/delhi/green-park-villa' },
//   ];
const AgentProfileLayout = ({ agentProfile, relatedProperties, userProperties }) => {
  const { id } = useParams()
  const router = useRouter()
  // const [relatedProperties, setRelatedProperties] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  const handleViewProjectlist = (id) => {
    router.push(`/propertydetails/id=${id}`);
  };

  console.log("agent=>", relatedProperties)

  // useEffect(() => {
  //   const fetchRelatedProperties = async () => {
  //     try {
  //       const res = await fetch(`/api/agent/agent-related-properties/${id}`);
  //       const data = await res.json();
  //       if (!data.status) {
  //         setIsEmpty(data.status)
  //       }
  //       setRelatedProperties(data.user);
  //     } catch (err) {
  //       console.error("Error fetching agent:", err);
  //     }
  //   };
  //   fetchRelatedProperties();
  // }, [id]);

  console.log("==>", agentProfile)
  // const demoProperties = [
  //   {
  //     id: 1,
  //     property_type_id_name: "Apartment",
  //     property_status_id_name: "Ready To Move",
  //     state: { name: "Mumbai, Maharashtra" },
  //     custom_field_values: [
  //       { field_label: "Bedrooms", field_value: "3" },
  //       { field_label: "Area Sq Ft", field_value: "1450" },
  //       { field_label: "Furnishing Status", field_value: "Semi-Furnished" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     property_type_id_name: "Villa",
  //     property_status_id_name: "Under Construction",
  //     state: { name: "Bangalore, Karnataka" },
  //     custom_field_values: [
  //       { field_label: "Bedrooms", field_value: "4" },
  //       { field_label: "Area Sq Ft", field_value: "2500" },
  //       { field_label: "Furnishing Status", field_value: "Unfurnished" },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     property_type_id_name: "Penthouse",
  //     property_status_id_name: "Ready To Move",
  //     state: { name: "Delhi" },
  //     custom_field_values: [
  //       { field_label: "Bedrooms", field_value: "5" },
  //       { field_label: "Area Sq Ft", field_value: "3200" },
  //       { field_label: "Furnishing Status", field_value: "Fully Furnished" },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     property_type_id_name: "Studio",
  //     property_status_id_name: "Ready To Move",
  //     state: { name: "Goa" },
  //     custom_field_values: [
  //       { field_label: "Bedrooms", field_value: "1" },
  //       { field_label: "Area Sq Ft", field_value: "600" },
  //       { field_label: "Furnishing Status", field_value: "Furnished" },
  //     ],
  //   },
  // ];

  console.log("==>>>", relatedProperties)

  return (
    <>
      <div className={` ${styles.Breadcrumbs}  `}>
        <div className={` ${styles.container} container `}>
          {/* <Breadcrumbs paths={breadcrumbPaths}/> */}
          <Breadcrumbs color="black" fontSize="1.1rem" fontFamily="poppins-medium" />
        </div>
      </div>
      <div className={` ${styles.profileContainer} container `}>
        <div className={` ${styles.profilerow} row `}>
          <div className={` ${styles.agentprofilecol} col-12 col-xl-8 p-0 `}><AgentProfileDetails agentProfile={agentProfile} /> </div>
          <div className={` ${styles.AgentFormcol} col-12  col-xl-4 p-0`}> <AgentForm data={data[0]} /> </div>
        </div>
      </div>
      {agentProfile?.about &&
        <div className={styles.AboutAgentsection}>
          <div className={` ${styles.aboutAgentWrapper} container `}>
            <div className={` ${styles.col} col-12 `}> <AboutAgent agentProfile={agentProfile} /> </div>
          </div>
        </div>}

      <div className={` ${styles.Container} container `}>
        <div className={` ${styles.AboutPropertyList} row `}>
          <div className={` ${styles.Aboutcol} col-12 col-lg-8 `}>
            {/* {userProperties && userProperties.length > 0 && */}
            <AgentPropertyList userProperties={userProperties} />
            {/* } */}
          </div>
          <div className={` ${styles.Aboutcol} col-12  col-lg-4 `}>
            <AgentReviews />
          </div>
        </div>
      </div>

      <div className={styles.contactheader}>
        <div className={` ${styles.headercontainer} container `}>
          <h3>Contact Us</h3>
          <p>Toll Free Number: 274-5607-0011</p>
        </div>
      </div>
      <div className={` ${styles.enquirycontainer} container `}>
        <div className={` ${styles.enquiryrow} row `}>
          <div className={` ${styles.enquirycol} col-12 col-lg-6  `}><ContactInfo /> </div>
          <div className={` ${styles.col} col-12  col-lg-6 `}>
            <h3 className={` ${styles.enquiryheading} text-center `} >Fill the enquiry form</h3>
            <SubHero subHeroHeading={""}></SubHero>
            <AgentForm data={data[1]} />
          </div>
        </div>
      </div>
      {isEmpty ? (
        <div className="container">
          <div className="property-container">
            <SubHero
              subHeroHeading={"RELATED PROPERTIES"}
              subHeroText={"PROPERTIES FOR RENT"}
            />

            <div className="property-listing-scroll">
              <div className="property-listing">
                {/* {isEmpty ? ( */}
                {
                  relatedProperties && relatedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      handleViewProjectlist={() => handleViewProjectlist(property.id)}
                    />
                  ))
                }
                {/* )  */}
                {/* : ( */}
                {/* <p>No properties available.</p> */}
                {/* )} */}
              </div>
            </div>
          </div>
        </div>) : ''}



    </>
  );
}

export default AgentProfileLayout;

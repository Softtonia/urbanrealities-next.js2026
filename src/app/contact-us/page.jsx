import React from "react";
import ContactAgent from "./components/contact-agent/ContactAgent";
import ContactFormWithInfo from "./components/ContactFormWithInfo/ContactFormWithInfo";
import Breadcrumbs from "@/Components/All-Breadcrumbs/Breadcrumbs";
import styles from "./components/contact-agent/ContactAgent.module.css";
import { get } from '@/lib/api';

async function getContactUsData() {
  try {
    const response = await get(`/api/site-setting`);
    console.log(response.data);
    return response.data; // Axios response format
    
  } catch (error) {
    console.error("API ERROR:", error.message, error.response?.data);
    return null; // Handle gracefully
  }
}

export default async function ContactUsPage() {
  const contactData = await getContactUsData();

  if (!contactData) {
    return (
      <div className="text-red-500 text-center mt-10">
        Data could not be loaded. Please try again later.
      </div>
    );
  }
  return (
    <>
      <div className={styles.Breadcrumbs}>
        <div className="container">
          <Breadcrumbs />
        </div>
      </div>
      <div className="container">
        <ContactAgent />
        <ContactFormWithInfo  />
      </div>
    </>
  );
};


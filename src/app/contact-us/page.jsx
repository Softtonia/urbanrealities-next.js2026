import React from "react";
import ContactAgent from "./components/contact-agent/ContactAgent";
import ContactFormWithInfo from "./components/ContactFormWithInfo/ContactFormWithInfo";
import Breadcrumbs from "@/Components/All-Breadcrumbs/Breadcrumbs";
import styles  from './components/contact-agent/ContactAgent.module.css';

const page = () => {
  return (
    <>
    <div className={styles.Breadcrumbs}>
    <div className="container">
      <Breadcrumbs /></div></div>
      <div className="container">
        <ContactAgent />
        <ContactFormWithInfo />
      </div>
    </>
  );
};

export default page;

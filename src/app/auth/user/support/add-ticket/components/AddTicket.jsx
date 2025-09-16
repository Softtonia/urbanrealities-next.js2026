"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./AddTicket.module.css";
import { useDashboard } from "../../../DashboardContext/DashboardContext";
import CustomDropdown from "@/Components/CustomDropdown/CustomDropdown";
import CustomDropdownWithSearch from "@/Components/CustomDropdownWithSearch/CustomDropdownWithSearch";
import CustomDropdownWithMultipleSelect from '@/Components/CustomDropdownWithMultipleSelect/CustomDropdownWithMultipleSelect';

const AddTicket = () => {
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [department, setDepartment] = useState("");
  const { setShowSidebar, setPageHeading } = useDashboard();
  const fileInputRef = useRef(null);
  const [attachmentName, setAttachmentName] = useState("No file chosen");
const [searchtype, setSearchType] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    // setShowSidebar(false);
    setPageHeading("");

    return () => {
      // setShowSidebar(true);
      setPageHeading("Welcome Back! Urbanrealities");
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachmentName(file.name);
    }
  };

  return (
    <div className={styles.profileWraper}>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Subject</label>
          <input type="text" placeholder="Enter subject" />
        </div>

        <div className={styles.inputGroup}>
          <label>Message</label>
          <textarea placeholder="Write your message" rows={5}></textarea>
        </div>

        <div className={styles.inputGroup}>
          <label>Attachment</label>
          <div className={styles.fileInputContainer}>
            <input
              type="file"
              accept="*/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className={styles.attachButton}
            >
              Choose File
            </button>
            <span>{attachmentName}</span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Priority</label>
            <CustomDropdown
              label="Priority"
              options={["Low", "Medium", "High"]}
              value={priority}
              onChange={setPriority}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Status</label>
            <CustomDropdown
              label="Status"
              options={["Open", "In Progress", "Closed"]}
              value={status}
              onChange={setStatus}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Type</label>
            <CustomDropdown
              label="Type"
              options={["Bug", "Feature", "Support"]}
              value={type}
              onChange={setType}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Department</label>
            <CustomDropdown
              label="Department"
              options={["Sales", "Technical", "HR"]}
              value={department}
              onChange={setDepartment}
            />
          </div>
        </div>

        <button className={styles.updateButton}>Submit Ticket</button>

        <div className={styles.row}>

          <div className={styles.inputGroup}>
            <label>Department</label>

      <CustomDropdownWithSearch
        label="Type"
        options={["Bug", "Feature", "Support", "Other"]}
        value={searchtype}
        onChange={setSearchType}
      />
      </div>

              <div className={styles.inputGroup}>
            <label>Department</label>

         <CustomDropdownWithMultipleSelect
        label="Type"
        options={["Bug", "Feature", "Support", "Other", "Task", "Improvement"]}
        value={selectedTypes}
        onChange={setSelectedTypes}
      />
      </div>
      </div>

      </form>
      
    </div>
  );
};

export default AddTicket;

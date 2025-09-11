"use client";
import { useState } from "react";
import styles from "./LeadTable.module.css";
import { IoIosSearch } from "react-icons/io";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const leadsData = [
  {
    id: 1,
    propertyId: "952874",
    subject: "Residential",
    leadType: "High",
    status: "Solved",
  },
  {
    id: 2,
    propertyId: "123452",
    subject: "Commercial",
    leadType: "Low",
    status: "Solved",
  },
  {
    id: 3,
    propertyId: "285937",
    subject: "Plots",
    leadType: "High",
    status: "Solved",
  },
  {
    id: 4,
    propertyId: "655687",
    subject: "Pg",
    leadType: "High",
    status: "Unresolved",
  },
  {
    id: 5,
    propertyId: "687989",
    subject: "Industrial",
    leadType: "High",
    status: "Pending",
  },
  {
    id: 6,
    propertyId: "8769878",
    subject: "Kayla Alexia",
    leadType: "Medium",
    status: "Solved",
  },
  {
    id: 7,
    propertyId: "6757687",
    subject: "Alison Melody",
    leadType: "High",
    status: "Solved",
  },
  {
    id: 8,
    propertyId: "123456",
    subject: "Alice Rose",
    leadType: "Low",
    status: "Solved",
  },
  {
    id: 9,
    propertyId: "987456",
    subject: "Angelique",
    leadType: "Low",
    status: "Unresolved",
  },
];

export default function LeadsTable({data}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTicket, setSearchTicket] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log(data)

  const filteredLeads = data.filter(
    (item) =>
      item.name.includes(searchTerm) ||
      item.email.includes(searchTerm)
  );

  return (
    <div className={styles.wrapper}>
      <div className={` ${styles["search-div"]} `}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}>
            <IoIosSearch />
          </button>
        </div>
        <div className={styles.searchContainer}>
          {/* <input
    type="text"                        
    inputMode="numeric"               
    pattern="[0-9]*"                  
    maxLength={10}                     
    placeholder="Add Ticket"
    className={styles.searchInput}
    value={searchTicket}        
      onChange={(e) =>{
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSearchTicket(value);
    }
  }}
        /> */}
          <button className={` ${styles.TicketButton} btn-AddTicket`}>

            Add Lead
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tableRow}>
            {/* <th className={`${styles.th} ${styles.checkboxCol}`}>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectAll(checked);
                  setSelectedRows(
                    checked ? filteredLeads.map((item) => item.id) : []
                  );
                }}
              />
            </th> */}
            <th className={`${styles.th} ${styles.serialCol}`}>S. No</th>
            <th className={`${styles.th} ${styles.propertyIdCol}`}>
              Email
            </th>
            {/* <th className={`${styles.th} ${styles.subjectCol}`}>Subjects</th> */}
            <th className={`${styles.th} ${styles.leadTypeCol}`}>Message</th>
            {/* <th className={`${styles.th} ${styles.statusCol}`}>Status</th> */}
            <th className={`${styles.th} ${styles.actionCol}`}>Action</th>{" "}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {filteredLeads.map((item, index) => (
            <tr key={item.id} className={styles.tr}>
              {/* <td className={`${styles.td} ${styles.checkboxCol}`}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setSelectedRows((prev) => [...prev, item.id]);
                    } else {
                      setSelectedRows((prev) =>
                        prev.filter((id) => id !== item.id)
                      );
                    }
                  }}
                />
              </td> */}
              <td className={`${styles.td} ${styles.serialCol}`}>
                {index + 1}
              </td>
              <td className={`${styles.td} ${styles.propertyIdCol}`}>
                {item.email}
              </td>
              {/* <td className={`${styles.td} ${styles.subjectCol}`}>{item.subject}</td> */}
              <td className={`${styles.td} ${styles.leadTypeCol}`}>
                <span
                  className={`${styles.badge} ${item.leadType === 'High' ? styles.high : item.leadType === 'Medium' ? styles.medium : styles.low}`}
                >
                  {item.message}
                </span>
              </td>
              {/* <td className={`${styles.td} ${styles.statusCol}`}>
                <span
                  className={`${styles.status} ${styles[item.status]
                    }`}
                >
                  {item.status}
                </span>
              </td> */}
              <td
                className={`${styles.td} ${styles.actionCol} ${styles.actions}`}
              >
                <button className={`${styles.btn} ${styles.view}`}>
                  <FaEye />
                </button>
                <button className={`${styles.btn} ${styles.edit}`}>
                  <FaEdit />
                </button>
                <button className={`${styles.btn} ${styles.delete}`}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

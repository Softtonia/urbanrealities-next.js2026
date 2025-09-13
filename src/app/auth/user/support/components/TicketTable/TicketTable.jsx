"use client";
import { useState } from "react";
import styles from "./TicketTable.module.css";
import { LuSlidersHorizontal } from "react-icons/lu";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const TicketTable = () => {
  const [searchTicket, setSearchTicket] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const tickets = [
    {
      id: 1,
      ticket_number: "952874",
      subject: "Configuration",
      control: "Residential",
      leadType: "Completed",
    },
    {
      id: 2,
      ticket_number: "123452",
      subject: "Commercial",
      control: "Commercial",
      leadType: "Completed",
    },
    {
      id: 3,
      ticket_number: "285937",
      subject: "Plots",
      control: "Plots",
      leadType: "Completed",
    },
    {
      id: 4,
      ticket_number: "655687",
      subject: "Pg",
      control: "Pg",
      leadType: "Cancelled",
    },
    {
      id: 5,
      ticket_number: "687989",
      subject: "Industrial",
      control: "Industrial",
      leadType: "In progress",
    },
    {
      id: 6,
      ticket_number: "8769878",
      subject: "Kayla Alexia",
      control: "Kayla Alexia",
      leadType: "Completed",
    },
    {
      id: 7,
      ticket_number: "8769879",
      subject: "Kayla Alexia",
      control: "Kayla Alexia",
      leadType: "Completed",
    },
    {
      id: 8,
      ticket_number: "8769880",
      subject: "Kayla Alexia",
      control: "Kayla Alexia",
      leadType: "Completed",
    },
    {
      id: 9,
      ticket_number: "8769881",
      subject: "Kayla Alexia",
      control: "Kayla Alexia",
      leadType: "In progress",
    },
    {
      id: 10,
      ticket_number: "8769882",
      subject: "Kayla Alexia",
      control: "Kayla Alexia",
      leadType: "Cancelled",
    },
  ];

  return (
    <div className={styles.wrapper}>
       <div className={styles["search-div"]}>
    <div className={styles.searchContainer}>
      <button className={styles.filterButton}> Filter
        <LuSlidersHorizontal className={styles.icon} />
      </button>
      <input
        type="text"
        placeholder="Search"
        className={styles.searchInput}
        value={searchTicket}
        onChange={(e) => setSearchTicket(e.target.value)}
      />
    </div>
  </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tableRow}>
            <th className={`${styles.th} ${styles.checkboxCol}`}>
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
            </th>
            <th className={`${styles.th} ${styles.serialCol}`}>S. No</th>
            <th className={`${styles.th} ${styles.propertyIdCol}`}>
              Incident ID
            </th>
            <th className={`${styles.th} ${styles.subjectCol}`}>
              Incident Title
            </th>
            <th className={`${styles.th} ${styles.leadTypeCol}`}>
              Control Details
            </th>
            <th className={`${styles.th} ${styles.statusCol}`}>Status</th>
            <th className={`${styles.th} ${styles.actionCol}`}>Action</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {tickets.map((item, index) => (
            <tr key={item.id} className={styles.tr}>
              <td className={`${styles.td} ${styles.checkboxCol}`}>
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
              </td>
              <td className={`${styles.td} ${styles.serialCol}`}>
                {index + 1}
              </td>
              <td className={`${styles.td} ${styles.propertyIdCol}`}>
                {item.ticket_number}
              </td>
              <td className={`${styles.td} ${styles.subjectCol}`}>
                {item.subject}
              </td>
             <td className={`${styles.td} ${styles.statusCol}`}>
                <span className={`${styles.status} ${styles[item.status]}`}>
                  {item.control}
                </span>
              </td>

              <td className={`${styles.td} ${styles.leadTypeCol}`}>
                <span
                  className={`${styles.badge} ${
                    item.leadType  === "Completed"
                      ? styles.high
                      : item.leadType  === "Cancelled"
                      ? styles.medium
                      : styles.low
                  }`}
                >
                  {item.leadType }
                </span>
              </td>
 
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
};

export default TicketTable;

"use client";
import { useState, useEffect } from "react";
import styles from "./TicketTable.module.css";
import { LuSlidersHorizontal } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

const TicketTable = () => {
  const [searchTicket, setSearchTicket] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 5;

  const tickets = [
    { id: 1, ticket_number: "952874", subject: "Configuration", control: "Residential", leadType: "Completed" },
    { id: 2, ticket_number: "123452", subject: "Commercial", control: "Commercial", leadType: "Completed" },
    { id: 3, ticket_number: "285937", subject: "Plots", control: "Plots", leadType: "Completed" },
    { id: 4, ticket_number: "655687", subject: "Pg", control: "Pg", leadType: "Cancelled" },
    { id: 5, ticket_number: "687989", subject: "Industrial", control: "Industrial", leadType: "In progress" },
    { id: 6, ticket_number: "8769878", subject: "Kayla Alexia", control: "Kayla Alexia", leadType: "Completed" },
    { id: 7, ticket_number: "8769879", subject: "Kayla Alexia", control: "Kayla Alexia", leadType: "Completed" },
    { id: 8, ticket_number: "8769880", subject: "Kayla Alexia", control: "Kayla Alexia", leadType: "Completed" },
    { id: 9, ticket_number: "8769881", subject: "Kayla Alexia", control: "Kayla Alexia", leadType: "In progress" },
    { id: 10, ticket_number: "8769882", subject: "Kayla Alexia", control: "Kayla Alexia", leadType: "Cancelled" },
  ];

  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setLoading(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const indexOfFirstTicket = (currentPage - 1) * itemsPerPage;
  const indexOfLastTicket = currentPage * itemsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <div className={styles.wrapper}>
      <div className={styles["search-div"]}>
        <div className={styles.searchContainer}>
        <div className={styles.searchsection}>
          <button className={styles.filterButton}>
            Filter <LuSlidersHorizontal className={styles.icon} />
          </button>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            value={searchTicket}
            onChange={(e) => setSearchTicket(e.target.value)}
          />
        </div>
        <div className={styles.searchsection}>
          <Link href="/auth/user/support/add-ticket" className={`${styles.TicketButton} btn-AddTicket`}>
            Add Ticket
          </Link>
        </div>
      </div>
</div>
      {loading ? (
        <div className={styles.loaderWrapper}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <>
        <div className={styles.tableContainer}>
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
                      setSelectedRows(checked ? currentTickets.map((item) => item.id) : []);
                    }}
                  />
                </th>
                <th className={`${styles.th} ${styles.serialCol}`}>S. No</th>
                <th className={`${styles.th} ${styles.propertyIdCol}`}>Incident ID</th>
                <th className={`${styles.th} ${styles.subjectCol}`}>Incident Title</th>
                <th className={`${styles.th} ${styles.leadTypeCol}`}>Control Details</th>
                <th className={`${styles.th} ${styles.statusCol}`}>Status</th>
                <th className={`${styles.th} ${styles.actionCol}`}>Action</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {currentTickets.map((item, index) => (
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
                          setSelectedRows((prev) => prev.filter((id) => id !== item.id));
                        }
                      }}
                    />
                  </td>
                  <td className={`${styles.td} ${styles.serialCol}`}>
                    {indexOfFirstTicket + index + 1}
                  </td>
                  <td className={`${styles.td} ${styles.propertyIdCol}`}>{item.ticket_number}</td>
                  <td className={`${styles.td} ${styles.subjectCol}`}>{item.subject}</td>
                  <td className={`${styles.td} ${styles.leadTypeCol}`}>
                    <span
                      className={`${styles.badge} ${
                        item.leadType === "Completed"
                          ? styles.high
                          : item.leadType === "Cancelled"
                          ? styles.medium
                          : styles.low
                      }`}
                    >
                      {item.leadType}
                    </span>
                  </td>
                  <td className={`${styles.td} ${styles.statusCol}`}>
                    <span className={`${styles.status} ${styles[item.status]}`}>{item.control}</span>
                  </td>
                  <td className={`${styles.td} ${styles.actionCol} ${styles.actions}`}>
                    <button className={`${styles.btn} ${styles.view}`}>
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
   
          <nav className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              &lt;
            </button>

            {Array.from({ length: 5 }, (_, index) => {
              const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + index;
              if (pageNumber > totalPages) return null;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`${styles.pageButton} ${currentPage === pageNumber ? styles.activePage : ""}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              &gt;
            </button>
          </nav>
          </>
      )}
    </div>
  );
};

export default TicketTable;

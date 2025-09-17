import React from 'react';
import TicketSummary from '../TicketSummary/TicketSummary';
import TicketTable from '../TicketTable/TicketTable';
import styles from "./AllTicket.module.css";


const AllTicket = () => {
  return (
 <div className={styles.pageContainer}>
      <h2>Ticketing System</h2>
      <TicketSummary />
      <TicketTable/>
    </div>
  );
}

export default AllTicket;

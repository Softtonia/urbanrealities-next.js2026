import React from 'react';
import TicketSummary from './components/TicketSummary/TicketSummary';
import TicketTable from './components/TicketTable/TicketTable';

const supportpage = () => {
  return (
 <div className="">
      <h2>Ticketing System</h2>
      <TicketSummary />
      <TicketTable/>
    </div>
  );
}

export default supportpage;

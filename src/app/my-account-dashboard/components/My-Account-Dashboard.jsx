import React from 'react';
import styles from './My-Account-Dashboard.module.css'
import SidebarDashboard from './Sidebar-Dashboard';
import MyAccountlisting from './My-Account-listing';
const MyAccountDashboard = () => {
     const dummyProperties = Array.from({ length: 6 }, (_, i) => ({
    id: i,
     verified: i % 2 === 0,
     imageUrl: "/image-card.png",
      price: "₹ 3 Crore",
      rating: 4.5,
      bhk: "3BHK",
      type: "Builder Floor",
      size: "1700sqft.",
      location: "Ernakulam, Kerala",
      projectName: "Ganesh Property",
      availableFor: "Family",
      carpetArea: "1720 sqft",
      city: "Ernakulam",
      status: "Ongoing",
 }));
  return (
    <div >
      <div className={styles.dashboard}>
        <div className={`${styles['main-container']} container`}>
         <h1 className={styles.heading}>Welcome Back ! Urbanrealities</h1>
         <div className="row d-flex">
            <div className="col-2 p-0">
        <SidebarDashboard /></div>
         <main className={`${styles.main} col-10`}>
          <section className={styles.grid}>
            {dummyProperties.map((prop) => (
              < MyAccountlisting key={prop.id} data={prop} />
            ))}
          </section>
          <nav className={styles.pagination}>
            {[1, 2, 3, 4, 5].map(p => (
              <button key={p}>{p}</button>
            ))}
          </nav>
        </main> 
        </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccountDashboard ;

import React, { useEffect, useState } from "react";
import styles from "./My-Account-Dashboard.module.css";
import SidebarDashboard from "./Sidebar-Dashboard";
import MyAccountInsight from "./My-Account-Insight";

const MyAccountDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  // Dummy Properties
  const dummyProperties = Array.from({ length: 96 }, (_, i) => ({
    id: `47852569-${i}`,
    companyName: "Ganesh Property pvt ltd.",
    location: "Ernakulam, Kerala",
    price: "₹ 3 Crore",
    image: "/insight-card.png",
    stats: {
      impression: 741,
      views: 741,
      email: 741,
      percentage: 78,
    },
    createdAt: "2024-01-24T00:24:00",
    expiresAt: "2025-06-14T12:24:00",
  }));

  const totalPages = Math.ceil(dummyProperties.length / itemsPerPage);

 useEffect(() => {
  setLoading(true);
  const timer = setTimeout(() => {
    setLoading(false);
  }, 800);
  return () => clearTimeout(timer);
}, []);

const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) {
    setLoading(true);
    setCurrentPage(page);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }
};



  const paginatedData = dummyProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.dashboard}>
      <div className={`${styles.mainContainer} container  `}>
        <h1 className={styles.heading}>Welcome Back ! Urbanrealities</h1>
        <div className={`${styles.pagerow} row `}>
          <div className={`${styles.Sidebarcol} col-2 `}>
            <SidebarDashboard />
          </div>
          <main className={`${styles.main} col-md-10 col-12 `}>
            {loading ? (
              <div className={styles.loaderWrapper}>
                <div className={styles.spinner}></div>
              </div>
            ) : (
              <>
                <div className={styles.insightcard}>
                  <section className={styles.grid}>
                    {paginatedData.map((prop) => (
                      <MyAccountInsight key={prop.id} data={prop} />
                    ))}
                  </section>
                </div>

                <nav className={styles.pagination}>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>

                  {Array.from({ length: 5 }, (_, index) => {
                    const pageNumber =
                      Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                      index;

                    if (pageNumber > totalPages) return null;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={
                          currentPage === pageNumber ? styles.activePage : ""
                        }
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </button>
                </nav>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyAccountDashboard;

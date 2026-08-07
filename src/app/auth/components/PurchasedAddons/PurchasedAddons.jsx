"use client";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { FaPlusCircle } from "react-icons/fa";
import { fetchAddonOrders } from "@/services/membership.service";
import styles from "./PurchasedAddons.module.css";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const PurchasedAddons = () => {
  const { token } = useSiteSettings();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    if (token) {
      loadOrders(page);
    }
  }, [token, page]);

  const loadOrders = async (pageNum) => {
    setLoading(true);
    try {
      const result = await fetchAddonOrders(token, pageNum);
      if (result?.status && result?.data) {
        setOrders(result.data);
        setMeta(result.meta);
      }
    } catch (error) {
      console.error("Failed to load purchased addons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (meta && page < meta.last_page) setPage(page + 1);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!loading && orders.length === 0) {
    return null; // dynamic visibility: hide if no data
  }

  return (
    <div className={styles.addonsContainer}>
      <div className={styles.addonsHeader}>
        <h3>
          <FaPlusCircle style={{ color: "var(--Orange-500)" }} /> Purchased Add-ons
        </h3>
        <p>Your active and past add-on purchases.</p>
      </div>

      {loading ? (
        <div className={styles.loadingWrapper}>
          <CircularProgress size={32} style={{ color: "var(--Orange-500)" }} />
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.addonsTable}>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Add-on Name</th>
                  <th>Credits</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.order_number}</td>
                    <td>{order.addon?.name || "Unknown"}</td>
                    <td>
                      {order.addon?.addon_type === "credit"
                        ? `${order.addon.credit_quantity} ${order.addon.credit_type}`
                        : "N/A"}
                    </td>
                    <td>
                      {order.currency === "INR" ? "₹" : order.currency}
                      {order.total_amount}
                    </td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          order.payment_status === "success" || order.payment_status === "paid"
                            ? styles.statusSuccess
                            : order.payment_status === "pending"
                            ? styles.statusPending
                            : styles.statusFailed
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {meta && meta.last_page > 1 && (
            <div className={styles.pagination}>
              <div className={styles.pageInfo}>
                Showing page {meta.current_page} of {meta.last_page}
              </div>
              <div className={styles.pageControls}>
                <button
                  className={styles.pageBtn}
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <button
                  className={styles.pageBtn}
                  onClick={handleNextPage}
                  disabled={page === meta.last_page}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PurchasedAddons;

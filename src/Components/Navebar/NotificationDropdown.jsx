"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaCheck, FaCheckDouble } from "react-icons/fa";
import { get, post } from "@/lib/api";
import { useSiteSettings } from "../mycontext/siteSettingContext";
import { useRouter } from "next/navigation";
import "./navbar.css";

const formatDateTime = (dateStr) => {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/am|pm/i, (m) => m.toUpperCase());
};

const NotificationDropdown = ({ isMobile }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const dropdownRef = useRef(null);
  const { token } = useSiteSettings();
  const router = useRouter();

  console.log("notifications", notifications);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    if (!token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await get("/api/notifications/unread-count", null, config);
      if (res?.data?.unread_count !== undefined) {
        setUnreadCount(res.data.unread_count);
      }
    } catch (err) {
      console.error("Error fetching unread count", err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, [token]);

  // Fetch notifications
  const fetchNotifications = async (tab = activeTab) => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      let url = "/api/notifications";
      if (tab === "unread") url += "?is_read=false";
      else if (tab === "read") url += "?is_read=true";

      const res = await get(url, null, config);
      if (res?.data) {
        let fetchedData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : Array.isArray(res.data.items)
              ? res.data.items
              : [];

        setNotifications(fetchedData);
      }
    } catch (err) {
      console.error("Error fetching notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchNotifications(activeTab);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = async (e) => {
    e.stopPropagation();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await post("/api/notifications/read-all", null, null, config);
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all as read", err);
    }
  };

  const updateNotifList = (id) => {
    if (activeTab === "unread") {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } else {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif,
        ),
      );
    }
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const handleMarkAsRead = async (e, id) => {
    e.stopPropagation();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await post(`/api/notifications/${id}/read`, null, null, config);
      updateNotifList(id);
    } catch (err) {
      console.error(`Error marking notification ${id} as read`, err);
    }
  };

  const handleNotificationClick = async (notif) => {
    // Mark as read if unread
    if (!notif.is_read) {
      handleMarkAsRead({ stopPropagation: () => {} }, notif.id);
    }
    setIsOpen(false);

    // Redirect if screen is a URL
    if (notif.data?.screen && notif.data.screen.startsWith("http")) {
      window.location.href = notif.data.screen;
    } else if (notif.data?.screen === "home") {
      router.push("/");
    }
  };

  if (!token) return null;

  return (
    <div
      className={`notification-container ${isMobile ? "mobile" : "desktop"}`}
      ref={dropdownRef}
    >
      <div className="notification-icon-wrapper" onClick={toggleDropdown}>
        <FaBell className="notification-icon" />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="notification-dropdown shadow-lg">
          <div className="notification-header">
            <h6>Notifications</h6>
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={handleMarkAllRead}>
                <FaCheckDouble /> Mark all read
              </button>
            )}
          </div>

          <div
            className="notification-tabs"
            style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}
          >
            <button
              className={`notif-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("all");
                fetchNotifications("all");
              }}
              style={{
                flex: 1,
                padding: "8px 0",
                border: "none",
                background: "transparent",
                borderBottom:
                  activeTab === "all"
                    ? "2px solid #f97316"
                    : "2px solid transparent",
                color: activeTab === "all" ? "#f97316" : "#6b7280",
                fontWeight: activeTab === "all" ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              All
            </button>
            <button
              className={`notif-tab ${activeTab === "unread" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("unread");
                fetchNotifications("unread");
              }}
              style={{
                flex: 1,
                padding: "8px 0",
                border: "none",
                background: "transparent",
                borderBottom:
                  activeTab === "unread"
                    ? "2px solid #f97316"
                    : "2px solid transparent",
                color: activeTab === "unread" ? "#f97316" : "#6b7280",
                fontWeight: activeTab === "unread" ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Unread
            </button>
            <button
              className={`notif-tab ${activeTab === "read" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("read");
                fetchNotifications("read");
              }}
              style={{
                flex: 1,
                padding: "8px 0",
                border: "none",
                background: "transparent",
                borderBottom:
                  activeTab === "read"
                    ? "2px solid #f97316"
                    : "2px solid transparent",
                color: activeTab === "read" ? "#f97316" : "#6b7280",
                fontWeight: activeTab === "read" ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Read
            </button>
          </div>

          <div className="notification-list">
            {loading ? (
              <div className="notification-loading">Loading...</div>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notification-item ${notif.is_read ? "read" : "unread"}`}
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="notification-content">
                    <p
                      className="notification-title"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {!notif.is_read && (
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#ef4444",
                            borderRadius: "50%",
                            display: "inline-block",
                          }}
                        ></span>
                      )}
                      {notif.title || "Alert"}
                    </p>
                    <p className="notification-body">{notif.body}</p>
                    <span className="notification-time">
                      {formatDateTime(notif.created_at)}
                    </span>
                  </div>
                  <div className="notification-actions">
                    {!notif.is_read && (
                      <button
                        className="action-btn check-btn"
                        title="Mark as read"
                        onClick={(e) => handleMarkAsRead(e, notif.id)}
                      >
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="notification-empty">No notifications found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

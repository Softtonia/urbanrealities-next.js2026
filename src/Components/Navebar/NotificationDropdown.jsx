"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaCheck, FaTrash, FaCheckDouble } from "react-icons/fa";
import { get, post, del } from "@/lib/api";
import { useSiteSettings } from "../mycontext/siteSettingContext";
import { useRouter } from "next/navigation";
import "./navbar.css";

const NotificationDropdown = ({ isMobile }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const { token } = useSiteSettings();
  const router = useRouter();

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
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await get("/api/notifications?per_page=20", null, config);
      if (res?.data) {
        setNotifications(res.data);
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
      fetchNotifications();
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
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, is_read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all as read", err);
    }
  };

  const handleMarkAsRead = async (e, id) => {
    e.stopPropagation();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await get(`/api/notifications/${id}/read`, null, config);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await post(`/api/notifications/${id}/read`, null, null, config);
            setNotifications((prev) =>
              prev.map((notif) =>
                notif.id === id ? { ...notif, is_read: true } : notif
              )
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch(fallbackErr) {
            console.error(`Error marking notification ${id} as read`, fallbackErr);
        }
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await del(`/api/notifications/${id}`, null, config);
      const deletedNotif = notifications.find((n) => n.id === id);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      if (deletedNotif && !deletedNotif.is_read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error(`Error deleting notification ${id}`, err);
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
    <div className={`notification-container ${isMobile ? "mobile" : "desktop"}`} ref={dropdownRef}>
      <div className="notification-icon-wrapper" onClick={toggleDropdown}>
        <FaBell className="notification-icon" />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
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
                    <p className="notification-title">{notif.title || "Alert"}</p>
                    <p className="notification-body">{notif.body}</p>
                    <span className="notification-time">
                      {new Date(notif.created_at).toLocaleString()}
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
                    <button
                      className="action-btn delete-btn"
                      title="Delete"
                      onClick={(e) => handleDelete(e, notif.id)}
                    >
                      <FaTrash />
                    </button>
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

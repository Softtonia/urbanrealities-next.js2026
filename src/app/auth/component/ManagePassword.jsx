"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { toast } from "react-toastify";
import { updatePassword } from "@/services/auth.service";
import styles from "./ManagePassword.module.css";
import { FaLock } from "react-icons/fa";

export default function ManagePassword() {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useSiteSettings();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await updatePassword(token, {
        new_password: password,
        new_password_confirmation: confirmPassword,
      });
      if (res.success || res.status === true || !res.message) {
        toast.success("Password updated successfully!");
        setTimeout(() => {
          router.push(
            pathname?.includes("business")
              ? "/auth/business/dashboard"
              : "/auth/user/dashboard",
          );
        }, 1500);
      } else {
        toast.error(res.message || "Failed to update password.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderIcon}>
            <FaLock />
          </div>
          <div className={styles.formHeaderText}>
            <h3>Manage Password</h3>
            <p>Update your account password securely.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.fieldsGrid}>
            <div className={styles.inputGroup}>
              <label>
                New Password <span className={styles.required}>*</span>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>
                Confirm Password <span className={styles.required}>*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.btnSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { FaPlusCircle, FaCrown } from "react-icons/fa";
import { fetchMembershipAddons, fetchMyStatus } from "@/services/membership.service";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import styles from "./AddonsPage.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { encodeId } from "@/lib/utils";
import { useRouter } from "next/navigation";

const AddonsPage = () => {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasActiveMembership, setHasActiveMembership] = useState(true);
  const { token, isLogeIn, role } = useSiteSettings();
  const router = useRouter();

  const handleBuyNow = (addonId) => {
    const encodedId = encodeId(addonId.toString());
    if (role && role.toLowerCase() !== "owner" && role.toLowerCase() !== "buyer" && role.toLowerCase() !== "tenant") {
      router.push(`/auth/business/addons/checkout/${encodedId}`);
    } else {
      router.push(`/auth/user/addons/checkout/${encodedId}`);
    }
  };

  useEffect(() => {
    const getAddons = async () => {
      try {
        const [addonsResult, statusResult] = await Promise.all([
          fetchMembershipAddons(token),
          fetchMyStatus(token)
        ]);

        if (statusResult?.status && statusResult?.data) {
          setHasActiveMembership(statusResult.data.has_active_membership);
        }

        if (addonsResult?.status && addonsResult?.data) {
          setAddons(addonsResult.data);
        } else {
          setAddons([]);
        }
      } catch (error) {
        console.error("Failed to load addons:", error);
        toast.error("Failed to load addons");
      } finally {
        setLoading(false);
      }
    };
    
    if (isLogeIn && token) {
        getAddons();
    } else if (isLogeIn !== undefined && !isLogeIn) {
        setLoading(false);
    }
  }, [token, isLogeIn]);

  if (!loading && !hasActiveMembership) {
    return (
      <div className={styles.addonsContainer}>
        <div className={styles.noActivePlan}>
          <div className={styles.noActiveIcon}>
            <FaCrown />
          </div>
          <h3>No Active Membership</h3>
          <p>
            You currently do not have an active membership plan. Upgrade to unlock
            premium features and purchase add-ons.
          </p>
          <Link href="/membership-plan" className={styles.upgradeBtn}>
            View Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.addonsContainer}>
      <div className={styles.welcomeHeader}>
        <h1>Add-ons</h1>
        <p>Enhance your membership with these available add-ons.</p>
      </div>

      <div className={styles.grid}>
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className={styles.card}>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="80%" height={20} style={{ marginBottom: 16 }} />
              <Skeleton variant="rectangular" width="100%" height={40} style={{ marginBottom: 16 }} />
              <Skeleton variant="rectangular" width="100%" height={48} style={{ borderRadius: 8 }} />
            </div>
          ))
        ) : addons.length > 0 ? (
          addons.map((addon) => (
            <div key={addon.id} className={styles.card}>
              <h2 className={styles.title}>{addon.name}</h2>
              <p className={styles.desc}>{addon.description}</p>
              
              <div className={styles.details}>
                {addon.addon_type === "credit" && (
                   <span className={styles.badge}>{addon.credit_quantity} {addon.credit_type} credits</span>
                )}
                {addon.duration_days > 0 && (
                   <span className={styles.badge}>Valid for {addon.duration_days} days</span>
                )}
              </div>

              <div className={styles.priceContainer}>
                <span className={styles.currency}>
                  {addon.currency === "INR" ? "₹" : addon.currency}
                </span>
                <span className={styles.amount}>{addon.payable_amount}</span>
              </div>

              <button className={styles.buyBtn} onClick={() => handleBuyNow(addon.id)}>
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <FaPlusCircle className={styles.emptyIcon} />
            <h3>No Add-ons Available</h3>
            <p>There are currently no add-ons available for purchase.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddonsPage;

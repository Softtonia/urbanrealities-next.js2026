"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import {
  FaCrown,
  FaCheckCircle,
  FaStar,
  FaVideo,
  FaBuilding,
  FaSyncAlt,
  FaFileInvoice,
  FaHeadset,
  FaArrowRight,
  FaClock,
  FaListUl,
  FaCalendarAlt,
  FaArrowCircleUp,
  FaEye,
} from "react-icons/fa";
import { fetchMyStatus } from "@/services/membership.service";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import styles from "./MyCurrentPlan.module.css";
import Link from "next/link";
import PurchasedAddons from "../../../components/PurchasedAddons/PurchasedAddons";

const CurrentMembershipStatus = () => {
  const { token, user } = useSiteSettings();
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const loadStatus = async () => {
        try {
          const result = await fetchMyStatus(token);
          if (result?.status && result?.data) {
            setStatusData(result.data);
          }
        } catch (error) {
          console.error("Failed to load membership status:", error);
        } finally {
          setLoading(false);
        }
      };
      loadStatus();
    }
  }, [token]);

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <Skeleton
          variant="rectangular"
          height={200}
          style={{ borderRadius: "12px", marginBottom: 24 }}
        />
        <Skeleton
          variant="rectangular"
          height={100}
          style={{ borderRadius: "12px", marginBottom: 24 }}
        />
      </div>
    );
  }

  if (
    !statusData ||
    !statusData.has_active_membership ||
    !statusData.membership
  ) {
    return (
      <div className={styles.noActivePlan}>
        <div className={styles.noActiveIcon}>
          <FaCrown />
        </div>
        <h3>No Active Membership</h3>
        <p>
          You currently do not have an active membership plan. Upgrade to unlock
          premium features and list your properties.
        </p>
        <Link href="/membership-plan" className={styles.upgradeBtn}>
          View Plans
        </Link>
      </div>
    );
  }

  const { membership, plan, credits, features } = statusData;

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getProgressWidth = (used, total, isUnlimited) => {
    if (isUnlimited) return "0%";
    if (total === 0) return "0%";
    return `${(used / total) * 100}%`;
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.welcomeHeader}>
        <h1>My Current Plan</h1>
        <p>Manage your membership and grow your real estate business.</p>
      </div>

      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroLeft}>
          <div className={styles.crownCircle}>
            <FaCrown />
          </div>
          <div className={styles.planTitleWrapper}>
            <span className={styles.activeBadge}>Active</span>
            <h2 className={styles.planTitle}>
              {plan.name}
              <span className={styles.categoryBadge}>
                {plan.category?.name || "Owner"} Category
              </span>
            </h2>
            <p className={styles.planPrice}>₹{plan.payable_amount}</p>
          </div>
        </div>

        <div className={styles.heroMiddle}>
          <div className={styles.heroInfoRow}>
            <span className={styles.heroInfoLabel}>
              <FaClock /> Started On
            </span>
            <span className={styles.heroInfoValue}>
              {formatDate(membership.start_date)}
            </span>
          </div>
          <div className={styles.heroInfoRow}>
            <span className={styles.heroInfoLabel}>
              <FaClock /> Expires On
            </span>
            <span className={styles.heroInfoValue}>
              {formatDate(membership.expiry_date)}
            </span>
          </div>
          <div className={styles.heroInfoRow}>
            <span className={styles.heroInfoLabel}>
              <FaSyncAlt /> Auto Renew
            </span>
            <span
              className={`${styles.heroInfoValue} ${!membership.auto_renew ? styles.autoRenewStatus : ""}`}
            >
              {membership.auto_renew ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.circularProgress}>
            <span className={styles.daysValue}>
              {membership.days_remaining}
            </span>
            <span className={styles.daysLabel}>
              Days
              <br />
              Remaining
            </span>
          </div>
          <div className={styles.actionButtons}>
            <Link href="/membership-plan" className={styles.heroBtn}>
              <FaSyncAlt /> Renew Plan
            </Link>
            <button className={`${styles.heroBtn} ${styles.heroBtnOutline}`}>
              <FaFileInvoice /> Download Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconListings}`}>
            <FaBuilding />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statTitle}>Listings Credits</p>
            <h3 className={styles.statValue}>
              {credits?.listing?.is_unlimited
                ? "Unlimited"
                : `${credits?.listing?.used_credits} / ${credits?.listing?.total_credits}`}
            </h3>
            {!credits?.listing?.is_unlimited && (
              <>
                <div className={styles.statProgressBar}>
                  <div
                    className={`${styles.statProgressFill} ${styles.statProgressFillListings}`}
                    style={{
                      width: getProgressWidth(
                        credits?.listing?.used_credits,
                        credits?.listing?.total_credits,
                      ),
                    }}
                  ></div>
                </div>
                <p className={styles.statFooter}>
                  {credits?.listing?.used_credits} Used •{" "}
                  {credits?.listing?.remaining_credits} Remaining
                </p>
              </>
            )}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconFeatured}`}>
            <FaStar />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statTitle}>Featured Credits</p>
            <h3 className={styles.statValue}>
              {credits?.featured_listing?.is_unlimited
                ? "Unlimited"
                : `${credits?.featured_listing?.used_credits} / ${credits?.featured_listing?.total_credits}`}
            </h3>
            {!credits?.featured_listing?.is_unlimited && (
              <>
                <div className={styles.statProgressBar}>
                  <div
                    className={`${styles.statProgressFill} ${styles.statProgressFillFeatured}`}
                    style={{
                      width: getProgressWidth(
                        credits?.featured_listing?.used_credits,
                        credits?.featured_listing?.total_credits,
                      ),
                    }}
                  ></div>
                </div>
                <p className={styles.statFooter}>
                  {credits?.featured_listing?.used_credits} Used •{" "}
                  {credits?.featured_listing?.remaining_credits} Remaining
                </p>
              </>
            )}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconVideo}`}>
            <FaVideo />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statTitle}>Video Upload Credits</p>
            <h3 className={styles.statValue}>
              {credits?.video_upload?.is_unlimited
                ? "Unlimited"
                : `${credits?.video_upload?.used_credits} / ${credits?.video_upload?.total_credits}`}
            </h3>
            {!credits?.video_upload?.is_unlimited && (
              <>
                <div className={styles.statProgressBar}>
                  <div
                    className={`${styles.statProgressFill} ${styles.statProgressFillVideo}`}
                    style={{
                      width: getProgressWidth(
                        credits?.video_upload?.used_credits,
                        credits?.video_upload?.total_credits,
                      ),
                    }}
                  ></div>
                </div>
                <p className={styles.statFooter}>
                  {credits?.video_upload?.used_credits} Used •{" "}
                  {credits?.video_upload?.remaining_credits} Remaining
                </p>
              </>
            )}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconDays}`}>
            <FaCalendarAlt />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statTitle}>Days Remaining</p>
            <h3 className={styles.statValue}>{membership.days_remaining}</h3>
            <p className={styles.statFooter}>
              Until {formatDate(membership.expiry_date)}
            </p>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className={styles.middleRow}>
        <div className={styles.cardPanel}>
          <div className={styles.cardHeader}>
            <FaClock className={styles.cardHeaderIcon} /> Credit Usage
          </div>

          <div className={styles.usageItem}>
            <div className={styles.usageHeader}>
              <span>Listings Credits</span>
              <span className={styles.usageValue}>
                {credits?.listing?.used_credits} Used
              </span>
            </div>
            <div className={styles.statProgressBar}>
              <div
                className={`${styles.statProgressFill} ${styles.statProgressFillListings}`}
                style={{
                  width: getProgressWidth(
                    credits?.listing?.used_credits,
                    credits?.listing?.total_credits,
                  ),
                }}
              ></div>
            </div>
            <div className={styles.usageRemaining}>
              {credits?.listing?.remaining_credits} Remaining
            </div>
          </div>

          <div className={styles.usageItem}>
            <div className={styles.usageHeader}>
              <span>Featured Listing Credits</span>
              <span className={styles.usageValue}>
                {credits?.featured_listing?.used_credits} Used
              </span>
            </div>
            <div className={styles.statProgressBar}>
              <div
                className={`${styles.statProgressFill} ${styles.statProgressFillFeatured}`}
                style={{
                  width: getProgressWidth(
                    credits?.featured_listing?.used_credits,
                    credits?.featured_listing?.total_credits,
                  ),
                }}
              ></div>
            </div>
            <div className={styles.usageRemaining}>
              {credits?.featured_listing?.remaining_credits} Remaining
            </div>
          </div>

          <div className={styles.usageItem}>
            <div className={styles.usageHeader}>
              <span>Video Upload Credits</span>
              <span className={styles.usageValue}>
                {credits?.video_upload?.used_credits} Used
              </span>
            </div>
            <div className={styles.statProgressBar}>
              <div
                className={`${styles.statProgressFill} ${styles.statProgressFillVideo}`}
                style={{
                  width: getProgressWidth(
                    credits?.video_upload?.used_credits,
                    credits?.video_upload?.total_credits,
                  ),
                }}
              ></div>
            </div>
            <div className={styles.usageRemaining}>
              {credits?.video_upload?.remaining_credits} Remaining
            </div>
          </div>
        </div>

        <div className={styles.cardPanel}>
          <div className={styles.cardHeader}>
            <FaCalendarAlt className={styles.cardHeaderIcon} /> Membership
            Timeline
          </div>
          <div className={styles.timelineItem}>
            <div className={`${styles.timelineIcon} ${styles.tIconOrange}`}>
              <FaClock />
            </div>
            <div className={styles.timelineContent}>
              <h4>Purchased</h4>
              <p>{formatDate(membership.start_date)}</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={`${styles.timelineIcon} ${styles.tIconGreen}`}>
              <FaCheckCircle />
            </div>
            <div className={styles.timelineContent}>
              <h4>Active</h4>
              <p className={styles.activeText}>Current Membership</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={`${styles.timelineIcon} ${styles.tIconOrange}`}>
              <FaCalendarAlt />
            </div>
            <div className={styles.timelineContent}>
              <h4>Expires</h4>
              <p>{formatDate(membership.expiry_date)}</p>
            </div>
          </div>
        </div>

        <div className={styles.cardPanel}>
          <div className={styles.cardHeader}>
            <FaCrown className={styles.cardHeaderIcon} /> Quick Actions
          </div>
          <div className={styles.actionList}>
            <Link href="/membership-plan" className={styles.actionListItem}>
              <div className={styles.actionListLeft}>
                <div className={`${styles.actionListIcon} ${styles.bgOrange}`}>
                  <FaArrowCircleUp />
                </div>
                Upgrade Plan
              </div>
              <FaArrowRight className={styles.actionArrow} />
            </Link>
            <button className={styles.actionListItem}>
              <div className={styles.actionListLeft}>
                <div className={`${styles.actionListIcon} ${styles.bgGreen}`}>
                  <FaFileInvoice />
                </div>
                Download Invoice
              </div>
              <FaArrowRight className={styles.actionArrow} />
            </button>
            <Link href="/membership-plan" className={styles.actionListItem}>
              <div className={styles.actionListLeft}>
                <div className={`${styles.actionListIcon} ${styles.bgPurple}`}>
                  <FaListUl />
                </div>
                View All Plans
              </div>
              <FaArrowRight className={styles.actionArrow} />
            </Link>
            <Link href="/contact" className={styles.actionListItem}>
              <div className={styles.actionListLeft}>
                <div className={`${styles.actionListIcon} ${styles.bgBlue}`}>
                  <FaHeadset />
                </div>
                Contact Support
              </div>
              <FaArrowRight className={styles.actionArrow} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        <div className={styles.cardPanel}>
          <div className={styles.cardHeader}>
            <FaStar className={styles.cardHeaderIcon} /> Membership Features
          </div>
          <div className={styles.featuresGrid}>
            {Object.values(features || {})
              .filter(
                (f) =>
                  f.type === "boolean" && (f.value === true || f.value === "1"),
              )
              .map((feature) => (
                <div key={feature.id} className={styles.featureBox}>
                  <FaCheckCircle className={styles.featureCheck} />
                  <div className={styles.featureBoxContent}>
                    <h5>{feature.name}</h5>
                    <p>{feature.slug.replace(/_/g, " ")}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.cardPanel}>
          <div className={styles.cardHeader}>
            <FaListUl className={styles.cardHeaderIcon} /> Usage Limits
          </div>
          <div className={styles.limitsList}>
            {Object.values(features || {})
              .filter((f) => f.type !== "boolean")
              .map((feature) => (
                <div key={feature.id} className={styles.limitRow}>
                  <span className={styles.limitLabel}>{feature.name}</span>
                  <span
                    className={`${styles.limitValue} ${feature.is_unlimited || feature.value === "Unlimited" ? styles.limitValueUnlimited : ""}`}
                  >
                    {feature.is_unlimited ? "Unlimited" : feature.value}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      <PurchasedAddons />
    </div>
  );
};

export default CurrentMembershipStatus;

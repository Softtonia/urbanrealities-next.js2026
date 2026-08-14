"use client";
import React, { useEffect, useState } from "react";
import styles from "./AgentPropertyList.module.css";
import AgentPropertyCard from "./AgentPropertyCard";
import { LuSlidersHorizontal } from "react-icons/lu";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const AboutPropertyList = ({ userProperties }) => {
  const { token } = useSiteSettings();
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [purposeList, setPurposeList] = useState([]);
  useEffect(() => {
    const purposeFromURL = searchParams.get("purpose");
    if (purposeFromURL) {
      setFilter(purposeFromURL);
    }
  }, [searchParams]);
  const handlepurpose = (purposeId) => {
    router.push(`/all-agent/${id}?purpose=${purposeId}`);
    setFilter(purposeId);
  };
  console.log("=>>", filter)
  useEffect(() => {
    const fetchPurpose = async () => {
      try {
        const res = await fetch("/api/post-property/get-purpose", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setPurposeList(data);
        } else if (Array.isArray(data?.data)) {
          setPurposeList(data.data);
        }
      } catch (err) {
        console.error("Error fetching purposes:", err);
      }
    };
    fetchPurpose();
  }, [token]);

  return (
    <div className={styles.listWrapper}>
      {/* Top Filter Buttons */}
      <div className={styles.filters}>
        {purposeList.map((purpose) => (
          <div key={purpose.id}>
            <button
              className={`${styles.tabBtn} ${String(filter) === String(purpose.id) ? styles.activeTab : ""}`}
              onClick={() => handlepurpose(purpose.id)}
            >
              {purpose.name}
            </button>
          </div>
        ))}

        <div className={styles.sortSelect}>
          <button className={styles.sortBtn}>
            <LuSlidersHorizontal /> Sort by
          </button>
        </div>
      </div>

      {/* Property Cards */}
      {loading ? (
        <p>Loading...</p>
      ) : userProperties && userProperties.length > 0 ? (
        userProperties.map((property) => (
          <AgentPropertyCard key={property.id} property={property} />
        ))
      ) : (
        <p>No properties found for this agent</p>
      )}
    </div>
  );
};

export default AboutPropertyList;

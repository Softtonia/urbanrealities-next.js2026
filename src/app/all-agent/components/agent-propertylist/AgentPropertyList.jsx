"use client";
import React, { useEffect, useState } from "react";
import styles from "./AgentPropertyList.module.css";
import AgentPropertyCard from "./AgentPropertyCard";
import { LuSlidersHorizontal } from "react-icons/lu";
import { useParams } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const AboutPropertyList = () => {
  const { token } = useSiteSettings();
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [filter, setFilter] = useState(""); // "", "rent", "sell", "pg"
  const [loading, setLoading] = useState(false);
  const [purposeList, setPurposeList] = useState([])

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/agent/properties-by-userid/${id}?purpose_id=${filter}`
        );
        const data = await res.json();

        if (!data.status) {
          setIsEmpty(true);
          setProperties([]);
        } else {
          setIsEmpty(false);
          setProperties(data?.data?.properties);
        }
      } catch (err) {
        console.error("Error fetching Properties:", err);
        setIsEmpty(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperties();
    }
  }, [id, filter]);
  console.log("==>",properties)
  // run again if id or filter changes
  useEffect(() => {
    const fetchPurpose = async () => {

      // console.log(token)
      try {
        const res = await fetch('/api/post-property/get-purpose', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setPurposeList(data);
        } else if (data?.data) {
          setPurposeList(data.data);
        }
      } catch (err) {

        console.error('Error fetching roles:', err);
      }
    };
    if (token) {
      fetchPurpose();
    }
  }, [token]);
  console.log("==,>",properties)

  return (
    <div className={styles.listWrapper}>
      {/* Top Filter Buttons */}
      <div className={styles.filters}>
        {purposeList.map((purpose) => (
          <div key={purpose.id}>
            < button
              className={`${styles.tabBtn} ${filter === "rent" ? styles.activeTab : ""}`}
              onClick={() => setFilter(purpose.id)}
            >
              {purpose.name}
            </button>
          </div>
        ))

        }


        <div className={styles.sortSelect}>
          <button className={styles.sortBtn}>
            <LuSlidersHorizontal /> Sort by
          </button>
        </div>
      </div>

      {/* Property Cards */}
      {
        loading ? (
          <p>Loading...</p>
        ) : properties && properties.length > 0 ? (
          properties.map((property) => (
            <AgentPropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>Properties not found</p>
        )
      }

    </div >
  );
};

export default AboutPropertyList;

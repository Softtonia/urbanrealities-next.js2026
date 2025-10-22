'use client';
import styles from "./ProjectAbout.module.css";
import {
  FaRulerCombined,
  FaCalendarAlt,
  FaKey,
  FaBuilding,
  FaBed,
  FaDownload,
  FaCar,
  FaBath,
} from "react-icons/fa";
import {
  MdCheckCircle,
  MdWeekend,
  MdBalcony,
  MdOutlineChair,
  MdOutlineCorporateFare,
} from "react-icons/md";
import { useProject } from "../context/ProjectContext";
import { useState } from "react";

export default function AboutProject() {
  const { project } = useProject();
  const [expanded, setExpanded] = useState(false);
  const [expandedWhyUs, setExpandedWhyUs] = useState(false);

  // 🧩 Prevent hydration issues — wait until project data is loaded
  if (!project || Object.keys(project).length === 0) {
    return null; // Nothing rendered on SSR or client until project is ready
  }

  const overview =
    project?.repeater_fields?.filter(
      (val) =>
        val?.template?.slug?.startsWith("overview") &&
        (val.template.slug.includes("tower") ||
          val.template.slug.includes("units") ||
          val.template.slug.includes("size") ||
          val.template.slug.includes("bhk") ||
          val.template.slug.includes("launch") ||
          val.template.slug.includes("brochure") ||
          val.template.slug.includes("price") ||
          val.template.slug.includes("rent"))
    ) || [];

  const tower = overview.find((val) =>
    val.template.slug.includes("tower")
  )?.field_value;

  const units = overview.find((val) =>
    val.template.slug.includes("units")
  )?.field_value;

  const size = overview.find((val) =>
    val.template.slug.includes("size")
  )?.field_value;

  const bhk = overview.find((val) =>
    val.template.slug.includes("bhk")
  )?.field_value;

  const launchDate = overview.find((val) =>
    val.template.slug.includes("launch")
  )?.field_value;

  const brochure = overview.find((val) =>
    val.template.slug.includes("brochure")
  )?.field_value;

  const price = overview.find((val) =>
    val.template.slug.includes("price")
  )?.field_value;

  const rent = overview.find((val) =>
    val.template.slug.includes("rent")
  )?.field_value;

  const features = project?.repeater_fields?.filter((val) =>
    val.template?.name?.startsWith("project.furnishing")
  );

  const certificates = project?.repeater_fields?.filter((val) =>
    val.template?.name?.startsWith("project.certificates")
  );

  const WhyUs = project?.repeater_fields?.find(
    (val) => val.template?.name === "project.why-us"
  )?.field_value;

  const handleDownloadBrochure = () => {
    if (!brochure) {
      alert("Brochure not available!");
      return;
    }

    const link = document.createElement("a");
    link.href = brochure;
    link.setAttribute("download", "brochure.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = (link) => {
    if (!link) return;
    const a = document.createElement("a");
    a.href = link;
    a.download = link.split("/").pop() || "file";
    a.click();
  };

  const visibleCertificates = expanded
    ? certificates
    : certificates?.slice(0, 3);

  const items = WhyUs
    ? WhyUs.split(/<\/p>/)
      .map((item) =>
        item.replace(/<p[^>]*>/g, "").replace(/&nbsp;/g, " ").trim()
      )
      .filter(Boolean)
    : [];

  const visibleItems = expandedWhyUs ? items : items.slice(0, 3);

  const iconMap = {
    status: <MdCheckCircle className={styles["aboutProject-icon"]} />,
    furnished: <MdWeekend className={styles["aboutProject-icon"]} />,
    parking: <FaCar className={styles["aboutProject-icon"]} />,
    bedrooms: <FaBed className={styles["aboutProject-icon"]} />,
    bathrooms: <FaBath className={styles["aboutProject-icon"]} />,
    balconies: <MdBalcony className={styles["aboutProject-icon"]} />,
  };

  return (
    <div className={styles["aboutProject-container"]}>
      {project?.name && (
        <h2 className={styles["aboutProject-title"]}>
          About {project.name}
        </h2>
      )}

      {/* ✅ Render description only when data exists */}
      {project?.description ? (
        <div
          suppressHydrationWarning
          className={`${styles["aboutProject-desc"]} body-text-16`}
          dangerouslySetInnerHTML={{ __html: project.description || "" }}
        />

      ) : null}

      <div className={styles["aboutProject-highlights"]}>
        {features?.map((val) => (
          <div key={val.field_label} className={styles["aboutProject-box"]}>
            <p style={{ textTransform: "capitalize" }}>{val.field_label}</p>
            <span>{val.field_value}</span>
            {iconMap[val.field_label] || null}
          </div>
        ))}

        {(launchDate || units || tower || bhk) && (
          <>
            {launchDate && (
              <div className={styles["aboutProject-box"]}>
                <p>Launch Date</p>
                <span>{launchDate}</span>
                <FaCalendarAlt className={styles["aboutProject-icon"]} />
              </div>
            )}
            {units && (
              <div className={styles["aboutProject-box"]}>
                <p>Total Units</p>
                <span>{units}</span>
                <FaKey className={styles["aboutProject-icon"]} />
              </div>
            )}
            {tower && (
              <div className={styles["aboutProject-box"]}>
                <p>Total Towers</p>
                <span>{tower}</span>
                <FaBuilding className={styles["aboutProject-icon"]} />
              </div>
            )}
            {bhk && (
              <div className={styles["aboutProject-box"]}>
                <p>BHK</p>
                <span>{bhk}</span>
                <MdOutlineChair className={styles["aboutProject-icon"]} />
              </div>
            )}
          </>
        )}
      </div>

      {(price || rent || bhk || project?.property_status?.length > 0) && (
        <div className={styles["aboutProject-certificates"]}>
          {price && (
            <p className={styles["aboutProject-whybuy-title"]}>₹{price}</p>
          )}
          {rent && (
            <p className={styles["aboutProject-para-box"]}>Rent: ₹{rent}</p>
          )}
          {bhk && (
            <p className={styles["aboutProject-para-box"]}>{bhk} Flats</p>
          )}
          {project?.property_status?.length > 0 && (
            <p className={styles["aboutProject-para-box"]}>
              {project.property_status
                .map((status) => status?.property_status_name)
                .join(", ")}
            </p>
          )}
        </div>
      )}

      {visibleCertificates?.length > 0 && (
        <div className={styles["aboutProject-certificates"]}>
          <div className={styles["aboutProject-cert-list"]}>
            {visibleCertificates.map((val) => (
              <div
                key={val.field_label}
                className={styles["aboutProject-cert-box"]}
              >
                <p className={styles["aboutProject-para-box"]}>
                  {val.field_label}
                </p>
                <div
                  onClick={() => handleDownload(val.field_value)}
                  style={{ cursor: "pointer" }}
                >
                  <FaDownload className={styles["cert-icon"]} />
                </div>
              </div>
            ))}
          </div>
          {certificates?.length > 3 && (
            <button
              className={styles["aboutProject-view-all"]}
              style={{ border: "none", backgroundColor: "transparent" }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Hide" : "View All"}
            </button>
          )}
        </div>
      )}

      {items?.length > 0 && (
        <div className={styles["aboutProject-whybuy"]}>
          <h3 className={styles["aboutProject-whybuy-title"]}>
            Why Buy in {project.name}?
          </h3>
          <ul className={styles["aboutProject-whybuy-list"]}>
            {visibleItems.map((clean, index) => (
              <li
                key={index}
                className={styles["whybuy-li"]}
                dangerouslySetInnerHTML={{ __html: clean }}
              />
            ))}
          </ul>
          {items.length > 3 && (
            <button
              className={`${styles["aboutProject-more-link"]} body-text-rg16`}
              style={{ border: "none", backgroundColor: "transparent" }}
              onClick={() => setExpandedWhyUs(!expandedWhyUs)}
            >
              {expandedWhyUs ? "Less" : `+${items.length - 3} More`}
            </button>
          )}
          {brochure && (
            <button
              className={styles["aboutProject-brochure-btn"]}
              onClick={handleDownloadBrochure}
            >
              <FaDownload /> Download Brochure
            </button>
          )}
        </div>
      )}
    </div>
  );
}

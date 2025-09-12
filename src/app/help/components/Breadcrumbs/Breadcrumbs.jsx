// src/app/help/components/Breadcrumbs/Breadcrumbs.jsx
"use client";
import React from "react";
import Link from "next/link";
import styles from "./Breadcrumbs.module.css";
import { deslugify } from "@/utils/slugify";

function formatBreadcrumb(slug) {
  if (!slug) return "";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const Breadcrumbs = ({ activeCategory, activeTopic, activeSubtopic ,activeArticle}) => {
  const breadcrumbs = [];

  if (activeCategory) {
    breadcrumbs.push({
      title: deslugify(decodeURIComponent(activeCategory)), // keep it readable
      href: `/help`,
    });
  }

  if (activeTopic) {
    breadcrumbs.push({
      title: deslugify(decodeURIComponent(activeTopic)),
      href: `/help/${encodeURIComponent(activeCategory)}/${encodeURIComponent(activeTopic)}`,
    });
  }

  if (activeSubtopic) {
    breadcrumbs.push({
      title: deslugify(decodeURIComponent(activeSubtopic)),
      href: `/help/${encodeURIComponent(activeCategory)}/${encodeURIComponent(activeTopic)}/${encodeURIComponent(activeSubtopic)}`,
    });
  }
  if (activeArticle) {
    breadcrumbs.push({
      title: deslugify(decodeURIComponent(activeArticle)),
      href: `/help/${encodeURIComponent(activeCategory)}/${encodeURIComponent(activeTopic)}/${encodeURIComponent(activeSubtopic)}/${encodeURIComponent(activeArticle)}`,
    });
  }


  return (
    <nav className={styles.breadcrumbs}>
      {breadcrumbs.map((item, index) => (
        <span key={index} className={styles.breadcrumbItem}>
          <Link href={item.href} className={styles.link}>
            {item.title}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <span className={styles.separator}>&gt;</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

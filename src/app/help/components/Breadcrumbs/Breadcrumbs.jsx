"use client";
import React from "react";
import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ crumbs }) {
  if (!crumbs || !Array.isArray(crumbs)) {
    return null; // or return a loading state/empty breadcrumb container
  }

  const validCrumbs = crumbs.filter(
    (crumb) => crumb && crumb.label
  );

  if (validCrumbs.length === 0) {
    return null;
  }

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      {validCrumbs.map((crumb, idx) => (
        <span key={idx}>
          {crumb.href ? (
            <Link href={crumb.href}>{crumb.label}</Link>
          ) : (
            <span>{crumb.label}</span>
          )}
          {idx < validCrumbs.length - 1 && " > "}
        </span>
      ))}
    </nav>
  );
}
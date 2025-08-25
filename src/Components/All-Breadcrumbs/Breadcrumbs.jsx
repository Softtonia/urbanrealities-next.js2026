// src/Components/All-Breadcrumbs/Breadcrumbs.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ color, fontSize, fontFamily }) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const style = {
    color: color || "black",
    fontSize: fontSize || "16px",
    fontFamily: fontFamily || "sans-serif",
  };
  return (
    <nav aria-label="breadcrumbs">
      <ul
        className={styles.breadcrumbs}
style={style}      >
        <li className={styles.item}>
          <Link href="/" className={styles.homeLink}
style={style}>
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const href = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={href} className={styles.item}>
              <span className={styles.separator}>&gt;</span>
              {isLast ? (
                <span className={styles.current} style={style}>
                  {capitalize(value.replace(/-/g, " "))}
                </span>
              ) : (
                <Link href={href} className={styles.link} style={style}>
                  {capitalize(value.replace(/-/g, " "))}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

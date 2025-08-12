// src/app/help/layout.jsx
import Helpbg from "./components/Help-bg/Help-bg";
import React from "react";
import styles from "./components/explore-help/ExploreHelp.module.css"
export default function HelpLayout({ children }) {
  return (
    <>
      <Helpbg />
      <main className={`${styles.helpSection} container`}>{children}</main>
    </>
  );
}

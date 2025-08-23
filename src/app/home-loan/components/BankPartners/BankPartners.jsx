"use client";
import React from "react";
import styles from "./BankPartners.module.css";
import SubHero from "@/Components/SubHero/SubHero";

export default function BankPartners() {
  const banks = [
    { logo: "/bajaj-bank.png", name: "Bajaj Housing Finance", rate: "From 8.45% p.a.", tenure: "Max Tenure 40 Years" },
    { logo: "/hdfc-bank.png", name: "Hdfc", rate: "From 8.45% p.a.", tenure: "Max Tenure 40 Years" },
    { logo: "/sbi-bank.png", name: "SBI", rate: "From 8.45% p.a.", tenure: "Max Tenure 40 Years" },
    { logo: "/kotak-bank.png", name: "Kotak Mahindra Bank", rate: "From 8.45% p.a.", tenure: "Max Tenure 40 Years" },
    { logo: "/indian-bank.png", name: "Indian Bank", rate: "From 8.45% p.a.", tenure: "Max Tenure 40 Years" },
    { logo: "/l&t-finance.png", name: "L&T Housing Finance ltd", rate: "From 8.45% p.a.", tenure: "Max Tenure 40 Years" },
    { logo: "/lic-finance.png", name: "LIC Housing Finance", rate: "From 8.45% p.a.", tenure: "Max Tenure 40 Years" },
    { logo: "/godrej-finance.png", name: "Godrej Housing Finance", rate: "From 8.45% p.a.", tenure: "Max Tenure 40 Years" },
    { logo: "/axix-bank.png", name: "Axis Bank", rate: "From 8.45% p.a.", tenure: "Max Tenure 40 Years" },
  ];

  return (
    <div className={`${styles.bankPartners} container`}>
      <SubHero subHeroHeading={"Top Home Loan Bank Partners"} />

      <div className={styles.bankList}>
        {banks.map((bank, index) => (
          <div key={index} className={styles.bankCard}>
            <div className={styles.left}>
              <img src={bank.logo} alt={bank.name} className={styles.bankLogo} />
              <span className={styles.bankName}>{bank.name}</span>
            </div>
            <div className={styles.bankDetails}>
            <div className={styles.middle}>
              <span>{bank.rate}</span>
              <span>{bank.tenure}</span>
            </div>
            <div className={styles.right}>
              <button className={styles.knowMore}>Know More</button>
            </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.loadMoreWrapper}>
        <button className={styles.loadMore}>+12 More</button>
      </div>
    </div>
  );
}

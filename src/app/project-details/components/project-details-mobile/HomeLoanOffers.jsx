'use client';

import Image from "next/image";
import styles from "./HomeLoanOffers.module.css";

const loans = [
  {
    name: "Yes Bank",
    logo: "/yesbank.png",
  },
  {
    name: "Indiabulls",
    logo: "/indiabulls.png",
  },
  {
    name: "HDFC",
    logo: "/hdfc.png",
  },
];
const repeatedLoans = Array.from({ length: 9 }, (_, i) => loans[i % loans.length]);
const HomeLoanOffers = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Homes Loans & Offers</h2>
      <div className={styles.cardWrapper}>
        {repeatedLoans.map((loan, index) => (
          <div className={styles.card} key={index}>
            <Image
              src={loan.logo}
              alt={`${loan.name} Logo`}
              width={120}
              height={60}
              className={styles.logo}
            />
            <p className={styles.name}>{loan.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeLoanOffers;

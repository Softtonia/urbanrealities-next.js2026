'use client';

import Image from "next/image";
import styles from "./HomeLoanOffers.module.css";
import { useDeveloper } from "../../context/DeveloperContext";
import Link from "next/link";

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
  const developer = useDeveloper();
  console.log("Developer in Stats:", developer);

  const home = (developer?.repeater_fields || []).filter((val) => {
    const slug = val?.template?.slug?.toLowerCase() || "";
    return slug.startsWith("home") && slug.includes("loan");
  });



  const loans = home.find(val =>
    val?.template?.slug.includes("loan")
  )?.field_value;

  const loan = (loans || []).map((group) => {
    const nameField = group.find((f) => f.field_label.includes("Name"));
    const logoField = group.find((f) => f.field_label.includes("Logo"));
    const urlField = group.find((f) => f.field_label.includes("Url"));

    return {
      name: nameField?.field_value || "",
      logo: logoField?.field_value?.[0] || "",
      url: urlField?.field_value || "",
    };
  });
  return (
    loan && loan.length > 0 && (
      <section className={styles.section}>
        <h2 className={styles.title}>Homes Loans & Offers</h2>
        <div className={styles.cardWrapper}>
          {loan.map((loan, index) => (
            <div className={styles.card} key={index}>
              <Image
                src={loan.logo}
                alt={`${loan.name} Logo`}
                width={120}
                height={60}
                className={styles.logo}
              />
              <Link className={styles.name} href={loan.url}>
                <p >{loan.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    )

  );
};

export default HomeLoanOffers;

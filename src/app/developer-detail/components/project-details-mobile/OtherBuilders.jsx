'use client';

import styles from "./OtherBuilders.module.css";
import Image from "next/image";
import TextHeading from "./TextHeading";

const OtherBuilders = () => {
    const cards= new Array(9).fill(0);
  return (
    <section className={styles.section}>
      <TextHeading subHeroHeading="Other Builder" />{" "}
      <div className={styles.cardWrapper}>
        {cards.map((_,index)=>(

            <div className={styles.card} key={index}>
          <Image
            src="/preetidev.png"
            alt="Preeti Developers Logo"
            width={187}
            height={61}
            className={styles.preetiImg}
            />
        </div>
    
        ))}
      </div>
    </section>
  );
};

export default OtherBuilders;

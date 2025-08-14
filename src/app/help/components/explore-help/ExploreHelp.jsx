import React from "react";
import styles from "./ExploreHelp.module.css";
import TextHeading from "../../../../Components/TextHeading/TextHeading";
import Link from "next/link";
import { helpTopics } from "@/app/help/data/helpData"; 

const ExploreHelp = ({ headingText = "Explore Help Topics" }) => {
  return (
    <section className={`${styles.helpcontent}`}>
      <div>
        <TextHeading subHeroHeading={headingText} />
      </div>
      <div className={styles.grid}>
        {helpTopics.map((topic) => (
          <div key={topic.id} className={styles.card}>
            <div className={styles["help-tittle"]}>
              <div className={styles.icon}>{topic.icon}</div>
              <h3>{topic.title}</h3>
            </div>
            <ol className="m-0">
              {/* यहाँ पर जाँच करें कि topic.topics मौजूद है और एक एरे है */}
              {topic.topics && topic.topics.map((item) => (
                <li key={item.id}>
                  <Link href={`/help/${topic.id}/${item.id}`} className={styles.itemLink}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreHelp;
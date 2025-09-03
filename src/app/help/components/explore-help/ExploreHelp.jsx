import React from "react";
import styles from "./ExploreHelp.module.css";

import Link from "next/link";
import { helpTopics } from "@/app/help/data/helpData";
import TextHeading from "@/Components/TextHeading/TextHeading.jsx";
import { get } from "@/lib/api";

async function getCategories() {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/help-category-list`);
    const data = response?.data;
    // console.log("==>",data)
    if (Array.isArray(data)) return data;
    if (data?.data) return data.data;
    return [];
  } catch (err) {
    console.error("Error fetching agents:", err);
    return [];
  }
}

async function getSubCategories() {
  try {
    // ✅ Directly call backend API, not your Next.js API route
    const response = await get(`/api/help-subcategory-list`);
    const data = response?.data;
    // console.log("==>",data)
    if (Array.isArray(data)) return data;
    if (data?.data) return data.data;
    return [];
  } catch (err) {
    console.error("Error fetching agents:", err);
    return [];
  }
}

const ExploreHelp = async ({ headingText = "Explore Help Topics" }) => {
  const categories = await getCategories();
  const subCategories = await getSubCategories();
  console.log(categories)
  return (
    <section className={`${styles.helpcontent}`}>
      <div>
        <TextHeading subHeroHeading={headingText} />
      </div>
      <div className={styles.grid}>
        {categories.map((topic) => (
          <div key={topic.id} className={styles.card}>
            <div className={styles["help-tittle"]}>
              <div className={styles.icon}>{topic.icon}</div>
              <h3>{topic.name}</h3>
            </div>
            <ol className="m-0">
              {/* यहाँ पर जाँच करें कि topic.topics मौजूद है और एक एरे है */}
              {subCategories && subCategories.filter((ctg) => topic.id === ctg.help_category_id).map((item) => (
                <li key={item.id}>
                  <Link
                    href={{
                      pathname: `/help/${topic.name}/${item.name}`,
                      query: { subcategoryId: item.id,
                      categoryId:topic.id }, // sending id as query param
                    }}
                    className={styles.itemLink}
                  >
                    {item.name}
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
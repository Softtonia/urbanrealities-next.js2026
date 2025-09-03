'use client'
import React, { use, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { helpTopics } from "@/app/help/data/helpData";
import HelpSidebar from '../../components/HelpSidebar/HelpSidebar';
import styles from '../../components/TopicDetailPage.module.css';
import Link from 'next/link';
import SubHero from '@/Components/SubHero/SubHero';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const TopicDetailPage = ({ params }) => {
  const { category, topic } = use(params);

  const [childCtg, setChildCtg] = useState([]);
  const [subCtg, setSubCtg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const subcategoryId = searchParams.get('subcategoryId');

  const pathname = usePathname();

  // 🟢 States to hold extracted segments
  const [categoryPath, setCategoryPath] = useState("");
  const [topicPath, setTopicPath] = useState("");

  useEffect(() => {
    if (pathname) {
      // Remove "/help/" and decode
      const pathAfterHelp = decodeURIComponent(pathname.replace(/^\/help\//, ""));
      // Split by "/" → ["User Profile", "New Registration & Login"]
      const parts = pathAfterHelp.split("/");

      setCategoryPath(parts[0] || "");
      setTopicPath(parts[1] || "");
    }
  }, [pathname]);

  const fetchChildCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/help/ChildCategoryBySubCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          help_subcategory_id: subcategoryId,
          help_category_id: categoryId,
        }),
      });

      const result = await res.json();
      setChildCtg(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/help/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ help_category_id: categoryId }),
      });

      const result = await res.json();

      // ✅ Only update state if data is actually different
      setSubCtg((prev) => {
        if (
          prev.length === result.length &&
          prev.every((item, idx) => item.id === result[idx].id)
        ) {
          return prev; // no update
        }
        return result;
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const hasFetched = useRef(false);
  const stableCategoryId = useMemo(() => categoryId, []);
  const stableSubcategoryId = useMemo(() => subcategoryId, []);

  // run only once when categoryId exists
  useEffect(() => {
    if (stableCategoryId && !hasFetched.current) {
      hasFetched.current = true;
      fetchSubcategories();
    }
  }, [stableCategoryId]);

  // run when both exist
  useEffect(() => {
    if (stableCategoryId && stableSubcategoryId) {
      fetchChildCategories();
    }
  }, [stableCategoryId, stableSubcategoryId]);


  // find active topic from static helpTopics
  // const foundCategory = helpTopics.find(ctg => ctg.id === category);
  // const foundTopic = foundCategory?.topics.find(t => t.id === topic);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  console.log(subCtg)
  const memoizedTopics = useMemo(() => subCtg, [subCtg]);

  return (
    <div className={` ${styles.contentLayout} row `}>
      <div className={` ${styles.sidebar} col-12  `}>
        <Breadcrumbs activeCategory={categoryPath} activeTopic={topicPath} />

        <div className={` ${styles.contentLayout} row `}>
          <div className={` ${styles.sidebar} col-12 col-md-4 `}>
            <HelpSidebar topics={memoizedTopics} activeCategory={categoryId} activeTopic={subcategoryId} />
          </div>
          <div className={` ${styles.mainContent} col-12 col-md-8 `}>
            {childCtg && (
              <>
                <SubHero subHeroHeading={categoryPath} subHeroText={""} />
                <ol className={styles.subtopicList}>
                  {childCtg.map(subtopic => (
                    <li key={subtopic.id}>
                      <Link
                        href={`/help/${category}/${topic}/${subtopic.id}`}
                        className={styles.subtopicLink}
                      >
                        {subtopic.name}
                      </Link>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;

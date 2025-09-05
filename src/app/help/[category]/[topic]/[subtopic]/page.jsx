"use client";
import React, { useEffect, useState, useRef, useMemo,use } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import HelpSidebar from "../../../components/HelpSidebar/HelpSidebar";
import styles from "../../../components/TopicDetailPage.module.css";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import SubHero from "@/Components/SubHero/SubHero";
import Breadcrumbs from "@/app/help/components/Breadcrumbs/Breadcrumbs";
import { deslugify, slugify } from "@/utils/slugify";

const SubtopicPage = ({ params }) => {
    const { category, topic, subtopic } = use(params);

    // 🟢 State for subtopics & articles
    const [childCtg, setChildCtg] = useState([]); // subtopics
    const [articles, setArticles] = useState([]); // article list for selected subtopic
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const subcategoryId = searchParams.get("subcategoryId");

    // 🟢 Extract readable category/topic path from URL
    const [categoryPath, setCategoryPath] = useState("");
    const [topicPath, setTopicPath] = useState("");

    useEffect(() => {
        if (pathname) {
            const pathAfterHelp = decodeURIComponent(pathname.replace(/^\/help\//, ""));
            const parts = pathAfterHelp.split("/");
            setCategoryPath(parts[0] || "");
            setTopicPath(parts[1] || "");
        }
    }, [pathname]);

    // 🟢 Fetch subtopics (child categories)
    const fetchChildCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/help/ChildCategoryBySubCategory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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

    // 🟢 Fetch articles/questions inside a subtopic
    const fetchArticles = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/help/articlesBySubtopic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    help_subtopic_id: subtopic,
                    help_category_id: categoryId,
                    help_subcategory_id: subcategoryId,
                }),
            });
            const result = await res.json();
            setArticles(result.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 🟢 Trigger API calls
    const hasFetched = useRef(false);
    const stableCategoryId = useMemo(() => categoryId, []);
    const stableSubcategoryId = useMemo(() => subcategoryId, []);

    // Fetch subtopics
    useEffect(() => {
        if (stableCategoryId && stableSubcategoryId && !hasFetched.current) {
            hasFetched.current = true;
            fetchChildCategories();
        }
    }, [stableCategoryId, stableSubcategoryId]);

    // Fetch articles when subtopic changes
    useEffect(() => {
        if (subtopic) {
            fetchArticles();
        }
    }, [subtopic]);

    return (
        <div className={` ${styles.contentLayout} row `}>
            {/* Left Sidebar */}
            <div className={` ${styles.sidebar} col-12 col-md-4 `}>
                <Breadcrumbs activeCategory={slugify(categoryPath)} activeTopic={slugify(topicPath)} />
                <HelpSidebar
                    topics={childCtg}
                    activeCategory={categoryId}
                    activeTopic={subcategoryId}
                    activeSubtopic={subtopic}
                />
            </div>

            {/* Right Content */}
            <div className={` ${styles.mainContent} col-12 col-md-8 `}>
                <SubHero subHeroHeading={deslugify(topicPath)} subHeroText={""} />
{/* 
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>} */}

                {/* Show Article List */}
                <div className="d-flex align-item-center justify-content-center">
                    <ul className={styles.questionList}>
                        {articles.map((question) => (
                            <li key={question.id}>
                                <Link
                                    href={`/help/${category}/${topic}/${subtopic}/${question.id}`}
                                    className={styles.questionLink}
                                >
                                    <div className="d-flex gap-2 ">
                                        <div className={` ${styles.icon} d-flex`}>
                                            <IoIosArrowForward />
                                        </div>
                                        <p className={styles.questionpara}> {question.title}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SubtopicPage;

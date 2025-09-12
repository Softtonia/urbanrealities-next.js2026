"use client";
import React, { useEffect, useState, useRef, useMemo, use } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import HelpSidebar from "../../../components/HelpSidebar/HelpSidebar";
import styles from "../../../components/TopicDetailPage.module.css";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import SubHero from "@/Components/SubHero/SubHero";
import Breadcrumbs from "@/app/help/components/Breadcrumbs/Breadcrumbs";
import { deslugify, extractIdFromSlug, slugify } from "@/utils/slugify";

const SubtopicPage = ({ params }) => {
    const { category, topic, subtopic } = React.use(params);

    // 🟢 State for subtopics & articles
    const [childCtg, setChildCtg] = useState([]); // subtopics
    const [articles, setArticles] = useState([]); // article list for selected subtopic
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const categoryId = extractIdFromSlug(category)
    const subcategoryId = extractIdFromSlug(topic)
    const childTopic = extractIdFromSlug(subtopic)

    console.log('=--->', childTopic)
    console.log('=--->', topic)

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
    console.log(topicPath)

    // 🟢 Fetch childTopics (child categories)
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

    // 🟢 Fetch articles/questions inside a childTopic
    const fetchArticles = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/help/articlesBySubtopic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    help_childcategory_id: childTopic,
                    help_category_id: categoryId,
                    help_subcategory_id: subcategoryId,
                }),
            });
            const result = await res.json();
            const addName = (result.data).map((val) => ({ ...val, name: val.title }))
            setArticles(addName);
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
        if (childTopic) {
            fetchArticles();
        }
    }, [childTopic]);
    console.log('==>', articles)
    return (
        <div className={` ${styles.contentLayout} row `}>
            {/* Left Sidebar */}
            <div className={` ${styles.sidebar} col-12 col-md-4 `}>
                <Breadcrumbs activeCategory={category} activeTopic={topic}  />
                <HelpSidebar
                    activeCategory={category}
                    activeTopic={topic}
                    activeSubtopic={subtopic}
                    topics={childCtg}
                    mode='childCategory'
                    active={childTopic}
                />
            </div>

            {/* Right Content */}
            <div className={` ${styles.mainContent} col-12 col-md-8 `}>
                <SubHero subHeroHeading={deslugify(subtopic)} subHeroText={""} />
                {/* 
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>} */}

                {/* Show Article List */}
                <div className="d-flex align-item-center justify-content-left w-100">
                    <ul className={styles.questionList}>
                        {!loading ?
                            articles.length <= 0 ? (<li className="align-center">Articles Not Found</li>) : articles.map((question) => (
                                <li key={question.id}>
                                    <Link
                                        href={{
                                            pathname: `/help/${category}/${topic}/${subtopic}/${slugify(`${question.name} ${question.id}`)}`,

                                        }}
                                        className={styles.questionLink}
                                    >
                                        <div className="d-flex gap-2 ">
                                            <div className={` ${styles.icon} d-flex`}>
                                                <IoIosArrowForward />
                                            </div>
                                            <p className={styles.questionpara}> {question.name}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        :<li className="w-100 d-flex justify-content-center"><div className="loaderWrapper">
                        <div className="spinner"></div></div></li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SubtopicPage;

"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import HelpSidebar from "../../../../components/HelpSidebar/HelpSidebar";
import styles from "../../../../components/TopicDetailPage.module.css";
import Breadcrumbs from "@/Components/All-Breadcrumbs/Breadcrumbs";
import { deslugify, slugify } from "@/utils/slugify";

const QuestionPage = ({ params }) => {
  const { category, topic, subtopic, question } = React.use(params);;

  const [articles, setArticles] = useState([]);
  const [questionDetail, setQuestionDetail] = useState(null);
  const [childCtg, setChildCtg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subcategoryId = searchParams.get("subcategoryId");
  const questionId = searchParams.get("ArticleId");


  // Extract readable paths for breadcrumbs
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

  // Fetch child categories (for sidebar)
  const fetchChildCategories = async () => {
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
    }
  };

  // Fetch article heading list
  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/help/articlesBySubtopic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          help_childcategory_id: subtopic,
          help_category_id: categoryId,
          help_subcategory_id: subcategoryId,
        }),
      });
      const result = await res.json();
      console.log(result.data)
      const normalized = (result.data).map((item) => ({
        ...item,
        name: item.title,
      }));
  
      setArticles(normalized);
    } catch (err) {
      setError(err.message);
    }
  };

  console.log(articles)

  // Fetch article detail
  const fetchQuestionDetail = async () => {
    try {
      const res = await fetch("/api/help/articledetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article_id: questionId,
        }),
      });
      const result = await res.json();
      setQuestionDetail(result );
    } catch (err) {
      setError(err.message);
    }
  };

  console.log(questionDetail)
  // Call APIs
  const hasFetched = useRef(false);
  const stableCategoryId = useMemo(() => categoryId, []);
  const stableSubcategoryId = useMemo(() => subcategoryId, []);

  useEffect(() => {
    if (stableCategoryId && stableSubcategoryId && !hasFetched.current) {
      hasFetched.current = true;
      fetchChildCategories();
    }
  }, [stableCategoryId, stableSubcategoryId]);

  useEffect(() => {
    if (subtopic) {
      fetchArticles();
    }
  }, [subtopic]);

  useEffect(() => {
    if (question) {
      fetchQuestionDetail();
    }
  }, [question]);

  if (!questionDetail) {
    return <div>Loading question...</div>;
  }

  return (
    <div className={` ${styles.contentLayout} row `}>
      {/* Sidebar */}
      <div className={` ${styles.sidebar} col-12 col-md-4 `}>
        <Breadcrumbs
          activeCategory={deslugify(categoryPath)}
          activeTopic={deslugify(topicPath)}
          activeSubtopic={subtopic}
          activeArticle={question}
        />

        <HelpSidebar
          topics={articles}
          activeCategory={categoryId}
          activeTopic={subcategoryId}
          activeSubtopic={subtopic}
          activeQuestion={question}
        />
      </div>

      {/* Main Content */}
      <div className={` ${styles.mainContent} col-12 col-md-8 `}>
        <h1 className={styles.questionTitle}>{questionDetail.title}</h1>
        <div
          className={styles.questionContent}
          dangerouslySetInnerHTML={{ __html: questionDetail.description }}
        />
      </div>
    </div>
  );
};

export default QuestionPage;

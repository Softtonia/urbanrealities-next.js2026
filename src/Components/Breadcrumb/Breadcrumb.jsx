import React from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import styles from './Breadcrumb.module.css';

const Breadcrumb = ({ items }) => {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className={styles.breadcrumbItem}>
              {isLast || !item.link ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.link} className={styles.link}>
                    {item.label}
                  </Link>
                  <FaChevronRight className={styles.separator} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

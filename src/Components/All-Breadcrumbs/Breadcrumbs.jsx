// src/Components/All-Breadcrumbs/Breadcrumbs.jsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter(x => x);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <nav aria-label="breadcrumbs">
      <ul className={styles.breadcrumbs}>
        <li className={styles.item}>
          <Link href="/" className={styles.homeLink}>
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const href = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;

          return (
            <li key={href} className={styles.item}>
              <span className={styles.separator}>&gt;</span>
              {isLast ? (
                <span className={styles.current}>{capitalize(value.replace(/-/g, ' '))}</span>
              ) : (
                <Link href={href} className={styles.link}>
                  {capitalize(value.replace(/-/g, ' '))}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;



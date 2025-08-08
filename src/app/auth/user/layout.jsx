'use client';
import React, { useEffect, useState } from 'react';
import styles from './components/My-Account-Dashboard.module.css';
import SidebarDashboard from './components/Sidebar-Dashboard';
import { usePathname, useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update content view based on route and screen
  useEffect(() => {
    if (isMobile) {
      setShowContent(pathname !== '/auth/user');
    } else {
      setShowContent(true); // always show content on desktop
    }
  }, [pathname, isMobile]);

  const handleBackClick = () => {
    setShowContent(false);
  };

  if (!hasMounted) return null;

const handleSidebarItemClick = () => {
  console.log("Sidebar item clicked");
  setShowContent(true);
};

  return (
    <div className={styles.dashboard}>
      <div className={`${styles.mainContainer} container`}>
        <h1 className={`${styles.heading} top-heading`}>
          Welcome Back! Urbanrealities
        </h1>

        <div className={styles.pagerow}>
          {/* Sidebar show logic updated here 👇 */}
          {(!isMobile || showContent) && (
            <div className={styles.Sidebarcol}>
              {/* <SidebarDashboard onItemClick={() => setShowContent(true)} /> */}
              <SidebarDashboard onItemClick={handleSidebarItemClick} />
            </div>
          )}

          {/* Content area */}
          {showContent && (
            <main className={styles.main}>
              {isMobile && (
                <button className={styles.backBtn} onClick={handleBackClick}>
                  ← Back
                </button>
              )}
              {children}
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './components/post-property.module.css';

export default function Loading() {
  return (
    <div className="container p-0">
      <div className={`${styles.wrapper}`}>
        
        {/* Sidebar Skeleton */}
        <div className={styles.sidebarCol}>
          <div className="placeholder-glow" style={{ padding: '24px', backgroundColor: '#f8f9fa', borderRadius: '12px', minHeight: '500px' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="d-flex align-items-center mb-4">
                <div className="placeholder col-2 rounded-circle" style={{ width: '28px', height: '28px', backgroundColor: 'var(--Skeleton-Bg)' }}></div>
                <div className="ms-3 w-100">
                  <span className="placeholder col-8 mb-2 d-block" style={{ height: '16px', borderRadius: '4px', backgroundColor: 'var(--Skeleton-Bg)' }}></span>
                  <span className="placeholder col-5 d-block" style={{ height: '12px', borderRadius: '4px', backgroundColor: 'var(--Skeleton-Bg)' }}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className={styles.mainContent}>
          <div className="placeholder-glow">
            <span className="placeholder col-4 mb-3 d-block" style={{ height: '28px', borderRadius: '4px', backgroundColor: 'var(--Skeleton-Bg)' }}></span>
            <span className="placeholder col-3 mb-4 d-block" style={{ height: '24px', borderRadius: '4px', backgroundColor: 'var(--Skeleton-Bg)' }}></span>
            
            {Array.from({ length: 3 }).map((_, blockIdx) => (
              <div key={blockIdx} className="mt-5">
                <span className="placeholder col-3 mb-3 d-block" style={{ height: '18px', borderRadius: '4px', backgroundColor: 'var(--Skeleton-Bg)' }}></span>
                <div className="d-flex gap-3 flex-wrap">
                  {Array.from({ length: 4 }).map((_, btnIdx) => (
                    <span 
                      key={btnIdx} 
                      className="placeholder" 
                      style={{ height: '38px', width: ['100px', '140px', '120px', '160px'][btnIdx % 4], borderRadius: '5px', backgroundColor: 'var(--Skeleton-Bg)' }}
                    ></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}

'use client';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaShieldAlt, FaHeadset, FaSyncAlt } from 'react-icons/fa';
import { Skeleton } from '@mui/material';
import { fetchMembershipPlans } from '@/services/membership.service';
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';
import styles from './MembershipPlan.module.css';
import Link from 'next/link';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';
import { encodeId } from '@/lib/utils';

const MembershipPlanPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPlans, setExpandedPlans] = useState({});
  const { role } = useSiteSettings();

  const toggleFeatures = (planId) => {
    setExpandedPlans(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  useEffect(() => {
    const getPlans = async () => {
      try {
        const result = await fetchMembershipPlans();
        if (result?.status && result?.data) {
          setPlans(result.data);
        }
      } catch (error) {
        console.error("Failed to load membership plans:", error);
      } finally {
        setLoading(false);
      }
    };
    getPlans();
  }, []);


  const renderFeature = (feature, idx) => {
    // If it's a boolean and value is "0" or "false"
    const isFalse = feature.type === 'boolean' && (feature.value === '0' || feature.value === false || feature.value === 'false');
    // If it's text and value is "—"
    const isDash = feature.value === '—';

    if (isFalse || isDash) {
      return (
        <li key={idx} className={styles.featureItem}>
          <FaTimesCircle className={styles.featureIconDisabled} />
          <span className={styles.featureTextDisabled}>{feature.name}</span>
        </li>
      );
    }

    return (
      <li key={idx} className={styles.featureItem}>
        <FaCheckCircle className={styles.featureIcon} />
        <span>
          {feature.name} 
          {feature.type !== 'boolean' && (
            <span className={styles.featureValue}>
              : {feature.is_unlimited ? 'Unlimited' : feature.value}
            </span>
          )}
        </span>
      </li>
    );
  };

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Membership Plans', link: '/membership-plan' }
  ];

  return (
    <div className={styles.pageContainer}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', paddingBottom: '20px' }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <h1>Membership Plans</h1>
          <p>Choose the perfect plan to list your properties and grow your business.</p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.headerTrustItem}>
            <div className={styles.headerTrustIcon}><FaShieldAlt /></div>
            <div className={styles.headerTrustText}>
              <h4>Secure Payments</h4>
              <p>100% Secure</p>
            </div>
          </div>
          <div className={styles.headerDivider}></div>
          <div className={styles.headerTrustItem}>
            <div className={styles.headerTrustIcon}><FaHeadset /></div>
            <div className={styles.headerTrustText}>
              <h4>Customer Support</h4>
              <p>Always Here to Help</p>
            </div>
          </div>
          <div className={styles.headerDivider}></div>
          <div className={styles.headerTrustItem}>
            <div className={styles.headerTrustIcon}><FaSyncAlt /></div>
            <div className={styles.headerTrustText}>
              <h4>No Hidden Charges</h4>
              <p>Transparent Pricing</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plansGrid}>
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className={styles.planCard}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="80%" height={20} style={{ marginBottom: 24 }} />
              <Skeleton variant="rectangular" width="100%" height={60} style={{ marginBottom: 32 }} />
              <Skeleton variant="rectangular" width="100%" height={48} style={{ borderRadius: 8, marginBottom: 32 }} />
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="100%" height={24} />
            </div>
          ))
        ) : (
          plans
            .filter(plan => !role || plan.category?.name?.toLowerCase() === role.toLowerCase())
            .map((plan) => (
              <div key={plan.id} className={`${styles.planCard} ${plan.is_popular ? styles.popularCard : ''}`}>
                {plan.is_popular && <div className={styles.popularBadge}>Most Popular</div>}
                
                <h2 className={styles.planName}>{plan.name}</h2>
                <p className={styles.planDesc}>{plan.short_description || `Great for starting out and testing the waters.`}</p>
                
                <div className={styles.planPrice}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>{plan.payable_amount}</span>
                  <span className={styles.duration}>/ {plan.duration} {plan.duration_type}</span>
                </div>
                
                <ul className={styles.featuresList}>
                  {plan.features?.slice(0, expandedPlans[plan.id] ? plan.features.length : 8).map((feature, idx) => renderFeature(feature, idx))}
                </ul>
                
                {plan.features?.length > 8 && !expandedPlans[plan.id] && (
                  <p 
                    className={styles.moreFeatures} 
                    onClick={() => toggleFeatures(plan.id)}
                  >
                    + {plan.features.length - 8} more features
                  </p>
                )}
                {expandedPlans[plan.id] && (
                  <p 
                    className={styles.moreFeatures} 
                    onClick={() => toggleFeatures(plan.id)}
                  >
                    Show less features
                  </p>
                )}

                <Link href={`/membership-plan/checkout/${encodeId(plan.id)}`} className={`${styles.buyBtn} ${plan.is_popular ? styles.primaryBtn : styles.secondaryBtn}`}>
                  Choose Plan
                </Link>
              </div>
            ))
        )}
      </div>
      <div className={styles.trustBanner}>
        <div className={styles.trustItem}>
          <div className={styles.trustIconWrapper}><FaShieldAlt /></div>
          <div className={styles.trustText}>
            <h4>Secure & Safe</h4>
            <p>Your payments and data<br/>are always safe with us.</p>
          </div>
        </div>
        <div className={styles.trustDivider}></div>
        <div className={styles.trustItem}>
          <div className={styles.trustIconWrapper}><FaSyncAlt /></div>
          <div className={styles.trustText}>
            <h4>Quick Activation</h4>
            <p>Plans are activated instantly<br/>after successful payment.</p>
          </div>
        </div>
        <div className={styles.trustDivider}></div>
        <div className={styles.trustItem}>
          <div className={styles.trustIconWrapper}><FaCheckCircle /></div>
          <div className={styles.trustText}>
            <h4>Cancel Anytime</h4>
            <p>You can upgrade, downgrade<br/>or cancel anytime.</p>
          </div>
        </div>
        <div className={styles.trustDivider}></div>
        <div className={styles.trustItem}>
          <div className={styles.trustIconWrapper}><FaHeadset /></div>
          <div className={styles.trustText}>
            <h4>Dedicated Support</h4>
            <p>Our support team is always<br/>ready to assist you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlanPage;

'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@mui/material';
import { FaCheckCircle, FaLock, FaArrowLeft, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { 
  fetchMembershipPlanDetails, 
  createMembershipOrder, 
  getRazorpayOptions, 
  verifyMembershipPayment 
} from '@/services/membership.service';
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';
import styles from './Checkout.module.css';
import { toast } from 'react-toastify';
import { decodeId } from '@/lib/utils';

const CheckoutPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { isLogeIn, token, role } = useSiteSettings();
  
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  // Load Razorpay Script Dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isLogeIn) {
      router.push('/auth');
      return;
    }

    const loadPlan = async () => {
      try {
        const decodedId = decodeId(id);
        const result = await fetchMembershipPlanDetails(decodedId);
        if (result?.status && result?.data) {
          setPlan(result.data);
        } else {
          setError('Plan not found.');
        }
      } catch (err) {
        console.error("Failed to load plan details:", err);
        setError('Failed to load plan details.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadPlan();
    }
  }, [id, isLogeIn, router]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!plan || !token) return;
    
    setProcessing(true);
    setError(null);

    try {
      // Step 1: Create Order
      const orderData = {
        plan_id: plan.id,
        coupon_code: null,
        source: "frontend"
      };
      
      const orderResponse = await createMembershipOrder(token, orderData);
      
      if (!orderResponse?.status || !orderResponse?.data?.id) {
        throw new Error(orderResponse?.message || "Failed to create order");
      }
      
      const membershipOrderId = orderResponse.data.id;

      // Step 2: Get Razorpay Options
      const rzpOptionsResponse = await getRazorpayOptions(token, membershipOrderId);
      
      if (!rzpOptionsResponse?.status || !rzpOptionsResponse?.data) {
        throw new Error(rzpOptionsResponse?.message || "Failed to fetch Razorpay options");
      }

      const rzpOptions = rzpOptionsResponse.data;

      // Find the correct razorpay order id from backend response
      // It must be the one that starts with 'order_'
      let razorpayOrderId = rzpOptions.razorpay_order_id || rzpOptions.order_id;
      if (!razorpayOrderId && typeof rzpOptions === 'string' && rzpOptions.startsWith('order_')) {
        razorpayOrderId = rzpOptions;
      } else if (!razorpayOrderId && typeof rzpOptions.id === 'string' && rzpOptions.id.startsWith('order_')) {
        razorpayOrderId = rzpOptions.id;
      }

      if (!razorpayOrderId) {
        throw new Error("Could not find a valid Razorpay Order ID from backend response.");
      }

      // Step 3: Open Razorpay
      const options = {
        key: rzpOptions.key, // Ensure your backend sends the public key
        amount: rzpOptions.amount,
        currency: rzpOptions.currency,
        name: rzpOptions.name || "Urban Realities",
        description: `Payment for ${plan.name}`,
        order_id: razorpayOrderId, // Razorpay Order ID
        handler: async function (response) {
          try {
            // Step 4: Verify Payment
            const verifyData = {
              membership_order_id: membershipOrderId,
              razorpay_order_id: response.razorpay_order_id || razorpayOrderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature || "test_signature"
            };
            
            console.log("Verification Payload:", verifyData);
            
            const verifyResponse = await verifyMembershipPayment(token, verifyData);
            
            if (verifyResponse?.status) {
              toast.success("Payment successful!");
              if (role && role.toLowerCase() !== 'owner' && role.toLowerCase() !== 'buyer' && role.toLowerCase() !== 'tenant') {
                router.push('/auth/business/my-current-plan');
              } else {
                router.push('/auth/user/my-current-plan');
              }
            } else {
              toast.error(verifyResponse?.message || "Payment verification failed. Please contact support.");
              setProcessing(false);
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            toast.error(verifyErr.response?.data?.message || verifyErr.message || "Error verifying payment.");
            setProcessing(false);
          }
        },
        prefill: {
          name: rzpOptions.prefill?.name || "",
          email: rzpOptions.prefill?.email || "",
          contact: rzpOptions.prefill?.contact || ""
        },
        theme: {
          color: "#f97316"
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        toast.error("Payment Failed: " + response.error.description);
        setProcessing(false);
      });
      rzp1.open();

    } catch (err) {
      console.error("Checkout Error:", err);
      toast.error(err.message || "Something went wrong during checkout.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutGrid}>
          <div className={styles.orderSummary}>
            <Skeleton variant="rectangular" height={300} style={{ borderRadius: '12px' }} />
          </div>
          <div className={styles.paymentSection}>
            <Skeleton variant="rectangular" height={400} style={{ borderRadius: '12px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className={styles.checkoutContainer}>
        <div className={styles.errorState}>
          <h2>{error || 'Plan not found.'}</h2>
          <button onClick={() => router.back()} className={styles.backBtn}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <button onClick={() => router.back()} className={styles.backLink}>
        <FaArrowLeft /> Back to Plans
      </button>
      
      <div className={styles.checkoutHeader}>
        <h1>Complete Your Purchase</h1>
        <p>Review your plan details and complete the secure payment.</p>
      </div>

      <div className={styles.checkoutGrid}>
        {/* Left Column: Plan Details & Order Summary */}
        <div className={styles.orderSummary}>
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <span className={styles.categoryBadge}>{plan.category?.name || 'Category'}</span>
              <h2>{plan.name}</h2>
              <p className={styles.planDesc}>{plan.description || plan.short_description}</p>
            </div>
            
            <div className={styles.planPricing}>
              <span className={styles.currency}>₹</span>
              <span className={styles.amount}>{plan.payable_amount}</span>
              <span className={styles.duration}>/ {plan.duration} {plan.duration_type}</span>
            </div>

            <div className={styles.featuresSection}>
              <h3>What's Included:</h3>
              <ul className={styles.featuresList}>
                {plan.features?.slice(0, showAllFeatures ? plan.features.length : 8).map((feature, idx) => {
                  const isFalse = feature.type === 'boolean' && (feature.value === '0' || feature.value === false || feature.value === 'false');
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
                })}
              </ul>
              {plan.features?.length > 8 && !showAllFeatures && (
                <p 
                  className={styles.moreFeatures} 
                  onClick={() => setShowAllFeatures(true)}
                >
                  + {plan.features.length - 8} more features
                </p>
              )}
              {showAllFeatures && (
                <p 
                  className={styles.moreFeatures} 
                  onClick={() => setShowAllFeatures(false)}
                >
                  Show less features
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Payment Form */}
        <div className={styles.paymentSection}>
          <div className={styles.paymentCard}>
            <div className={styles.paymentHeader}>
              <h3>Order Summary</h3>
            </div>
            
            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>{plan.name} ({plan.duration} {plan.duration_type})</span>
                <span>₹{plan.price}</span>
              </div>
              {plan.sale_price !== null && plan.price !== plan.payable_amount && (
                <div className={styles.summaryRowDiscount}>
                  <span>Discount</span>
                  <span>-₹{plan.price - plan.payable_amount}</span>
                </div>
              )}
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryRowTotal}>
                <span>Total Amount</span>
                <span>₹{plan.payable_amount}</span>
              </div>
            </div>

            <div className={styles.secureBadge}>
              <FaLock />
              <span>Secure Encrypted Payment</span>
            </div>

            <button 
              onClick={handleCheckout} 
              className={styles.checkoutBtn}
              disabled={processing}
            >
              {processing ? (
                <><FaSpinner className={styles.spinnerIcon} /> Processing...</>
              ) : (
                `Pay ₹${plan.payable_amount} Securely`
              )}
            </button>
            <p className={styles.termsText}>
              By proceeding, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

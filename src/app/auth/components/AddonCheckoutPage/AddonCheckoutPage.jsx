"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton, CircularProgress } from "@mui/material";
import {
  FaCheckCircle,
  FaLock,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";
import {
  fetchMembershipAddonDetails,
  createAddonOrder,
  getAddonRazorpayOptions,
  verifyAddonPayment,
} from "@/services/membership.service";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import styles from "./AddonCheckoutPage.module.css";
import { toast } from "react-toastify";
import { decodeId } from "@/lib/utils";

const AddonCheckoutPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { isLogeIn, token, role, isLoadingToken } = useSiteSettings();

  const [addon, setAddon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [error, setError] = useState(null);

  // Load Razorpay Script Dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isLoadingToken) return;
    
    if (!isLogeIn) {
      router.push("/auth/login");
      return;
    }

    const loadAddon = async () => {
      try {
        const decodedId = decodeId(id);
        const result = await fetchMembershipAddonDetails(decodedId, token);
        if (result?.status && result?.data) {
          setAddon(result.data);
        } else {
          setError("Add-on not found.");
        }
      } catch (err) {
        console.error("Failed to load add-on details:", err);
        setError("Failed to load add-on details.");
      } finally {
        setLoading(false);
      }
    };

    if (id && !isLoadingToken && isLogeIn) {
      loadAddon();
    }
  }, [id, isLogeIn, isLoadingToken, router, token]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!addon || !token) return;

    setProcessing(true);
    setError(null);

    try {
      // Step 1: Create Order
      const orderData = {
        addon_id: addon.id,
        source: "frontend",
      };

      const orderResponse = await createAddonOrder(orderData, token);

      if (!orderResponse?.status || !orderResponse?.data?.id) {
        throw new Error(orderResponse?.message || "Failed to create order");
      }

      const membershipAddonOrderId = orderResponse.data.id;

      // Step 2: Get Razorpay Options
      const rzpOptionsResponse = await getAddonRazorpayOptions(
        membershipAddonOrderId,
        token
      );

      if (!rzpOptionsResponse?.status || !rzpOptionsResponse?.data) {
        throw new Error(
          rzpOptionsResponse?.message || "Failed to fetch Razorpay options",
        );
      }

      const rzpOptions = rzpOptionsResponse.data;

      // Find the correct razorpay order id from backend response
      let razorpayOrderId = rzpOptions.razorpay_order_id || rzpOptions.order_id;
      if (
        !razorpayOrderId &&
        typeof rzpOptions === "string" &&
        rzpOptions.startsWith("order_")
      ) {
        razorpayOrderId = rzpOptions;
      } else if (
        !razorpayOrderId &&
        typeof rzpOptions.id === "string" &&
        rzpOptions.id.startsWith("order_")
      ) {
        razorpayOrderId = rzpOptions.id;
      }

      if (!razorpayOrderId) {
        throw new Error(
          "Could not find a valid Razorpay Order ID from backend response.",
        );
      }

      // Step 3: Open Razorpay
      const options = {
        key: rzpOptions.key,
        amount: rzpOptions.amount,
        currency: rzpOptions.currency,
        name: rzpOptions.name || "Urban Realities",
        description: `Payment for ${addon.name}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          setIsVerifyingPayment(true);
          try {
            // Step 4: Verify Payment
            const verifyData = {
              membership_addon_order_id: membershipAddonOrderId,
              razorpay_order_id: response.razorpay_order_id || razorpayOrderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:
                response.razorpay_signature || "test_signature",
            };

            const [verifyResponse] = await Promise.all([
              verifyAddonPayment(token, verifyData),
              new Promise((resolve) => setTimeout(resolve, 2000)),
            ]);

            if (verifyResponse?.status) {
              toast.success("Payment successful!");
              if (
                role &&
                role.toLowerCase() !== "owner" &&
                role.toLowerCase() !== "buyer" &&
                role.toLowerCase() !== "tenant"
              ) {
                router.push("/auth/business/my-current-plan");
              } else {
                router.push("/auth/user/my-current-plan");
              }
            } else {
              toast.error(
                verifyResponse?.message ||
                  "Payment verification failed. Please contact support.",
              );
              setProcessing(false);
              setIsVerifyingPayment(false);
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            toast.error(
              verifyErr.response?.data?.message ||
                verifyErr.message ||
                "Error verifying payment.",
            );
            setProcessing(false);
            setIsVerifyingPayment(false);
          }
        },
        prefill: {
          name: rzpOptions.prefill?.name || "",
          email: rzpOptions.prefill?.email || "",
          contact: rzpOptions.prefill?.contact || "",
        },
        theme: {
          color: "#f97316",
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
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
            <Skeleton
              variant="rectangular"
              height={300}
              style={{ borderRadius: "12px" }}
            />
          </div>
          <div className={styles.paymentSection}>
            <Skeleton
              variant="rectangular"
              height={400}
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error || !addon) {
    return (
      <div className={styles.checkoutContainer}>
        <div className={styles.errorState}>
          <h2>{error || "Add-on not found."}</h2>
          <button onClick={() => router.back()} className={styles.backBtn}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      {isVerifyingPayment && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99999
        }}>
          <CircularProgress size={60} style={{ color: "#f97316" }} />
          <h2 style={{ marginTop: "24px", color: "#333", fontSize: "1.5rem" }}>Verifying payment...</h2>
          <p style={{ marginTop: "8px", color: "#666" }}>Please do not close or refresh this page.</p>
        </div>
      )}
      <button onClick={() => router.back()} className={styles.backLink}>
        <FaArrowLeft /> Back to Add-ons
      </button>

      <div className={styles.checkoutHeader}>
        <h1>Complete Your Purchase</h1>
        <p>Review your add-on details and complete the secure payment.</p>
      </div>

      <div className={styles.checkoutGrid}>
        {/* Left Column: Plan Details & Order Summary */}
        <div className={styles.orderSummary}>
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <span className={styles.categoryBadge}>
                {addon.addon_type === "credit" ? "Credit Add-on" : "Add-on"}
              </span>
              <h2>{addon.name}</h2>
              <p className={styles.planDesc}>
                {addon.description}
              </p>
            </div>

            <div className={styles.planPricing}>
              <span className={styles.currency}>{addon.currency === "INR" ? "₹" : addon.currency}</span>
              <span className={styles.amount}>{addon.payable_amount}</span>
            </div>

            <div className={styles.featuresSection}>
              <h3>What's Included:</h3>
              <ul className={styles.featuresList}>
                {addon.addon_type === "credit" && (
                  <li className={styles.featureItem}>
                    <FaCheckCircle className={styles.featureIcon} />
                    <span>
                      {addon.credit_quantity} {addon.credit_type} credits
                    </span>
                  </li>
                )}
                {addon.duration_days > 0 && (
                  <li className={styles.featureItem}>
                    <FaCheckCircle className={styles.featureIcon} />
                    <span>
                      Valid for {addon.duration_days} days
                    </span>
                  </li>
                )}
              </ul>
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
                <span>Sub Total</span>
                <span>₹{addon.price}</span>
              </div>
              {addon.sale_price !== null && addon.price !== addon.payable_amount && (
                <div className={styles.summaryRowDiscount}>
                  <span>Discount</span>
                  <span>
                    -₹{addon.price - addon.payable_amount}
                  </span>
                </div>
              )}
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryRowTotal}>
                <span>Total Amount</span>
                <span>₹{addon.payable_amount}</span>
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
                <>
                  <FaSpinner className={styles.spinnerIcon} /> Processing...
                </>
              ) : (
                `Pay ₹${addon.payable_amount} Securely`
              )}
            </button>
            <p className={styles.termsText}>
              By proceeding, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddonCheckoutPage;

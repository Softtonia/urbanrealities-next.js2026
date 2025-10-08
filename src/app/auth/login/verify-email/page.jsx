'use client';
import React, { useEffect, useState } from "react";
import styles from "../../component/loginform/Login.module.css";
import { useRouter } from "next/navigation";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import AuthLayout from "../../AuthLayout";
import SetPasswordLeft from "../../component/set-passwordform/SetPasswordLeft";
import Link from "next/link";

const VerifyOTP = () => {
    const router = useRouter();
    const { token, isOtpVerified, fetchingUser } = useSiteSettings();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(60);
    const [isResendVisible, setIsResendVisible] = useState(false);

    const finalToken = token || localStorage.getItem("tempAuthToken");
    console.log('finalToken', token)

    const data = {
        heading: "Verification",
        subText: "We have sent you an OTP to verify your account",
        otpLabel: "OTP verification",
        otpPlaceholder: "Enter OTP",
        nextButton: "Verify",
    };



    const handleResendOtp = async () => {
        try {

            // 🔁 Call your Laravel resend API here
            await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${finalToken}`
                },
                body: JSON.stringify({}),
            });
        } catch (err) {
            console.error("Failed to resend OTP", err);
            setError("Unable to resend OTP. Try again later.");
        }
    };
    useEffect(() => {
        if (!isOtpVerified) {
            handleResendOtp();
        }
    }, [isOtpVerified])

    // ------------------ VERIFY OTP ------------------
    const handleVerify = async (e) => {
        e.preventDefault();

        if (!otp || otp.trim() === "") {
            setError("Please enter the OTP");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${finalToken}`,
                },
                body: JSON.stringify({ email_otp: otp, }),
            });

            const result = await res.json();

            if (res.ok) {
                localStorage.removeItem("tempAuthToken");

                if (
                    ["company", "consultancy", "developer", "agent"].includes(result.role)
                ) {
                    window.location.href = `${process.env.NEXT_PUBLIC_BUSINESS_DOMAIN}?authtoken=${result.api_token}&id=${result.user_id}`;
                } else {
                    router.push("/auth/user/setting");
                }
            } else {
                setError(result.message || "Invalid OTP");
            }
        } catch (err) {
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };
    return (<>
        {!fetchingUser ?
            !isOtpVerified ?
                (<div>
                    <h2 className={`formHeading ${styles.formHeading}`}>{data.heading}</h2>
                    <p className={`formSubHeading ${styles.formSubHeading}`}>{data.subText}</p>

                    <form onSubmit={handleVerify}>
                        <div className={styles.formGroup}>
                            <label htmlFor="otp" className={`formLabel ${styles.formLabel}`}>
                                {data.otpLabel}
                            </label>

                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className={`formInput ${styles.formInput}`}
                                placeholder={data.otpPlaceholder}
                            />

                            {error && (
                                <p
                                    className="formLabel"
                                    style={{ color: "red", marginBottom: "10px" }}
                                >
                                    {error}
                                </p>
                            )}

                            {/* TIMER / RESEND TEXT */}
                            {/* {isResendVisible ? (
            <span
              onClick={handleResendOtp}
              style={{
                color: 'var(--primary-color)',
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px",
              }}
            >
              Resend OTP
            </span>
          ) : (
            <span style={{ color: "#777", fontSize: "14px" }}>
              Resend OTP in {timer}s
            </span>
          )} */}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`body-text-14 formGroupBtn ${styles.nextBtn}`}
                        >
                            {loading ? "Verifying..." : data.nextButton}
                        </button>
                    </form>
                </div>) : '' : ''}
    </>
    );
};


const VerifyOTPpage = () => {
    const { token, isOtpVerified, fetchingUser } = useSiteSettings();

    return (
        <>
            {!fetchingUser ?
                !isOtpVerified ? (
                    <AuthLayout leftContent={<SetPasswordLeft />} rightContent={<VerifyOTP />} >
                    </AuthLayout>) : (
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <h3>Your email is already verified </h3>
                        <p>
                            <Link
                                href="/auth/user/setting"
                                style={{
                                    color: "var(--Orange-Red)",
                                    textDecoration: "underline",
                                    fontWeight: "500",
                                }}
                            >
                                Go back to home
                            </Link>
                        </p>
                    </div>
                ) : ''
            }
        </>
    );
};

export default VerifyOTPpage;


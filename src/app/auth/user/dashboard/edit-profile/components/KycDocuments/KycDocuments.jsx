import React, { useRef, useState, useEffect } from "react";
import {
  FaIdCard,
  FaBuilding,
  FaUpload,
  FaEye,
  FaInfoCircle,
  FaShieldAlt,
  FaSpinner,
  FaArrowLeft,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaDownload,
  FaTimes,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import styles from "./KycDocuments.module.css";
import {
  uploadDocument,
  checkUploadProgress,
  startKycUpload,
  checkKycUploadProgress,
  submitKyc,
  resubmitKyc,
} from "@/services/document.service";
import {
  LARAVEL_API_BASE_URL,
  LARAVEL_APPLICATION_PASSWORD,
  APP_TYPE,
} from "@/lib/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const KycDocuments = ({ profile, token, onKycError, onSuccess }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [activeUploadId, setActiveUploadId] = useState(null);
  const [viewingDoc, setViewingDoc] = useState(null);
  const [viewingDocUrl, setViewingDocUrl] = useState(null);
  const [isLoadingView, setIsLoadingView] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [reraNumber, setReraNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [globalKycStatus, setGlobalKycStatus] = useState(null);
  const [rejectionReasons, setRejectionReasons] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (profile) {
      if (profile.aadhaar_number && !aadhaarNumber) {
        setAadhaarNumber(profile.aadhaar_number);
      }
      if (profile.gst_number && !gstNumber) {
        setGstNumber(profile.gst_number);
      }
      if (profile.rera_number && !reraNumber) {
        setReraNumber(profile.rera_number);
      }
    }
  }, [profile]);

  const getInitialDocs = () => {
    const roleName = (profile?.role_name || profile?.role || "").toLowerCase();
    const isBusinessRole = ["agent", "builder", "developer"].includes(roleName);

    const docs = [
      {
        id: 1,
        title: "Aadhaar Card (Front)",
        subtitle: "Upload clear front side of your Aadhaar card",
        icon: <FaIdCard />,
        iconColor: "orange",
        status: profile?.aadhaar_front ? "Verified" : null,
        uploadedOn: profile?.aadhaar_front ? "Uploaded" : null,
        uploading: false,
        progress: 0,
        filename: "",
        field: "aadhaar_front",
        previewUrl: profile?.aadhaar_front || null,
      },
      {
        id: 2,
        title: "Aadhaar Card (Back)",
        subtitle: "Upload clear back side of your Aadhaar card",
        icon: <FaIdCard />,
        iconColor: "orange",
        status: profile?.aadhaar_back ? "Verified" : null,
        uploadedOn: profile?.aadhaar_back ? "Uploaded" : null,
        uploading: false,
        progress: 0,
        filename: "",
        field: "aadhaar_back",
        previewUrl: profile?.aadhaar_back || null,
      },
    ];

    if (
      isBusinessRole ||
      roleName === "business" ||
      !roleName ||
      roleName === "agency"
    ) {
      docs.push(
        {
          id: 3,
          title: "Business Proof",
          subtitle: "Upload your business proof document",
          icon: <FaBuilding />,
          iconColor: "green",
          status: profile?.business_proof ? "Verified" : null,
          uploadedOn: profile?.business_proof ? "Uploaded" : null,
          uploading: false,
          progress: 0,
          filename: "",
          field: "business_proof",
          previewUrl: profile?.business_proof || null,
        },
        {
          id: 4,
          title: "GST Certificate",
          subtitle: "Upload your GST certificate",
          icon: <FaIdCard />,
          iconColor: "blue",
          status: profile?.gst_certificate ? "Verified" : null,
          uploadedOn: profile?.gst_certificate ? "Uploaded" : null,
          uploading: false,
          progress: 0,
          filename: "",
          field: "gst_certificate",
          previewUrl: profile?.gst_certificate || null,
        },
        {
          id: 5,
          title: "RERA Certificate",
          subtitle: "Upload your RERA certificate",
          icon: <FaBuilding />,
          iconColor: "purple",
          status: profile?.rera_certificate ? "Verified" : null,
          uploadedOn: profile?.rera_certificate ? "Uploaded" : null,
          uploading: false,
          progress: 0,
          filename: "",
          field: "rera_certificate",
          previewUrl: profile?.rera_certificate || null,
        },
      );
    }
    return docs;
  };

  const [documents, setDocuments] = useState(getInitialDocs());

  useEffect(() => {
    // If profile changes after mount, we might need to update docs
    setDocuments((prev) => {
      const newDocs = getInitialDocs();
      if (prev.length !== newDocs.length) {
        return newDocs.map((newDoc) => {
          const existingDoc = prev.find((d) => d.id === newDoc.id);
          return existingDoc ? { ...newDoc, ...existingDoc } : newDoc;
        });
      }
      return prev;
    });
  }, [profile?.role_name, profile?.role]);

  const showFormActions = documents.some(
    (d) => !d.status || d.status.toLowerCase() === "rejected" || d.file,
  );

  const getBaseUrl = () => LARAVEL_API_BASE_URL;

  const fetchDocs = async () => {
    if (!token) return;
    try {
      const [statusRes, docsRes, detailsRes] = await Promise.all([
        fetch(getBaseUrl() + "/api/kyc/status", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE,
          },
        }),
        fetch(getBaseUrl() + "/api/kyc/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE,
          },
        }),
        fetch(getBaseUrl() + "/api/kyc/details", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE,
          },
        }),
      ]);

      let kycLabel = null;
      let reasons = [];

      if (detailsRes && detailsRes.ok) {
        const detailsResult = await detailsRes.json();
        const data = detailsResult.data || detailsResult;
        if (data) {
          if (data.aadhaar_number) {
            setAadhaarNumber(data.aadhaar_number);
          }
          if (data.gst_number) {
            setGstNumber(data.gst_number);
          }
          if (data.rera_number) {
            setReraNumber(data.rera_number);
          }
        }
      }

      if (statusRes.ok) {
        const statusResult = await statusRes.json();
        if (statusResult.status && statusResult.data) {
          kycLabel = statusResult.data?.latest_kyc_request?.status;
          setGlobalKycStatus(kycLabel);
          if (
            kycLabel &&
            kycLabel.toLowerCase() === "rejected" &&
            statusResult.data.latest_kyc_request?.rejection_reason
          ) {
            reasons.push(statusResult.data.latest_kyc_request.rejection_reason);
          }
        }
      }

      if (docsRes.ok) {
        const docsResult = await docsRes.json();
        if (docsResult.status && docsResult.data) {
          const apiDocs = docsResult.data;

          documents.forEach((d) => {
            const apiDoc = apiDocs.find((ad) => ad.document_type === d.field);
            if (apiDoc) {
              let docStatus = apiDoc.status;
              if (
                !apiDoc.rejection_reason &&
                kycLabel &&
                kycLabel.toLowerCase() === "rejected" &&
                docStatus.toLowerCase() === "pending"
              ) {
                docStatus = "rejected";
              }
              if (
                docStatus.toLowerCase() === "rejected" &&
                apiDoc.rejection_reason
              ) {
                reasons.push(`${apiDoc.rejection_reason} in ${d.title}`);
              }
            }
          });

          setDocuments((prev) =>
            prev.map((d) => {
              const apiDoc = apiDocs.find((ad) => ad.document_type === d.field);
              if (apiDoc) {
                const dateStr = apiDoc.uploaded_at
                  ? new Date(apiDoc.uploaded_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Uploaded";

                let docStatus = apiDoc.status;
                if (
                  !apiDoc.rejection_reason &&
                  kycLabel &&
                  kycLabel.toLowerCase() === "rejected" &&
                  docStatus.toLowerCase() === "pending"
                ) {
                  docStatus = "rejected";
                }

                return {
                  ...d,
                  status:
                    docStatus.charAt(0).toUpperCase() + docStatus.slice(1),
                  uploadedOn: dateStr,
                  previewUrl: apiDoc.private_file_endpoint,
                  filename: apiDoc.file_original_name,
                };
              }
              return d;
            }),
          );

          const uniqueReasons = [...new Set(reasons)];
          setRejectionReasons(uniqueReasons);
          if (onKycError) {
            onKycError(kycLabel, uniqueReasons);
          }

          const frontDoc = apiDocs.find(
            (ad) => ad.document_type === "aadhaar_front",
          );
          if (frontDoc && frontDoc.document_number) {
            setAadhaarNumber((prev) => {
              if (prev && !prev.includes("X")) {
                return prev;
              }
              return frontDoc.document_number;
            });
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch KYC documents:", err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [token]);

  const handleUpload = (doc) => {
    setActiveUploadId(doc.id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && activeUploadId) {
      const localUrl = URL.createObjectURL(file);
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === activeUploadId
            ? {
                ...d,
                filename: file.name,
                previewUrl: localUrl,
                file: file,
                uploadedOn: "Selected",
                status: null,
              }
            : d,
        ),
      );
    }
    e.target.value = "";
  };

  const handleSaveKyc = async () => {
    try {
      const formData = new FormData();
      formData.append("aadhaar_number", aadhaarNumber);
      if (gstNumber) formData.append("gst_number", gstNumber);
      if (reraNumber) formData.append("rera_number", reraNumber);

      let hasNewFiles = false;
      // Append files synchronously using the current state
      documents.forEach((d) => {
        if (d.file) {
          formData.append(d.field, d.file);
          hasNewFiles = true;
        }
      });

      if (!hasNewFiles) {
        const allUploaded = documents.every(
          (d) => d.status && d.status.toLowerCase() !== "rejected",
        );
        if (allUploaded) {
          toast.success("All documents are already uploaded.");
          if (onSuccess) onSuccess();
        } else {
          toast.error("Please select a file to upload before saving.");
        }
        return;
      }

      setIsSaving(true);
      setDocuments((prev) =>
        prev.map((d) => {
          if (d.file) {
            return { ...d, uploading: true, progress: 10 };
          }
          return d;
        }),
      );

      let res = await startKycUpload(token, formData);
      const result = await res.json();

      if (res.ok && result.status) {
        const uploadId = result.data?.upload_id || result.upload_id;
        if (uploadId) {
          const pollInterval = setInterval(async () => {
            try {
              const progressRes = await checkKycUploadProgress(token, uploadId);
              if (progressRes.ok) {
                const progressData = await progressRes.json();
                const filesProgress =
                  progressData?.data?.files || progressData?.files || {};

                setDocuments((prev) =>
                  prev.map((d) => {
                    const fp = filesProgress[d.field];
                    if (fp) {
                      const isDone =
                        fp.percent >= 100 || fp.status === "completed";
                      return {
                        ...d,
                        uploading: !isDone,
                        progress:
                          fp.percent !== undefined && fp.percent !== null
                            ? fp.percent
                            : 100,
                        status: isDone ? "Pending" : d.status,
                      };
                    }
                    return d;
                  }),
                );

                if (
                  progressData?.data?.percent >= 100 ||
                  progressData?.data?.status === "completed" ||
                  progressData?.percent >= 100
                ) {
                  clearInterval(pollInterval);

                  try {
                    const payload = {
                      aadhaar_number: aadhaarNumber,
                      gst_number: gstNumber,
                      rera_number: reraNumber,
                    };

                    let submitRes;
                    if (
                      globalKycStatus &&
                      globalKycStatus.toLowerCase() === "rejected"
                    ) {
                      submitRes = await resubmitKyc(token, uploadId, payload);
                    } else {
                      submitRes = await submitKyc(token, uploadId, payload);
                    }

                    const submitResult = await submitRes.json();
                    if (submitRes.ok && submitResult.status) {
                      toast.success(
                        submitResult.message || "KYC submitted successfully.",
                      );
                      setTimeout(() => {
                        if (onSuccess) onSuccess();
                      }, 1000);
                    } else {
                      toast.error(
                        submitResult.message || "KYC submission failed.",
                      );
                    }
                  } catch (e) {
                    console.error("Submit error", e);
                    toast.error("Failed to submit KYC.");
                  }

                  setIsSaving(false);
                  setTimeout(() => {
                    setDocuments((prev) =>
                      prev.map((d) =>
                        d.file
                          ? {
                              ...d,
                              uploading: false,
                              progress: 100,
                              file: null,
                              uploadedOn: new Date().toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              ),
                            }
                          : d,
                      ),
                    );
                  }, 1000);
                }
              }
            } catch (e) {
              console.error(e);
            }
          }, 2000);
        } else {
          setIsSaving(false);
          setDocuments((prev) =>
            prev.map((d) =>
              d.file
                ? {
                    ...d,
                    uploading: false,
                    progress: 100,
                    file: null,
                    status: "Pending",
                    uploadedOn: new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }),
                  }
                : d,
            ),
          );
        }
      } else {
        setIsSaving(false);
        setDocuments((prev) =>
          prev.map((d) =>
            d.file ? { ...d, uploading: false, progress: 0 } : d,
          ),
        );

        if (result.errors) {
          const errorMsgs = [];
          Object.values(result.errors).forEach((errArray) => {
            if (Array.isArray(errArray)) {
              errorMsgs.push(...errArray);
            }
          });
          if (errorMsgs.length > 0) {
            toast.error(errorMsgs.join(" "));
          } else {
            toast.error(result.message || "Validation failed.");
          }
        } else {
          toast.error(result.message || "Upload failed. Please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      setIsSaving(false);
      setDocuments((prev) =>
        prev.map((d) => (d.file ? { ...d, uploading: false, progress: 0 } : d)),
      );
      toast.error("An error occurred during upload.");
    }
  };

  const handleView = async (doc) => {
    setViewingDoc(doc);
    setViewingDocUrl(null);

    if (
      doc.previewUrl &&
      !doc.previewUrl.startsWith("blob:") &&
      !doc.previewUrl.startsWith("data:")
    ) {
      setIsLoadingView(true);
      try {
        const fullUrl = getFullUrl(doc.previewUrl);
        const { LARAVEL_APPLICATION_PASSWORD, APP_TYPE } =
          await import("@/lib/config");
        const res = await fetch(fullUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE,
          },
        });

        if (res.ok) {
          const blob = await res.blob();
          const objectUrl = URL.createObjectURL(blob);
          setViewingDocUrl(objectUrl);
        } else {
          toast.error("Failed to load document preview.");
          setViewingDocUrl(null);
        }
      } catch (err) {
        console.error("View doc error", err);
        toast.error("Error loading document.");
        setViewingDocUrl(null);
      } finally {
        setIsLoadingView(false);
      }
    } else {
      setViewingDocUrl(doc.previewUrl ? getFullUrl(doc.previewUrl) : null);
    }
  };

  const getFullUrl = (url) => {
    if (!url) return null;
    const clean = url.replace(/\\/g, "");
    if (
      clean.startsWith("http") ||
      clean.startsWith("blob:") ||
      clean.startsWith("data:")
    ) {
      return clean;
    }
    return `${LARAVEL_API_BASE_URL}/${clean.replace(/^\//, "")}`;
  };

  return (
    <div className={styles.kycContainer}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <div className={styles.inputGroup}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Aadhaar Number
          </label>
          <input
            type="text"
            value={
              (documents.some(
                (d) => d.status && d.status.toLowerCase() !== "rejected",
              )
                ? aadhaarNumber
                  ? aadhaarNumber.length >= 4 && !aadhaarNumber.includes("X")
                    ? "XXXXXXXX" + aadhaarNumber.slice(-4)
                    : aadhaarNumber
                  : ""
                : aadhaarNumber
              )
                ?.match(/.{1,4}/g)
                ?.join(" ") || ""
            }
            onChange={(e) =>
              setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12))
            }
            readOnly={documents.some(
              (d) => d.status && d.status.toLowerCase() !== "rejected",
            )}
            disabled={documents.some(
              (d) => d.status && d.status.toLowerCase() !== "rejected",
            )}
            placeholder={
              documents.some(
                (d) => d.status && d.status.toLowerCase() !== "rejected",
              )
                ? ""
                : "Enter your 12 digit Aadhaar number"
            }
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #9E9E9E",
              borderRadius: "8px",
              outline: "none",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              fontFamily: "var(--font-regular)",
              backgroundColor: documents.some(
                (d) => d.status && d.status.toLowerCase() !== "rejected",
              )
                ? "#f3f4f6"
                : "white",
              cursor: documents.some(
                (d) => d.status && d.status.toLowerCase() !== "rejected",
              )
                ? "not-allowed"
                : "text",
              color: documents.some(
                (d) => d.status && d.status.toLowerCase() !== "rejected",
              )
                ? "#6b7280"
                : "inherit",
            }}
          />
        </div>

        {documents.some((d) => d.field === "gst_certificate") && (
          <div className={styles.inputGroup}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                display: "block",
                marginBottom: "8px",
              }}
            >
              GST Number
            </label>
            <input
              type="text"
              value={gstNumber}
              maxLength={15}
              onChange={(e) => setGstNumber(e.target.value)}
              readOnly={documents.some(
                (d) => d.status && d.status.toLowerCase() !== "rejected",
              )}
              disabled={documents.some(
                (d) => d.status && d.status.toLowerCase() !== "rejected",
              )}
              placeholder={
                documents.some(
                  (d) => d.status && d.status.toLowerCase() !== "rejected",
                )
                  ? ""
                  : "Enter your GST number"
              }
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #9E9E9E",
                borderRadius: "8px",
                outline: "none",
                fontSize: "clamp(14px, 1.5vw, 16px)",
                fontFamily: "var(--font-regular)",
                backgroundColor: documents.some(
                  (d) => d.status && d.status.toLowerCase() !== "rejected",
                )
                  ? "#f3f4f6"
                  : "white",
                cursor: documents.some(
                  (d) => d.status && d.status.toLowerCase() !== "rejected",
                )
                  ? "not-allowed"
                  : "text",
                textTransform: "uppercase",
                color: documents.some(
                  (d) => d.status && d.status.toLowerCase() !== "rejected",
                )
                  ? "#6b7280"
                  : "inherit",
              }}
            />
          </div>
        )}

        {documents.some((d) => d.field === "rera_certificate") && (
          <div className={styles.inputGroup}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                display: "block",
                marginBottom: "8px",
              }}
            >
              RERA Number
            </label>
            <input
              type="text"
              value={reraNumber}
              onChange={(e) => setReraNumber(e.target.value)}
              readOnly={documents.some(
                (d) => d.status && d.status.toLowerCase() !== "rejected",
              )}
              disabled={documents.some(
                (d) => d.status && d.status.toLowerCase() !== "rejected",
              )}
              placeholder={
                documents.some(
                  (d) => d.status && d.status.toLowerCase() !== "rejected",
                )
                  ? ""
                  : "Enter your RERA number"
              }
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #9E9E9E",
                borderRadius: "8px",
                outline: "none",
                fontSize: "clamp(14px, 1.5vw, 16px)",
                fontFamily: "var(--font-regular)",
                backgroundColor: documents.some(
                  (d) => d.status && d.status.toLowerCase() !== "rejected",
                )
                  ? "#f3f4f6"
                  : "white",
                cursor: documents.some(
                  (d) => d.status && d.status.toLowerCase() !== "rejected",
                )
                  ? "not-allowed"
                  : "text",
                textTransform: "uppercase",
                color: documents.some(
                  (d) => d.status && d.status.toLowerCase() !== "rejected",
                )
                  ? "#6b7280"
                  : "inherit",
              }}
            />
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".jpg,.png,.jpeg,.pdf"
      />
      {isKycApproved ? (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "32px" }}>
          <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px", marginTop: "0" }}>Uploaded Documents</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {documents.filter(d => d.status && d.status.toLowerCase() !== "rejected").map(doc => (
              <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div className={`${styles.iconCircle} ${styles[doc.iconColor]}`} style={{ width: "48px", height: "48px", fontSize: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: 0 }}>
                    {doc.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "600", color: "#374151" }}>{doc.title}</span>
                    <span style={{ fontSize: "13px", color: "#6b7280" }}>{doc.filename || "Document.png"}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10b981", fontSize: "14px", fontWeight: "500" }}>
                    <FaCheckCircle style={{ fontSize: "18px" }} />
                    Uploaded
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(doc);
                    }}
                    style={{ background: "none", border: "none", color: "#f37021", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", padding: "8px 12px" }}
                  >
                    <FaEye style={{ fontSize: "16px" }} /> View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.documentsGrid}>
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`${styles.documentCard} ${doc.file || doc.status ? styles.hasFile : ""}`}
            onClick={() => {
              if (!doc.file && !doc.status) handleUpload(doc);
            }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <div
                  className={`${styles.iconCircle} ${styles[doc.iconColor]}`}
                >
                  {doc.icon}
                </div>
                <h4 className={styles.docTitle}>{doc.title}</h4>
              </div>
              <div className={styles.headerRight}>
                {doc.status && (
                  <span
                    className={`${styles.statusText} ${styles.uploadedStatus}`}
                  >
                    Uploaded
                  </span>
                )}
              </div>
            </div>

            {(doc.file || doc.status || doc.previewUrl) && (
              <div className={styles.filePreviewBox}>
                <div className={styles.filePreviewInner}>
                  {doc.previewUrl && !imageErrors[doc.id] ? (
                    <img
                      src={
                        doc.previewUrl.startsWith("blob:")
                          ? doc.previewUrl
                          : getFullUrl(doc.previewUrl)
                      }
                      alt={doc.title}
                      className={styles.fileThumbnail}
                      onError={() => {
                        setImageErrors((prev) => ({ ...prev, [doc.id]: true }));
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(doc);
                      }}
                    />
                  ) : (
                    <div className={styles.fileThumbnailPlaceholder}>
                      {doc.icon || <FaIdCard />}
                    </div>
                  )}
                  <div className={styles.fileDetails}>
                    <span className={styles.filename}>
                      {doc.filename || "document.png"}
                    </span>
                    <span className={styles.filesize}>
                      {doc.file
                        ? `${(doc.file.size / 1024).toFixed(2)} KB`
                        : "3.07 KB"}
                    </span>
                  </div>
                  <button
                    className={styles.removeFileBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        doc.status === "Pending" ||
                        doc.status === "Verified"
                      ) {
                        // Normally you'd call an API to remove
                      }
                      setDocuments((prev) =>
                        prev.map((d) =>
                          d.id === doc.id
                            ? {
                                ...d,
                                file: null,
                                filename: "",
                                previewUrl: null,
                                status: null,
                                uploadedOn: null,
                              }
                            : d,
                        ),
                      );
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}

            {!doc.file && !doc.status && !doc.previewUrl && (
              <button
                type="button"
                className={styles.uploadPlaceholder}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpload(doc);
                }}
              >
                <FaUpload style={{ color: "#6B7280" }} />
                <span className={styles.uploadPlaceholderText}>
                  Click to upload document
                </span>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.infoBanner}>
        <FaExclamationCircle className={styles.infoBannerIcon} />
        <span className={styles.infoBannerText}>
          Supported formats: JPG, PNG, PDF | Max size: 5MB per file
        </span>
          </div>
        </>
      )}

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.btnBack}
          onClick={() => {
            // Logic to go back to previous tab
            // Assuming this component is rendered via ProfileForm which controls activeTab
            // Since activeTab isn't passed as a prop, you might need to handle this differently.
            // But per design, there's a back button.
            if (typeof document !== "undefined") {
              const buttons = Array.from(document.querySelectorAll("button"));
              const personalTabBtn = buttons.find((btn) =>
                btn.textContent.includes("Personal Details"),
              );
              if (personalTabBtn) personalTabBtn.click();
            }
          }}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back
        </button>
        <button
          type="button"
          onClick={handleSaveKyc}
          disabled={isSaving}
          className={styles.btnSave}
        >
          {isSaving ? "Saving..." : "Save & Continue \u2192"}
        </button>
      </div>

      <div className={styles.securityBanner}>
        <FaShieldAlt className={styles.securityBannerIcon} />
        <p>
          All documents are encrypted and stored securely. Your information is
          safe with us.
        </p>
      </div>

      {viewingDoc && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            setViewingDoc(null);
            setViewingDocUrl(null);
          }}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.viewerHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.viewerTitleRow}>
                  <h3>{viewingDoc.title}</h3>
                  <span
                    className={`${styles.badge} ${styles[viewingDoc.status?.toLowerCase()]}`}
                  >
                    {viewingDoc.status}
                  </span>
                </div>
                <div className={styles.viewerMetaRow}>
                  Uploaded on {viewingDoc.uploadedOn}
                </div>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => {
                  setViewingDoc(null);
                  setViewingDocUrl(null);
                }}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.viewerContainer}>
              <div className={styles.viewerToolbar}>
                <div className={styles.toolbarLeft}>
                  <button className={styles.toolbarBtn}>
                    <FaSearchMinus />
                  </button>
                  <span className={styles.toolbarText}>100% v</span>
                  <button className={styles.toolbarBtn}>
                    <FaSearchPlus />
                  </button>
                </div>
                <div className={styles.toolbarRight}>
                  <button className={styles.toolbarBtn}>
                    <FaDownload /> Download
                  </button>
                </div>
              </div>

              <div className={styles.viewerBody}>
                <div className={styles.viewerSidebar}>
                  <div className={styles.thumbnailWrapper}>
                    <div
                      className={`${styles.thumbnail} ${styles.active}`}
                      style={{ padding: 0, overflow: "hidden" }}
                    >
                      {isLoadingView ? (
                        <FaSpinner
                          className={styles.spinner}
                          style={{ color: "#f37021" }}
                        />
                      ) : viewingDocUrl ? (
                        viewingDoc.previewUrl &&
                        viewingDoc.previewUrl.toLowerCase().includes(".pdf") ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              backgroundColor: "#f3f4f6",
                              fontSize: "10px",
                              color: "#6b7280",
                            }}
                          >
                            PDF
                          </div>
                        ) : (
                          <img
                            src={viewingDocUrl}
                            alt="Thumbnail"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                            }}
                          />
                        )
                      ) : (
                        "Page 1"
                      )}
                    </div>
                    <span className={styles.thumbnailNumber}>1</span>
                  </div>
                </div>

                <div className={styles.viewerMain}>
                  <div
                    className={styles.previewImage}
                    style={{ padding: viewingDoc.previewUrl ? 0 : "24px" }}
                  >
                    {isLoadingView ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          gap: "12px",
                        }}
                      >
                        <FaSpinner
                          className={styles.spinner}
                          style={{ fontSize: "24px", color: "#f37021" }}
                        />
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>
                          Loading document securely...
                        </span>
                      </div>
                    ) : viewingDocUrl ? (
                      viewingDoc.previewUrl &&
                      viewingDoc.previewUrl.toLowerCase().includes(".pdf") ? (
                        <iframe
                          src={viewingDocUrl}
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            borderRadius: "12px",
                          }}
                          title={viewingDoc.title}
                        />
                      ) : (
                        <img
                          src={viewingDocUrl}
                          alt={viewingDoc.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "12px",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            console.error("Image load failed:", viewingDocUrl);
                          }}
                        />
                      )
                    ) : (
                      <>
                        {viewingDoc.icon}
                        <div className={styles.previewText}>
                          {viewingDoc.title} Preview
                        </div>
                      </>
                    )}
                    {/* Debug text just in case it's broken again, so we can see what URL it tried */}
                    {viewingDoc.previewUrl && (
                      <div
                        style={{
                          fontSize: "10px",
                          wordBreak: "break-all",
                          textAlign: "center",
                          opacity: 0.5,
                          marginTop: "8px",
                        }}
                      >
                        URL: {getFullUrl(viewingDoc.previewUrl)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.securityBanner}>
              <FaShieldAlt className={styles.securityBannerIcon} />
              <p>
                This document is securely stored and encrypted. Your information
                is safe with us.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycDocuments;

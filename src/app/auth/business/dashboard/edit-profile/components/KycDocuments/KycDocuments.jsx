import React, { useRef, useState, useEffect } from 'react';
import { FaIdCard, FaBuilding, FaUpload, FaEye, FaInfoCircle, FaShieldAlt, FaSpinner, FaArrowLeft, FaSearchPlus, FaSearchMinus, FaExpand, FaDownload, FaTimes } from 'react-icons/fa';
import styles from './KycDocuments.module.css';
import { uploadDocument, checkUploadProgress } from '@/services/document.service';
import { LARAVEL_API_BASE_URL } from '@/lib/config';

const KycDocuments = ({ profile, token }) => {
  const fileInputRef = useRef(null);
  const [activeUploadId, setActiveUploadId] = useState(null);
  const [viewingDoc, setViewingDoc] = useState(null);

  const [documents, setDocuments] = useState([
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
      previewUrl: profile?.aadhaar_front || null
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
      previewUrl: profile?.aadhaar_back || null
    },
    {
      id: 3,
      title: "Business Proof",
      subtitle: "Upload your Business Registration / GST / Shop Act",
      icon: <FaShieldAlt />,
      iconColor: "purple",
      status: profile?.business_proof ? "Verified" : null,
      uploadedOn: profile?.business_proof ? "Uploaded" : null,
      uploading: false,
      progress: 0,
      filename: "",
      field: "business_proof",
      previewUrl: profile?.business_proof || null
    }
  ]);

  useEffect(() => {
    if (profile) {
      const uploadDate = profile.updated_at ? new Date(profile.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Uploaded";
      setDocuments(prev => prev.map(d => ({
        ...d,
        status: profile[d.field] ? (profile.kyc_status || "Pending") : null,
        uploadedOn: profile[d.field] ? uploadDate : null,
        previewUrl: profile[d.field] || null
      })));
    }
  }, [profile]);

  const handleUpload = (doc) => {
    setActiveUploadId(doc.id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && activeUploadId) {
      const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const localUrl = URL.createObjectURL(file);
      const activeDoc = documents.find(d => d.id === activeUploadId);
      
      setDocuments(prev => prev.map(d => 
        d.id === activeUploadId 
          ? { ...d, uploading: true, progress: 0, filename: file.name, previewUrl: localUrl }
          : d
      ));

      try {
        const formData = new FormData();
        formData.append("field", activeDoc.field);
        formData.append("file", file);

        const res = await uploadDocument(token, formData);

        if (res.ok) {
          const result = await res.json();
          
          if (result.upload_id || result.data?.upload_id) {
            const actualUploadId = result.upload_id || result.data?.upload_id;
            // Poll for processing progress
            const pollInterval = setInterval(async () => {
              try {
                const progressRes = await checkUploadProgress(token, actualUploadId);
                if (progressRes.ok) {
                  const progressData = await progressRes.json();
                  // For backend processing percentage
                  const fileProgress = progressData?.data?.files?.[activeDoc.field] || progressData?.files?.[activeDoc.field];
                  
                  if (fileProgress) {
                    setDocuments(prev => prev.map(d => 
                      d.id === activeUploadId 
                        ? { ...d, progress: fileProgress.percent || 10 }
                        : d
                    ));
                    
                    if (fileProgress.percent >= 100 || fileProgress.status === "completed" || fileProgress.status === "verified") {
                      clearInterval(pollInterval);
                      // Show 100% first
                      setDocuments(prev => prev.map(d => 
                        d.id === activeUploadId 
                          ? { ...d, progress: 100 }
                          : d
                      ));
                      
                      // Wait a second before hiding the progress bar
                      setTimeout(() => {
                        setDocuments(prev => prev.map(d => 
                          d.id === activeUploadId 
                            ? { ...d, uploading: false, progress: 100, status: profile?.kyc_status || "Pending", uploadedOn: today, previewUrl: fileProgress.url || result.data?.url || localUrl }
                            : d
                        ));
                      }, 1000);
                    }
                  }
                }
              } catch (err) {
                console.error("Polling error", err);
              }
            }, 2000);
          } else {
            // Fallback if no upload_id
            setDocuments(prev => prev.map(d => 
              d.id === activeUploadId 
                ? { ...d, progress: 100 }
                : d
            ));
            
            setTimeout(() => {
              setDocuments(prev => prev.map(d => 
                d.id === activeUploadId 
                  ? { ...d, uploading: false, progress: 100, status: profile?.kyc_status || "Pending", uploadedOn: today, previewUrl: result.data?.url || localUrl }
                  : d
              ));
            }, 1000);
          }
        } else {
          console.error("Upload failed");
          setDocuments(prev => prev.map(d => 
            d.id === activeUploadId 
              ? { ...d, uploading: false, progress: 0, status: null }
              : d
          ));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setDocuments(prev => prev.map(d => 
          d.id === activeUploadId 
            ? { ...d, uploading: false, progress: 0, status: null }
            : d
        ));
      }
    }
    
    e.target.value = '';
  };

  const handleView = (doc) => {
    setViewingDoc(doc);
  };

  const getFullUrl = (url) => {
    if (!url) return null;
    const clean = url.replace(/\\/g, '');
    if (clean.startsWith('http') || clean.startsWith('blob:') || clean.startsWith('data:')) {
      return clean;
    }
    return `${LARAVEL_API_BASE_URL}/${clean.replace(/^\//, '')}`;
  };


  return (
    <div className={styles.kycContainer}>
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
        accept=".jpg,.png,.jpeg,.pdf"
      />
      {documents.map((doc) => (
        <div key={doc.id} className={styles.documentCard}>
          <div className={styles.leftSection}>
            <div className={`${styles.iconCircle} ${styles[doc.iconColor]}`}>
              {doc.icon}
            </div>
            <div className={styles.docInfo}>
              <h4>{doc.title} <FaInfoCircle className={styles.infoIcon} /></h4>
              <p>{doc.subtitle}</p>
            </div>
          </div>

          <div className={styles.middleSection}>
            {doc.uploading ? (
              <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '32px' }}>
                <span style={{ fontSize: '13px', color: '#6b7280', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {doc.filename}
                </span>
                <div className={styles.progressContainer} style={{ marginRight: '32px' }}>
                  <span className={styles.progressText}>{doc.progress}%</span>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${doc.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ) : doc.status ? (
              <>
                <span className={`${styles.badge} ${styles[doc.status.toLowerCase().replace(" ", "")]}`}>
                  {doc.status}
                </span>
                <p className={styles.uploadDate}>
                  {doc.uploadedOn === "Uploaded" ? "Uploaded" : `Uploaded on ${doc.uploadedOn}`}
                </p>
              </>
            ) : null}
          </div>

          <div className={styles.rightSection}>
            {doc.uploading ? (
              <button type="button" className={`${styles.actionBtn} ${styles.uploadingBtn}`}>
                <FaSpinner className={styles.spinner} /> Uploading...
              </button>
            ) : doc.status ? (
              <button 
                type="button"
                className={`${styles.actionBtn} ${styles.viewBtn}`}
                onClick={() => handleView(doc)}
              >
                <FaEye /> View Document
              </button>
            ) : (
              <div className={styles.uploadWrapper}>
                <button 
                  type="button"
                  className={`${styles.actionBtn} ${styles.uploadBtn}`}
                  onClick={() => handleUpload(doc)}
                >
                  <FaUpload /> Upload Document
                </button>
                <span className={styles.uploadText}>JPG, PNG or PDF (Max. 5MB)</span>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className={styles.securityBanner}>
        <FaShieldAlt className={styles.securityBannerIcon} />
        <p>All documents are encrypted and stored securely. Your information is safe with us.</p>
      </div>

      {viewingDoc && (
        <div className={styles.modalOverlay} onClick={() => setViewingDoc(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.viewerHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.viewerTitleRow}>
                  <h3>{viewingDoc.title}</h3>
                  <span className={`${styles.badge} ${styles[viewingDoc.status?.toLowerCase()]}`}>
                    {viewingDoc.status}
                  </span>
                </div>
                <div className={styles.viewerMetaRow}>
                  Uploaded on {viewingDoc.uploadedOn}
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setViewingDoc(null)}>
                <FaTimes />
              </button>
            </div>

            <div className={styles.viewerContainer}>
              <div className={styles.viewerToolbar}>
                <div className={styles.toolbarLeft}>
                  <button className={styles.toolbarBtn}><FaSearchMinus /></button>
                  <span className={styles.toolbarText}>100% v</span>
                  <button className={styles.toolbarBtn}><FaSearchPlus /></button>
                </div>
                <div className={styles.toolbarRight}>
                  <button className={styles.toolbarBtn}><FaDownload /> Download</button>
                </div>
              </div>

              <div className={styles.viewerBody}>
                <div className={styles.viewerSidebar}>
                  <div className={styles.thumbnailWrapper}>
                    <div className={`${styles.thumbnail} ${styles.active}`} style={{ padding: 0, overflow: 'hidden' }}>
                      {viewingDoc.previewUrl ? (
                        getFullUrl(viewingDoc.previewUrl).toLowerCase().includes('.pdf') ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f3f4f6', fontSize: '10px', color: '#6b7280' }}>PDF</div>
                        ) : (
                          <img 
                            src={getFullUrl(viewingDoc.previewUrl)} 
                            alt="Thumbnail" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            onError={(e) => { e.target.onerror = null; console.error("Image load failed:", getFullUrl(viewingDoc.previewUrl)); }}
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
                  <div className={styles.previewImage} style={{ padding: viewingDoc.previewUrl ? 0 : '24px' }}>
                    {viewingDoc.previewUrl ? (
                      getFullUrl(viewingDoc.previewUrl).toLowerCase().includes('.pdf') ? (
                        <iframe 
                          src={getFullUrl(viewingDoc.previewUrl)} 
                          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }} 
                          title={viewingDoc.title}
                        />
                      ) : (
                        <img 
                          src={getFullUrl(viewingDoc.previewUrl)} 
                          alt={viewingDoc.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }} 
                          onError={(e) => { e.target.onerror = null; console.error("Image load failed:", getFullUrl(viewingDoc.previewUrl)); }}
                        />
                      )
                    ) : (
                      <>
                        {viewingDoc.icon}
                        <div className={styles.previewText}>{viewingDoc.title} Preview</div>
                      </>
                    )}
                    {/* Debug text just in case it's broken again, so we can see what URL it tried */}
                    {viewingDoc.previewUrl && (
                      <div style={{ fontSize: '10px', wordBreak: 'break-all', textAlign: 'center', opacity: 0.5, marginTop: '8px' }}>
                        URL: {getFullUrl(viewingDoc.previewUrl)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.securityBanner}>
              <FaShieldAlt className={styles.securityBannerIcon} />
              <p>This document is securely stored and encrypted. Your information is safe with us.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycDocuments;

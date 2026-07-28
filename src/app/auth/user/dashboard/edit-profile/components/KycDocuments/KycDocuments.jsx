import React, { useRef, useState, useEffect } from 'react';
import { FaIdCard, FaBuilding, FaUpload, FaEye, FaInfoCircle, FaShieldAlt, FaSpinner, FaArrowLeft, FaSearchPlus, FaSearchMinus, FaExpand, FaDownload, FaTimes } from 'react-icons/fa';
import styles from './KycDocuments.module.css';
import { uploadDocument, checkUploadProgress, startKycUpload, checkKycUploadProgress, submitKyc } from '@/services/document.service';
import { LARAVEL_API_BASE_URL } from '@/lib/config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const KycDocuments = ({ profile, token }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [activeUploadId, setActiveUploadId] = useState(null);
  const [viewingDoc, setViewingDoc] = useState(null);
  const [viewingDocUrl, setViewingDocUrl] = useState(null);
  const [isLoadingView, setIsLoadingView] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setAadhaarNumber(profile.aadhaar_number || '');
    }
  }, [profile]);

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
   
  ]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const { getKycDocuments } = await import('@/services/document.service');
        const res = await getKycDocuments(token);
        if (res.ok) {
          const result = await res.json();
          if (result.status && result.data) {
            const apiDocs = result.data;
            setDocuments(prev => prev.map(d => {
              const apiDoc = apiDocs.find(ad => ad.document_type === d.field);
              if (apiDoc) {
                const dateStr = apiDoc.uploaded_at ? new Date(apiDoc.uploaded_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Uploaded";
                return {
                  ...d,
                  status: apiDoc.status.charAt(0).toUpperCase() + apiDoc.status.slice(1), // Capitalize
                  uploadedOn: dateStr,
                  previewUrl: apiDoc.private_file_endpoint,
                  filename: apiDoc.file_original_name
                };
              }
              return d;
            }));
            
            const frontDoc = apiDocs.find(ad => ad.document_type === 'aadhaar_front');
            if (frontDoc && frontDoc.document_number) {
               setAadhaarNumber(prev => prev || frontDoc.document_number);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch KYC documents:", err);
      }
    };
    if (token) {
      fetchDocs();
    }
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
      setDocuments(prev => prev.map(d => 
        d.id === activeUploadId 
          ? { ...d, filename: file.name, previewUrl: localUrl, file: file, uploadedOn: 'Selected' }
          : d
      ));
    }
    e.target.value = '';
  };

  const handleSaveKyc = async () => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append('aadhaar_number', aadhaarNumber);
      
      // Append files synchronously using the current state
      documents.forEach(d => {
        if (d.file) {
          formData.append(d.field, d.file);
        }
      });
      
      setDocuments(prev => prev.map(d => {
        if (d.file) {
          return { ...d, uploading: true, progress: 10 };
        }
        return d;
      }));
      
      const res = await startKycUpload(token, formData);
      const result = await res.json();
      
      if (res.ok && result.status) {
        const uploadId = result.data?.upload_id || result.upload_id;
        if (uploadId) {
          const pollInterval = setInterval(async () => {
            try {
              const progressRes = await checkKycUploadProgress(token, uploadId);
              if (progressRes.ok) {
                const progressData = await progressRes.json();
                const filesProgress = progressData?.data?.files || progressData?.files || {};
                
                setDocuments(prev => prev.map(d => {
                  const fp = filesProgress[d.field];
                  if (fp) {
                    const isDone = fp.percent >= 100 || fp.status === 'completed';
                    return { ...d, uploading: !isDone, progress: fp.percent || 100, status: isDone ? (profile?.kyc_status || 'Pending') : d.status };
                  }
                  return d;
                }));
                
                if (progressData?.data?.percent >= 100 || progressData?.data?.status === 'completed' || progressData?.percent >= 100) {
                  clearInterval(pollInterval);
                  
                  try {
                    const submitRes = await submitKyc(token, uploadId);
                    const submitResult = await submitRes.json();
                    if (submitRes.ok && submitResult.status) {
                      toast.success(submitResult.message || "KYC submitted successfully.");
                    } else {
                      toast.error(submitResult.message || "KYC submission failed.");
                    }
                  } catch (e) {
                    console.error("Submit error", e);
                    toast.error("Failed to submit KYC.");
                  }

                  setIsSaving(false);
                  setTimeout(() => {
                    setDocuments(prev => prev.map(d => d.file ? { ...d, uploading: false, progress: 100, file: null, uploadedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } : d));
                  }, 1000);
                }
              }
            } catch(e) {
              console.error(e);
            }
          }, 2000);
        } else {
          setIsSaving(false);
          setDocuments(prev => prev.map(d => d.file ? { ...d, uploading: false, progress: 100, file: null, status: profile?.kyc_status || 'Pending', uploadedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } : d));
        }
      } else {
        setIsSaving(false);
        setDocuments(prev => prev.map(d => d.file ? { ...d, uploading: false, progress: 0 } : d));
        
        if (result.errors) {
          const errorMsgs = [];
          Object.values(result.errors).forEach(errArray => {
            if (Array.isArray(errArray)) {
              errorMsgs.push(...errArray);
            }
          });
          if (errorMsgs.length > 0) {
            toast.error(errorMsgs.join(' '));
          } else {
            toast.error(result.message || "Validation failed.");
          }
        } else {
          toast.error(result.message || "Upload failed. Please try again.");
        }
      }
    } catch(err) {
      console.error(err);
      setIsSaving(false);
      setDocuments(prev => prev.map(d => d.file ? { ...d, uploading: false, progress: 0 } : d));
      toast.error("An error occurred during upload.");
    }
  };

  const handleView = async (doc) => {
    setViewingDoc(doc);
    setViewingDocUrl(null);
    
    if (doc.previewUrl && !doc.previewUrl.startsWith('blob:') && !doc.previewUrl.startsWith('data:')) {
      setIsLoadingView(true);
      try {
        const fullUrl = getFullUrl(doc.previewUrl);
        const { LARAVEL_APPLICATION_PASSWORD, APP_TYPE } = await import('@/lib/config');
        const res = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Application-Password': LARAVEL_APPLICATION_PASSWORD,
            'X-App-Type': APP_TYPE
          }
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
    const clean = url.replace(/\\/g, '');
    if (clean.startsWith('http') || clean.startsWith('blob:') || clean.startsWith('data:')) {
      return clean;
    }
    return `${LARAVEL_API_BASE_URL}/${clean.replace(/^\//, '')}`;
  };


  return (
    <div className={styles.kycContainer}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '24px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Aadhaar Number</label>
        <input 
          type="text" 
          value={aadhaarNumber} 
          onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
          placeholder="Enter your 12 digit Aadhaar number" 
          style={{ width: '100%', padding: '12px 16px', border: '1px solid #9E9E9E', borderRadius: '8px', outline: 'none', fontSize: 'clamp(14px, 1.5vw, 16px)', fontFamily: 'var(--font-regular)' }}
        />
      </div>
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
            ) : doc.file ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className={`${styles.badge} ${styles.pending}`}>
                  Selected
                </span>
                <span style={{ fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                  {doc.filename}
                </span>
              </div>
            ) : null}
          </div>

          <div className={styles.rightSection}>
            {doc.uploading ? (
              <button type="button" className={`${styles.actionBtn} ${styles.uploadingBtn}`}>
                <FaSpinner className={styles.spinner} /> Uploading...
              </button>
            ) : doc.status ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  type="button"
                  className={`${styles.actionBtn} ${styles.viewBtn}`}
                  onClick={() => handleView(doc)}
                >
                  <FaEye /> View Document
                </button>
                {doc.status.toLowerCase() === 'rejected' && (
                  <button 
                    type="button"
                    className={`${styles.actionBtn} ${styles.uploadBtn}`}
                    onClick={() => handleUpload(doc)}
                  >
                    <FaUpload /> Reupload
                  </button>
                )}
              </div>
            ) : doc.file ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  type="button"
                  className={`${styles.actionBtn} ${styles.viewBtn}`}
                  onClick={() => handleView(doc)}
                >
                  <FaEye /> View Document
                </button>
                <button 
                  type="button"
                  className={`${styles.actionBtn} ${styles.uploadBtn}`}
                  onClick={() => handleUpload(doc)}
                >
                  <FaUpload /> Change
                </button>
              </div>
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

      <div className={styles.formActions}>
        <button 
          type="button"
          onClick={handleSaveKyc}
          disabled={isSaving}
          className={styles.btnSave}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        <button 
          type="button" 
          className={styles.btnCancel} 
          onClick={() => router.push('/auth/user/dashboard')}
        >
          Cancel
        </button>
      </div>

      <div className={styles.securityBanner}>
        <FaShieldAlt className={styles.securityBannerIcon} />
        <p>All documents are encrypted and stored securely. Your information is safe with us.</p>
      </div>

      {viewingDoc && (
        <div className={styles.modalOverlay} onClick={() => { setViewingDoc(null); setViewingDocUrl(null); }}>
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
              <button className={styles.closeBtn} onClick={() => { setViewingDoc(null); setViewingDocUrl(null); }}>
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
                      {isLoadingView ? (
                        <FaSpinner className={styles.spinner} style={{ color: '#f37021' }} />
                      ) : viewingDocUrl ? (
                        viewingDoc.previewUrl && viewingDoc.previewUrl.toLowerCase().includes('.pdf') ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f3f4f6', fontSize: '10px', color: '#6b7280' }}>PDF</div>
                        ) : (
                          <img 
                            src={viewingDocUrl} 
                            alt="Thumbnail" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            onError={(e) => { e.target.onerror = null; }}
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
                    {isLoadingView ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
                        <FaSpinner className={styles.spinner} style={{ fontSize: '24px', color: '#f37021' }} />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Loading document securely...</span>
                      </div>
                    ) : viewingDocUrl ? (
                      viewingDoc.previewUrl && viewingDoc.previewUrl.toLowerCase().includes('.pdf') ? (
                        <iframe 
                          src={viewingDocUrl} 
                          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }} 
                          title={viewingDoc.title}
                        />
                      ) : (
                        <img 
                          src={viewingDocUrl} 
                          alt={viewingDoc.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }} 
                          onError={(e) => { e.target.onerror = null; console.error("Image load failed:", viewingDocUrl); }}
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

import React, { useRef, useState } from 'react';
import { FaIdCard, FaBuilding, FaUpload, FaEye, FaInfoCircle, FaShieldAlt, FaSpinner, FaArrowLeft, FaSearchPlus, FaSearchMinus, FaExpand, FaDownload } from 'react-icons/fa';
import styles from './KycDocuments.module.css';

const KycDocuments = () => {
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
      status: "Verified",
      uploadedOn: "16 Jul 2026",
      uploading: false,
      progress: 0,
      filename: ""
    },
    {
      id: 2,
      title: "Aadhaar Card (Back)",
      subtitle: "Upload clear back side of your Aadhaar card",
      icon: <FaIdCard />,
      iconColor: "orange",
      status: "Pending",
      uploadedOn: "16 Jul 2026",
      uploading: false,
      progress: 0,
      filename: ""
    },
    {
      id: 3,
      title: "Business Proof",
      subtitle: "Upload your Business Registration / GST / Shop Act",
      icon: <FaShieldAlt />,
      iconColor: "purple",
      status: null,
      uploadedOn: null,
      uploading: false,
      progress: 0,
      filename: ""
    },
    {
      id: 4,
      title: "License / Registration",
      subtitle: "Upload your trade license or professional license",
      icon: <FaIdCard />,
      iconColor: "purple",
      status: null,
      uploadedOn: null,
      uploading: false,
      progress: 0,
      filename: ""
    },
    {
      id: 5,
      title: "Additional Document (Optional)",
      subtitle: "Any other supporting document",
      icon: <FaBuilding />,
      iconColor: "purple",
      status: null,
      uploadedOn: null,
      uploading: false,
      progress: 0,
      filename: ""
    }
  ]);

  const handleUpload = (doc) => {
    setActiveUploadId(doc.id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && activeUploadId) {
      const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const localUrl = URL.createObjectURL(file);
      
      setDocuments(prev => prev.map(d => 
        d.id === activeUploadId 
          ? { ...d, uploading: true, progress: 0, filename: file.name, previewUrl: localUrl }
          : d
      ));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setDocuments(prev => prev.map(d => 
          d.id === activeUploadId 
            ? { ...d, progress: progress > 100 ? 100 : progress }
            : d
        ));

        if (progress >= 100) {
          clearInterval(interval);
          setDocuments(prev => prev.map(d => 
            d.id === activeUploadId 
              ? { ...d, uploading: false, status: "Pending", uploadedOn: today }
              : d
          ));
          setActiveUploadId(null);
        }
      }, 300); // Progresses 10% every 300ms
    }
    
    // Reset file input so same file can be uploaded again if needed
    e.target.value = '';
  };

  const handleView = (doc) => {
    setViewingDoc(doc);
  };

  if (viewingDoc) {
    return (
      <div className={styles.kycContainer}>
        <div className={styles.viewerHeader}>
          <button className={styles.backBtn} onClick={() => setViewingDoc(null)}>
            <FaArrowLeft /> Back to Documents
          </button>
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

        <div className={styles.viewerContainer}>
          <div className={styles.viewerToolbar}>
            <div className={styles.toolbarLeft}>
              <button className={styles.toolbarBtn}><FaSearchPlus /></button>
              <span className={styles.toolbarText}>100% v</span>
              <button className={styles.toolbarBtn}><FaSearchMinus /></button>
              <button className={styles.toolbarBtn}><FaExpand /></button>
            </div>
            <div className={styles.toolbarRight}>
              <button className={styles.toolbarBtn}><FaDownload /> Download</button>
              <button className={styles.toolbarBtn}><FaExpand /></button>
            </div>
          </div>

          <div className={styles.viewerBody}>
            <div className={styles.viewerSidebar}>
              <div className={styles.thumbnailWrapper}>
                <div className={`${styles.thumbnail} ${styles.active}`} style={{ padding: 0, overflow: 'hidden' }}>
                  {viewingDoc.previewUrl ? (
                    <img 
                      src={viewingDoc.previewUrl} 
                      alt="Thumbnail" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
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
                  <img 
                    src={viewingDoc.previewUrl} 
                    alt={viewingDoc.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }} 
                  />
                ) : (
                  <>
                    {viewingDoc.icon}
                    <div className={styles.previewText}>{viewingDoc.title} Preview</div>
                  </>
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
    );
  }

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
                <span className={`${styles.badge} ${styles[doc.status.toLowerCase()]}`}>
                  {doc.status}
                </span>
                <p className={styles.uploadDate}>Uploaded on {doc.uploadedOn}</p>
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
    </div>
  );
};

export default KycDocuments;

'use client';
import ProtectedRoute from '@/Components/protectedRoute';
import React, { useEffect, useState } from 'react';
import { useSiteSettings } from '@/Components/mycontext/siteSettingContext';
import { getKycDocuments } from '@/services/document.service';
import { NEXT_PUBLIC_API_URL, LARAVEL_API_BASE_URL, LARAVEL_APPLICATION_PASSWORD, APP_TYPE } from "@/lib/config";
import { 
  Box, Typography, CircularProgress, Card, CardContent, 
  CardActions, Button, Grid, Chip, Divider 
} from '@mui/material';
import { 
  FaFileAlt, FaEye, FaCheckCircle, FaTimesCircle, FaClock, 
  FaTimes, FaShieldAlt, FaSearchPlus, FaSearchMinus, FaDownload 
} from 'react-icons/fa';

import kycStyles from '@/app/auth/user/dashboard/edit-profile/components/KycDocuments/KycDocuments.module.css';

const DocumentPage = () => {
  const { token } = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [meta, setMeta] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentViewDocUrl, setCurrentViewDocUrl] = useState(null);
  const [currentViewDocType, setCurrentViewDocType] = useState(null);
  const [currentViewDoc, setCurrentViewDoc] = useState(null);
  const [docLoading, setDocLoading] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await getKycDocuments(token, 20, 1);
        const data = await res.json();
        console.log("KYC API Response:", data);
        if (data?.status && data?.data) {
          const actualDocs = Array.isArray(data.data) ? data.data : (data.data.data || []);
          setDocs(actualDocs);
        } else {
          setDocs([]);
        }
      } catch (error) {
        console.error("Failed to fetch documents", error);
        setDocs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [token]);

  const handleView = async (doc) => {
    if (!doc) return;
    setCurrentViewDoc(doc);
    const url = doc.private_file_endpoint ? `${getBaseUrl()}${doc.private_file_endpoint}` : (doc.file_path || doc.url || doc.document_url);
    if (!url) return;
    
    try {
      setDocLoading(true);
      setViewModalOpen(true);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
          "X-App-Type": APP_TYPE
        }
      });
      if (res.ok) {
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        setCurrentViewDocUrl(objectUrl);
        setCurrentViewDocType(blob.type);
      } else {
        console.error("Failed to load document");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDocLoading(false);
    }
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    if (currentViewDocUrl) {
      URL.revokeObjectURL(currentViewDocUrl);
    }
    setCurrentViewDocUrl(null);
    setCurrentViewDocType(null);
    setCurrentViewDoc(null);
  };

  const getBaseUrl = () => {
    const url = NEXT_PUBLIC_API_URL || LARAVEL_API_BASE_URL;
    return (url && url.trim() !== '') ? url.replace(/\/$/, "") : "https://api.holiplaces.com";
  };

  const getStatusChip = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'approved' || s === 'verified') {
      return <Chip icon={<FaCheckCircle />} label="Approved" size="small" color="success" />;
    }
    if (s === 'rejected') {
      return <Chip icon={<FaTimesCircle />} label="Rejected" size="small" color="error" />;
    }
    return <Chip icon={<FaClock />} label="Pending" size="small" color="warning" sx={{ backgroundColor: '#fff7ed', color: '#ea580c', '& .MuiChip-icon': { color: '#ea580c' } }} />;
  };

  return (
    <ProtectedRoute>
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: 'var(--Gray-800)' }}>
          My Documents
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--Gray-500)', mb: 4 }}>
          Manage and view all your uploaded KYC documents.
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'var(--Orange-500)' }} />
          </Box>
        ) : docs.length > 0 ? (
          <Grid container spacing={3}>
            {docs.map((doc, idx) => {
              const docName = doc.document_type || doc.file_original_name || 'Untitled Document';
              return (
                <Grid item xs={12} sm={6} md={4} key={doc.id || idx}>
                  <Card sx={{ 
                    borderRadius: 3, 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid #f1f5f9',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ 
                          width: 48, 
                          height: 48, 
                          borderRadius: '12px', 
                          backgroundColor: '#fff7ed', 
                          color: 'var(--Orange-500)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px'
                        }}>
                          <FaFileAlt />
                        </Box>
                        {getStatusChip(doc.status)}
                      </Box>
                      
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', mb: 0.5, textTransform: 'capitalize' }}>
                        {docName.replace(/_/g, ' ')}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        Uploaded on: {doc.uploaded_at || doc.created_at ? new Date(doc.uploaded_at || doc.created_at).toLocaleDateString() : 'N/A'}
                        {doc.file_size_human && ` • Size: ${doc.file_size_human}`}
                      </Typography>
                    </CardContent>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: 'flex-end' }}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<FaEye />}
                        onClick={() => handleView(doc)}
                        sx={{ 
                          borderColor: 'var(--Gray-300)', 
                          color: 'var(--Gray-700)',
                          textTransform: 'none',
                          fontWeight: 500,
                          borderRadius: '8px',
                          '&:hover': {
                            backgroundColor: '#f8fafc',
                            borderColor: 'var(--Gray-400)'
                          }
                        }}
                      >
                        View Document
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            backgroundColor: '#f8fafc', 
            borderRadius: 3,
            border: '1px dashed #cbd5e1'
          }}>
            <Box sx={{ 
              width: 64, 
              height: 64, 
              borderRadius: '50%', 
              backgroundColor: '#e2e8f0', 
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto',
              mb: 2
            }}>
              <FaFileAlt />
            </Box>
            <Typography variant="h6" sx={{ color: 'var(--Gray-700)', fontWeight: 500, mt: 2 }}>
              No documents found
            </Typography>
          </Box>
        )}
      </Box>

      {/* Custom Document View Modal matching KycDocuments */}
      {viewModalOpen && currentViewDoc && (
        <div className={kycStyles.modalOverlay} onClick={handleCloseViewModal}>
          <div className={kycStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={kycStyles.viewerHeader}>
              <div className={kycStyles.headerLeft}>
                <div className={kycStyles.viewerTitleRow}>
                  <h3 style={{ textTransform: 'capitalize' }}>{(currentViewDoc.document_type || currentViewDoc.file_original_name || 'Document').replace(/_/g, ' ')}</h3>
                  {getStatusChip(currentViewDoc.status)}
                </div>
                <div className={kycStyles.viewerMetaRow}>
                  Uploaded on {currentViewDoc.uploaded_at || currentViewDoc.created_at ? new Date(currentViewDoc.uploaded_at || currentViewDoc.created_at).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              <button className={kycStyles.closeBtn} onClick={handleCloseViewModal}>
                <FaTimes />
              </button>
            </div>

            <div className={kycStyles.viewerContainer}>
              <div className={kycStyles.viewerToolbar}>
                <div className={kycStyles.toolbarLeft}>
                  <button className={kycStyles.toolbarBtn}><FaSearchMinus /></button>
                  <span className={kycStyles.toolbarText}>100% v</span>
                  <button className={kycStyles.toolbarBtn}><FaSearchPlus /></button>
                </div>
                <div className={kycStyles.toolbarRight}>
                  <button className={kycStyles.toolbarBtn} onClick={() => {
                     if (!currentViewDocUrl) return;
                     const a = document.createElement("a");
                     a.href = currentViewDocUrl;
                     a.download = currentViewDoc.file_original_name || "document";
                     a.click();
                  }}>
                    <FaDownload /> Download
                  </button>
                </div>
              </div>

              <div className={kycStyles.viewerBody}>
                <div className={kycStyles.viewerSidebar}>
                  <div className={kycStyles.thumbnailWrapper}>
                    <div className={`${kycStyles.thumbnail} ${kycStyles.active}`}>
                      {docLoading ? (
                        <CircularProgress size={20} />
                      ) : currentViewDocType?.includes('pdf') ? (
                        'PDF'
                      ) : (
                        <img src={currentViewDocUrl} alt="Thumb" style={{width:'100%',height:'100%',objectFit:'cover', borderRadius: '4px'}}/>
                      )}
                    </div>
                    <span className={kycStyles.thumbnailNumber}>1</span>
                  </div>
                </div>

                <div className={kycStyles.viewerMain}>
                  <div className={kycStyles.previewImage} style={{ padding: 0, height: '100%', background: 'transparent', boxShadow: 'none' }}>
                    {docLoading ? (
                      <CircularProgress sx={{ color: '#ea580c' }} />
                    ) : (
                      currentViewDocType?.includes('pdf') ? (
                        <iframe src={currentViewDocUrl} style={{ width: "100%", height: "100%", border: "none", borderRadius: "12px", background: '#fff' }} />
                      ) : (
                        <img src={currentViewDocUrl} alt="Document Preview" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "12px", background: '#fff', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }} />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={kycStyles.securityBanner}>
              <FaShieldAlt className={kycStyles.securityBannerIcon} />
              <p>This document is securely stored and encrypted. Your information is safe with us.</p>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default DocumentPage;

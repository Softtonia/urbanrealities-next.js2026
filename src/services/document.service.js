import { LARAVEL_API_BASE_URL, NEXT_PUBLIC_API_URL, LARAVEL_APPLICATION_PASSWORD, APP_TYPE } from "@/lib/config";

const getBaseUrl = () => {
    const url = NEXT_PUBLIC_API_URL || LARAVEL_API_BASE_URL;
    return (url && url.trim() !== '') ? url.replace(/\/$/, "") : "https://api.holiplaces.com";
};

export const uploadDocument = async (token, formData) => {
    return await fetch(getBaseUrl() + "/api/auth/profile/documents/file", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        },
        body: formData
    });
};

export const checkUploadProgress = async (token, uploadId) => {
    return await fetch(getBaseUrl() + `/api/auth/profile/documents/progress/${uploadId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        }
    });
};

export const startKycUpload = async (token, formData) => {
    return await fetch(getBaseUrl() + "/api/kyc/uploads/start", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        },
        body: formData
    });
};

export const checkKycUploadProgress = async (token, uploadId) => {
    return await fetch(getBaseUrl() + `/api/kyc/uploads/${uploadId}/progress`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        }
    });
};

export const submitKyc = async (token, uploadId) => {
    return await fetch(getBaseUrl() + "/api/kyc/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        },
        body: JSON.stringify({ upload_id: uploadId, declaration: true })
    });
};

export const getKycDocuments = async (token) => {
    return await fetch(getBaseUrl() + "/api/kyc/documents", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        }
    });
};

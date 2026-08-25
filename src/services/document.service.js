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
            "Accept": "application/json",
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

export const submitKyc = async (token, uploadId, payloadData) => {
    const data = typeof payloadData === 'object' && payloadData !== null 
        ? payloadData 
        : { aadhaar_number: payloadData };

    return await fetch(getBaseUrl() + "/api/kyc/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        },
        body: JSON.stringify({ upload_id: uploadId, declaration: true, ...data })
    });
};

export const resubmitKyc = async (token, uploadId, payloadData) => {
    const data = typeof payloadData === 'object' && payloadData !== null 
        ? payloadData 
        : { aadhaar_number: payloadData };

    return await fetch(getBaseUrl() + "/api/kyc/resubmit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        },
        body: JSON.stringify({ upload_id: uploadId, declaration: true, ...data })
    });
};

export const getKycDocuments = async (token, perPage = 20, page = 1) => {
    return await fetch(getBaseUrl() + `/api/kyc/documents?per_page=${perPage}&page=${page}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        }
    });
};

export const getKycStatus = async (token) => {
    return await fetch(getBaseUrl() + "/api/kyc/status", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        }
    });
};

export const getKycDetails = async (token) => {
    return await fetch(getBaseUrl() + "/api/kyc/details", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        }
    });
};


import { LARAVEL_API_BASE_URL, LARAVEL_APPLICATION_PASSWORD, APP_TYPE } from "@/lib/config";

export const uploadDocument = async (token, formData) => {
    return await fetch(LARAVEL_API_BASE_URL + "/api/auth/profile/documents/file", {
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
    return await fetch(LARAVEL_API_BASE_URL + `/api/auth/profile/documents/progress/${uploadId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE
        }
    });
};

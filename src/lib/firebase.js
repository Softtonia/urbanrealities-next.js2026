import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig, vapidKey } from "./firebaseConfig";
import { LARAVEL_API_BASE_URL } from "./config";

const app = initializeApp(firebaseConfig);

// Initialize messaging only on the client side (window check for Next.js)
let messaging = null;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export async function getUserFcmToken() {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: vapidKey,
    });

    console.log("FCM TOKEN:", token);
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
}

export async function sendFcmTokenToServer(token, platformData = {}) {
  try {
    const payload = {
      fcm_token: token,
      platform: "web",
      app_type: "frontend",
      device_id: platformData.device_id, // Replace with logic to generate/fetch UUID
      device_name: platformData.device_name || "Web Browser",
      browser: platformData.browser || "Unknown",
      os: platformData.os || "Unknown",
    };

    const response = await fetch(
      `${LARAVEL_API_BASE_URL}/public/api/notifications/devices/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();
    console.log("Token sent to server successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending FCM token to server:", error);
  }
}

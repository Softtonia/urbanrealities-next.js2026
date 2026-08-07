import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig, vapidKey } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);

// Initialize messaging only on the client side (window check for Next.js)
let messaging = null;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export async function requestFcmToken() {
  if (typeof window === "undefined") return null;

  if (!("serviceWorker" in navigator)) {
    console.log("Service worker not supported");
    return null;
  }

  try {
    await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey,
    });

    console.log("FCM TOKEN:", token);

    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
}

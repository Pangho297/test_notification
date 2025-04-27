import { getMessaging, getToken, onMessage } from "@firebase/messaging";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const registerServiceWorker = async () => {
  try {
    if (!("serviceWorker" in navigator)) {
      throw new Error("Service Worker를 지원하지 않는 브라우저 입니다");
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      {
        scope: "/",
      }
    );

    await new Promise((resolve) => {
      if (registration.active) {
        resolve(registration);
      } else {
        registration.addEventListener("activate", () => resolve(registration));
      }
    });

    console.log("Service Worker 등록 성공", registration);
    return registration;
  } catch (error) {
    console.error("Service Worker 등록 실패", error);
    throw error;
  }
};

export const requestNotificationPermission = async () => {
  try {
    const registration = await registerServiceWorker();

    if (!registration.active) {
      await new Promise((resolve) => {
        registration.addEventListener("activate", () => resolve(registration));
      });
    }

    registration.active?.postMessage({
      type: "FIREBASE_CONFIG",
      config: firebaseConfig,
    });

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });
    }

    return null;
  } catch (error) {
    console.error("Permission Denied", error);
    return null;
  }
};

export const setupMessageHandler = () => {
  onMessage(messaging, (payload) => {
    console.log("메시지 수신: ", payload);

    if (Notification.permission === "granted") {
      new Notification(payload.notification?.title || "", {
        body: payload.notification?.body,
        icon: "/icon.png",
        badge: "/badge.png",
        data: payload.data,
        silent: false,
      });
    }
  });
};

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

self.addEventListener("install", () => {
  self.skipWaiting();
})

self.addEventListener("activate", (event) => {
  console.log("FCM SW Activate");
  event.waitUntil(clients.claim())
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === "FIREBASE_CONFIG") {
    const firebaseConfig = event.data.config;
    firebase.initializeApp(firebaseConfig)
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      console.log("백그라운드 메시지 수신: ", payload)
      const notificationTitle = payload.notification?.title || "새로운 알림";
      const notificationOptions = {
        body: payload.notification?.body,
        data: payload.data,
        silent: false,
        actions: [
          {
            action: "open",
            title: 열기
          }
        ]
      }

      self.registration.showNotification(notificationTitle, notificationOptions)
    })
  }
})

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  }
});
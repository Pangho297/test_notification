import axios from "axios";

import { useEffect } from "react";
import { requestNotificationPermission } from "../lib/firebase";

export default function NotificationProvider() {
  useEffect(() => {
    saveNotificationTokenToServer();
  }, []);

  const saveNotificationTokenToServer = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        await axios.post(
          "http://localhost:3000/notification/save-token",
          {
            token,
            // deviceId 웹의 경우 uuid로 생성해서 주는 경우가 대부분이며 이렇게 생성한 uuid를 로컬 저장소에 넣어 사용한다고함
            // 다만 이 경우 위변조가 가능해 실제로는 PC Web 환경에서 deviceId를 얻는 것은 불가능함
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Failed to Save FCM Token", error);
    }
  };

  return null;
}

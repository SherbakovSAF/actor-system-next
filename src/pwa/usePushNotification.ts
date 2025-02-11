import {
  createSubscribeService,
  deleteSubscribeService,
  getSubscribeService,
} from "@/services/notification.service";
import { useState, useEffect } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function usePushNotification() {
  const [isSupported, setIsSupported] = useState(false); // МБ это не надо
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();

    if (!sub) return;

    getSubscribeService(sub.endpoint)
      .then(() => setSubscription(sub))
      .catch(() => unsubscribeFromPushClient(sub));
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    try {
      await createSubscribeService(sub);
      setSubscription(sub);
    } catch {
      sub.unsubscribe();
    }
  }

  async function unsubscribeFromPush() {
    if (!subscription) return;
    const result = await deleteSubscribeService(subscription).catch(() => null);
    if (result) unsubscribeFromPushClient(subscription);
  }

  const unsubscribeFromPushClient = async (sub: PushSubscription) => {
    await sub.unsubscribe();
    setSubscription(null);
  };

  return {
    isSupported,
    subscription,

    subscribeToPush,
    unsubscribeFromPush,
  };
}

export default usePushNotification;

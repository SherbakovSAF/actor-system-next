import { ResponseConstants_T } from "@/lib/handler-response.lib";
import { callApi } from "@/services/base.service";

export const createSubscribeService = (data: PushSubscription) => {
  try {
    return callApi("POST", "notification", data);
  } catch {
    alert("не удалось создать съёмку");
    throw new Error("не удалось создать съёмку");
  }
};

export const getSubscribeService = (endpoint: PushSubscription["endpoint"]) => {
  try {
    return callApi("GET", "notification", null, { endpoint });
  } catch {
    throw new Error("не удалось создать съёмку");
  }
};

export const deleteSubscribeService = async (data: PushSubscription) => {
  try {
    await callApi("DELETE", "notification", data);
  } catch (error: unknown) {
    return error as ResponseConstants_T;
  }
};

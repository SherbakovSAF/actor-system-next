import * as jose from "jose";
import { HandlerResponse } from "@/lib/handler-response.lib";

export const createJWTToken = async (
  payload: Record<string, unknown>,
  exp = "1h"
): Promise<string> => {
  try {
    const secret = jose.base64url.decode(process.env.JWT_SECRET_KEY!);

    return new jose.EncryptJWT(payload)
      .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
      .setExpirationTime(exp)
      .encrypt(secret);
  } catch (error) {
    throw new Error(HandlerResponse.const("BAD_REQUEST"), { cause: error });
  }
};

// При истечении срока действия будет срабатывать catch
export const getPayloadJWTToken = async (
  token: string
): Promise<jose.JWTPayload | null> => {
  try {
    const secret = jose.base64url.decode(process.env.JWT_SECRET_KEY!);
    const { payload } = await jose.jwtDecrypt(token, secret);
    return payload;
  } catch {
    return null;
  }
};

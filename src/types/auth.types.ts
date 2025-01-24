import { User_M } from "@prisma/client";

export type AuthSignUpUser_T = Pick<User_M, "nickName" | "mail" | "password">;
export type AuthSingInUser_T = Omit<AuthSignUpUser_T, "mail">;

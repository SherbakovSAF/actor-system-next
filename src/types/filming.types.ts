import { User_I } from "@/types/user.types";

export interface Filming_I {
  id: number;
  title: string;
  dateStart: string;
}

export interface Filming_DTO {
  users: User_I[];
  filming: Filming_I;
}

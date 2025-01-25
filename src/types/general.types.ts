export interface ParamsRoute_I {
  params: Promise<{ slug: string }>;
}

export type Pos_T = "top" | "bottom" | "left" | "right";
export type PosDetail_T =
  | Pos_T
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

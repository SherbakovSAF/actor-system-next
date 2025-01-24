export type ResponseConstants_T =
  | "NOT_FOUND"
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "OK"
  | "CREATED";

export class HandlerResponse<T = unknown> {
  private constResponse: ResponseConstants_T;
  private defaultError?: T;
  private status: number;

  private statusMap(constResponse: ResponseConstants_T): number {
    switch (constResponse) {
      case "OK":
        return 200;
      case "CREATED":
        return 201;
      case "UNAUTHORIZED":
        return 401;
      case "FORBIDDEN":
        return 403;
      case "NOT_FOUND":
        return 404;
      case "BAD_REQUEST":
        return 400;
      default:
        return 500;
    }
  }

  constructor(constResponse: ResponseConstants_T, defaultError?: T) {
    this.constResponse = constResponse;
    this.defaultError = defaultError;
    this.status = this.statusMap(constResponse);
  }

  private getObject() {
    return {
      constResponse: this.constResponse,
      defaultError: this.defaultError,
      status: this.status,
    };
  }

  public static const(constResponse: ResponseConstants_T) {
    return constResponse;
  }

  public static object(constResponse: ResponseConstants_T) {
    return new HandlerResponse(constResponse).getObject();
  }

  public static nextResponse<T = unknown>(
    constResponse: ResponseConstants_T,
    defaultError?: T
  ): [
    { constResponse: ResponseConstants_T; defaultError: T | null },
    { status: number }
  ] {
    const { status } = new HandlerResponse(
      constResponse,
      defaultError
    ).getObject();

    return [{ constResponse, defaultError: defaultError ?? null }, { status }];
  }
}

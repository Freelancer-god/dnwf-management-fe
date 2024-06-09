export class ApiError extends Error {
  constructor(
    message: string = "Unknown error",
    public data?: any,
  ) {
    console.log("🚀 ~ Debugging::: ApiError ~ backend response:", data);
    super(message);
    this.name = "ApiError";
  }
}

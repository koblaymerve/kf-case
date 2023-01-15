export class ServiceClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: number,
    public readonly statusText: string,    
    public readonly data: any,
  ) {
    super(statusText);
  }
}

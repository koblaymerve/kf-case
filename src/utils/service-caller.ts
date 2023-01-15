import axios, { Method } from 'axios';
import { ServiceClientError } from '../exceptions/service-client-error.exception';
import axiosRetry from 'axios-retry';

export abstract class AbstractServiceClient {
  protected constructor(protected readonly baseUrl: string) {}

  returnError(
    code: number,
    status?: number,
    statusText?: string,
    data?: unknown,
  ): ServiceClientError {
    const error = new ServiceClientError(status, code, statusText, data);
    return error;
  }

  async request(
    method: Method,
    path: string,
    data = {},
    headers = {},
  ): Promise<unknown> {
    const url = `${this.baseUrl}${path}`;
    try {
      const request = {
        method: method,
        url,
        headers,
      };

      if (Object.keys(data).length) {
        request['data'] = data;
      }

      axiosRetry(axios, { retries: 3 });

      const result = await axios(request);
      return result;
    } catch (requestError: any) {
      console.log('request error', requestError.code);

      return this.returnError(
        requestError.code,
        requestError.response?.status,
        requestError.response?.statusText,
      );
    }
  }
}

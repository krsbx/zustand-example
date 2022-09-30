import type {
  AxiosRequestConfig as OriginalAxiosRequestConfig,
  AxiosRequestHeaders as OriginalAxiosRequestHeaders,
} from 'axios';
import type { ResourceName } from './resources';

declare module 'axios' {
  interface AxiosRequestHeaders extends OriginalAxiosRequestHeaders {
    Authorization: string;
    resourceName: ResourceName;
    overwrite: boolean;
  }

  interface AxiosInstance {
    config?: {
      headers?: AxiosRequestHeaders;
    };
  }

  interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
    headers?: AxiosRequestHeaders;
    resourceName?: ResourceName;
    overwrite?: boolean;
  }
}

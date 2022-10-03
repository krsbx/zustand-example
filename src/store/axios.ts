import _ from 'lodash';
import axios, { AxiosInstance } from 'axios';
import { dispatchResource } from './reducers/resources';
import * as cookieUtils from '../utils/cookieUtils';
import type { ResourceName } from '../types/resources';
import { overwriteResource, setResource, updateResource } from './actions/resources';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const applyInterceptors = () => {
  instance.interceptors.request.use(
    (config) => {
      const token = cookieUtils.getToken();

      if (config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';

        if (_.isString(config.headers.resourceName))
          config.resourceName = <ResourceName>config.headers.resourceName;

        if (_.isBoolean(config.headers.overwrite)) config.overwrite = config.headers.overwrite;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  instance.interceptors.response.use((res) => {
    const { config, data } = res;

    if (!config.resourceName) return res;

    if (config.overwrite) {
      dispatchResource(config.resourceName, overwriteResource(config.resourceName, data));
    } else if (config.method === 'patch') {
      dispatchResource(
        config.resourceName,
        updateResource(config.resourceName, { id: data.id, data })
      );
    } else {
      dispatchResource(config.resourceName, setResource(config.resourceName, data));
    }

    return res;
  });
};

export default instance;

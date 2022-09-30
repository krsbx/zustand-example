import _ from 'lodash';
import axios, { AxiosInstance } from 'axios';
import * as cookieUtils from '../utils/cookieUtils';
import resources from './reducers/resources';
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

    const { dispatch } = resources[config.resourceName].getState<typeof config.resourceName>();

    if (config.overwrite) {
      dispatch(overwriteResource(config.resourceName, data));
    } else if (config.method === 'patch') {
      dispatch(updateResource(config.resourceName, { id: data.id, data }));
    } else {
      dispatch(setResource(config.resourceName, data));
    }

    return res;
  });
};

export default instance;

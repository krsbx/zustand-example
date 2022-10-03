import axios from '../axios';
import type { Payload, Payloads, ResourceMap, ResourceName } from '../../types/resources';
import { dispatchResource } from '../reducers/resources';

export const setResource = <T extends ResourceName>(
  resourceName: T,
  data: Payload<ResourceMap[T]>
) => ({
  type: `resources.${resourceName}.set`,
  data,
});

export const updateResource = <T extends ResourceName>(
  resourceName: T,
  data: Payload<ResourceMap[T]>
) => ({
  type: `resources.${resourceName}.update`,
  data, // { id, data }
});

export const overwriteResource = <T extends ResourceName>(resourceName: T, data: Payloads<T>) => ({
  type: `resources.${resourceName}.overwrite`,
  data,
});

export const deleteResource = <T extends ResourceName>(resourceName: T, data: number) => ({
  type: `resources.${resourceName}.delete`,
  data, // id
});

export const getAllData = async <T extends ResourceName>(
  resourceName: T,
  query = '',
  overwrite = true
) => {
  const { data } = await axios.get<ResourceMap[T][]>(`/${resourceName}?${query}`, {
    headers: {
      resourceName,
      overwrite,
    },
  });

  return data;
};

export const getDataById = async <T extends ResourceName>(
  resourceName: T,
  id: number | string,
  query = '',
  overwrite = false
) => {
  const { data } = await axios.get<ResourceMap[T]>(`/${resourceName}/${id}?${query}`, {
    headers: {
      resourceName,
      overwrite,
    },
  });

  return data;
};

export const addData = async <T extends ResourceName>(resourceName: T, payload: unknown) => {
  const { data } = await axios.post<ResourceMap[T]>(`/${resourceName}`, payload, {
    headers: {
      resourceName,
    },
  });

  dispatchResource(
    resourceName,
    updateResource(resourceName, {
      id: data.id,
      data,
    })
  );

  return data;
};

export const updateData =
  <T extends ResourceName>(resourceName: T) =>
  async (id: number, update: unknown, query = '') => {
    const { data } = await axios.patch<ResourceMap[T]>(`/${resourceName}/${id}?${query}`, update, {
      headers: {
        resourceName,
      },
    });

    return data;
  };

export const deleteData = async <T extends ResourceName>(resourceName: T, id: number) => {
  await axios.delete(`/${resourceName}/${id}`);

  dispatchResource(resourceName, deleteResource(resourceName, id));
};

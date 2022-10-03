import resources from '../reducers/resources';
import type { ResourceMap, ResourceName } from '../../types/resources';

export const getResources = <T extends ResourceName>(resourceName: T) =>
  resources((state) => state[resourceName]);

export const getResourceById = <T extends ResourceName>(resourceName: T, id: number) =>
  getResources(resourceName).rows[id] as ResourceMap[T];

export const getResourceTotal = <T extends ResourceName>(resourceName: T) =>
  getResources(resourceName).count ?? 0;

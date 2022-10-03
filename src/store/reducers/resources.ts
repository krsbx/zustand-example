import _ from 'lodash';
import create from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import type {
  Action,
  ResourceMap,
  ResourceName,
  ResourceReducer,
  ResourceStructure,
} from '../../types/resources';
import { RESOURCE_NAME } from '../../utils/constants/resources';
import { hasOwnProperty } from '../../utils/property';

const defaultState = {
  rows: {},
  count: 0,
};

const reducer =
  <T extends ResourceName, K extends ResourceMap[T]>(resourceName: T) =>
  (state: ResourceStructure<T> = defaultState, action: Action<T, K>): ResourceStructure<T> => {
    let temp: ResourceStructure<T> = defaultState;

    switch (action.type) {
      case `resources.${resourceName}.set`:
        if (!hasOwnProperty(action.data, 'rows') || _.isNumber(action.data)) return state;

        // eslint-disable-next-line no-case-declarations
        const data = _.isArray(action.data.rows) ? action.data.rows : [action.data.rows];

        return {
          ...state,
          rows: {
            ...state.rows,
            ..._.keyBy(data, 'id'),
          },
        };

      case `resources.${resourceName}.update`:
        if (hasOwnProperty(action.data, 'rows') || _.isNumber(action.data)) return state;

        return {
          ...state,
          rows: {
            ...state.rows,
            [action.data.id]: {
              ...state.rows[action.data.id],
              ...action.data.data,
            },
          },
        };

      case `resources.${resourceName}.delete`:
        if (!_.isNumber(action.data)) return state;

        temp = _.cloneDeep(state);

        delete temp.rows[action.data];
        return temp;

      case `resources.${resourceName}.overwrite`:
        if (
          !hasOwnProperty(action.data, 'rows') ||
          !hasOwnProperty(action.data, 'count') ||
          _.isNumber(action.data)
        )
          return state;

        // eslint-disable-next-line no-case-declarations
        const data1 = _.isArray(action.data.rows) ? action.data.rows : [action.data.rows];

        return {
          rows: _.keyBy(data1, 'id'),
          count: action.data.count as number,
        };

      default:
        return state;
    }
  };

const resources = create<ResourceReducer>()(
  devtools(
    subscribeWithSelector((set) => ({
      // We setup the global resources
      [RESOURCE_NAME.COMMENT]: defaultState,
      [RESOURCE_NAME.POST]: defaultState,
      [RESOURCE_NAME.USER]: defaultState,

      // We create our own dispatch for this global resources
      dispatch: (resourceName, action) =>
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const resource = reducer(resourceName)(state[resourceName], action);

          return {
            ...state,
            [resourceName]: resource,
          };
        }),
    }))
  )
);

export const { dispatch: dispatchResource } = resources.getState();

export default resources;

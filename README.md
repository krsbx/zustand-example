# Zustand Example

This is a working example of Zustand with a global `store`. The `store` in this examples are populated by getting data from [`adu-nasib api`](http://103.186.1.243:3001/api-docs/).

# Folder Structures

`/src` → contains all of our source code
`/src/components` → contains all of our react components.
`/src/store` → contains all of our `zustand` things.
`/src/types` → contains all of our `types` definitions (\*.d.ts).
`src/utils` → contains all of our `utility` things.

# Applying Interceptors

We can just import the `applyInterceptors` in our `main.tsx` (if you're using React + Vite) | `_app.tsx` (if you're using Next) | `index.tsx` (if you're using React) then call it if you want to modified some things on the go.

```ts
// All the rest of your cool imports
import { applyInterceptors } from './store/axios';

// Just call the functions
applyInterceptors();

// All the components things...
```

or, if you doesn't want to modified the interceptors, just remove the functions in `axios.ts`

```diff

# Remove the applyInterceptors functions in line around 12
- 12| export const applyInterceptors = () => {

# Don't forget to remove the rest of the functions in line around 49
- 49 | };

```

# Selectors

Since this example use a redux approach, so we have a selectors in `src/store/selectors/*`.

To use the `selectors` just call the functions in `.ts` files in `src/store/selectors`.

Or you can just use the zustand store to get the state by using the `getState` functions or `selecting` it from the store itself.

```ts
// First approach
import { getResources } from './store/selectors/resources';

// In side the components
const posts = getResources(RESOURCE_NAME.POST);

// Second approach
import resources from './store/reducers/resources';

const posts = resources.getState().post;

// Third approach
import resources from './store/reducers/resources';

// In side the components
const posts = resources((state) => posts.post);
```

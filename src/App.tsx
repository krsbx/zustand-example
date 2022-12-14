import { Flex, Stack } from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { useEffect } from 'react';
import { getAllData } from './store/actions/resources';
import resources from './store/reducers/resources';
import { getResources } from './store/selectors/resources';
import { RESOURCE_NAME } from './utils/constants/resources';
import './App.css';
import Post from './components/Post';
import { sortPostComment } from './utils/common';

function App() {
  // We can get the resource from our selectors
  const posts = getResources(RESOURCE_NAME.POST);

  // Or we can extract it like this
  // const posts = resources((state) => state.posts)

  // Or we can deconstruct it like this
  // const { posts } = resources.getState();

  // Subscribe to a changes in the store
  // with a shallow equality functions
  resources.subscribe(
    (state) => state.posts.rows,
    (current, prev) => {
      console.log('current : ', current);
      console.log('prev : ', prev);
    },
    {
      equalityFn: shallow,
    }
  );

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.POST);
    })();
  }, []);

  return (
    <Flex width={'100%'} direction={'column'} alignItems={'center'} p={3}>
      <Stack spacing={4}>
        {sortPostComment(posts.rows, 'desc').map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </Stack>
    </Flex>
  );
}

export default App;

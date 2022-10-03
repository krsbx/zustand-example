import React from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { ResourceMap } from '../types/resources';
import { RESOURCE_NAME } from '../utils/constants/resources';

const Post = ({ post }: Props) => {
  return (
    <ChakraLink
      _hover={{
        textDecoration: 'none',
      }}
      href={`/post/${post.id}`}
    >
      {post.content}
    </ChakraLink>
  );
};

type Props = {
  post: ResourceMap[typeof RESOURCE_NAME.POST];
};

export default Post;

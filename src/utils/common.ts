import _ from 'lodash';
import { Comment, Post, ResourceStructure } from '../types/resources';

type PostCommentSort = {
  Post: Post[] | ResourceStructure<'posts'>['rows'];
  Comment: Comment[] | ResourceStructure<'comments'>['rows'];
};

export const sortPostCommentByDate = {
  asc: (a: Post | Comment, b: Post | Comment): number => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return aDate.getTime() - bDate.getTime();
  },
  desc: (a: Post | Comment, b: Post | Comment): number => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return bDate.getTime() - aDate.getTime();
  },
};

export const sortPostComment = <T extends PostCommentSort['Post'] | PostCommentSort['Comment']>(
  postComment: T,
  sort: keyof typeof sortPostCommentByDate = 'asc'
) => {
  const arr = _.isArray(postComment) ? postComment : Object.values(postComment);

  return arr.sort(sortPostCommentByDate[sort]);
};

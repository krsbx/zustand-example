import { RESOURCE_NAME } from '../utils/constants/resources';

export type Profile = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  userId: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profile?: Profile;
  createdAt: string;
};

export type LikeDislike = {
  isLiked: boolean;
  isDisliked: boolean;
  likes: number;
  dislikes: number;
};

export type Post = LikeDislike & {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  replies: number;
  user?: User;
};

export type Comment = LikeDislike & {
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
};

export type ResourceMap = {
  [RESOURCE_NAME.USER]: User;
  [RESOURCE_NAME.POST]: Post;
  [RESOURCE_NAME.COMMENT]: Comment;
};

export type ResourceStructure<T extends ResourceName> = {
  rows: {
    [id: number]: ResourceMap[T];
  };
  count: number;
};

export type Resources = {
  [RESOURCE_NAME.USER]: ResourceStructure<typeof RESOURCE_NAME.USER>;
  [RESOURCE_NAME.POST]: ResourceStructure<typeof RESOURCE_NAME.POST>;
  [RESOURCE_NAME.COMMENT]: ResourceStructure<typeof RESOURCE_NAME.COMMENT>;
};

export type ResourceName = typeof RESOURCE_NAME[keyof typeof RESOURCE_NAME];

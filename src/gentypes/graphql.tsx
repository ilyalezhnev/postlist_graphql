import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: Post;
  deletePost: Scalars['Boolean'];
  updatePost: Post;
  signup: AuthPayload;
  login: AuthPayload;
};


export type MutationAddPostArgs = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
};


export type MutationSignupArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  author?: Maybe<User>;
  comments?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Query = {
  __typename?: 'Query';
  info: Scalars['String'];
  post: Post;
  posts: Array<Maybe<Post>>;
  postsCount: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SortRules>;
  filter?: Maybe<Scalars['String']>;
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortRules = {
  createdAt?: Maybe<Sort>;
  title?: Maybe<Sort>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newComment: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AddPostMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description' | 'comments'>
  ) }
);

export type SingupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SingupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type GetPostsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SortRules>;
  filter?: Maybe<Scalars['String']>;
}>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'postsCount'>
  & { posts: Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description'>
  )>> }
);

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description' | 'comments'>
  ) }
);

export type GetNewCommentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetNewCommentSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'newComment'>
);


export const AddPostDocument = gql`
    mutation AddPost($title: String, $description: String) {
  addPost(title: $title, description: $description) {
    id
  }
}
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: ID!, $title: String, $description: String, $comment: String) {
  updatePost(id: $id, title: $title, description: $description, comment: $comment) {
    id
    title
    description
    comments
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const SingupDocument = gql`
    mutation Singup($email: String!, $password: String!) {
  signup(email: $email, password: $password) {
    user {
      id
    }
    token
  }
}
    `;
export type SingupMutationFn = Apollo.MutationFunction<SingupMutation, SingupMutationVariables>;

/**
 * __useSingupMutation__
 *
 * To run a mutation, you first call `useSingupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singupMutation, { data, loading, error }] = useSingupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSingupMutation(baseOptions?: Apollo.MutationHookOptions<SingupMutation, SingupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SingupMutation, SingupMutationVariables>(SingupDocument, options);
      }
export type SingupMutationHookResult = ReturnType<typeof useSingupMutation>;
export type SingupMutationResult = Apollo.MutationResult<SingupMutation>;
export type SingupMutationOptions = Apollo.BaseMutationOptions<SingupMutation, SingupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetPostsDocument = gql`
    query GetPosts($limit: Int, $offset: Int, $orderBy: SortRules, $filter: String) {
  posts(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter) {
    id
    title
    description
  }
  postsCount
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($id: ID!) {
  post(id: $id) {
    id
    title
    description
    comments
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetNewCommentDocument = gql`
    subscription GetNewComment {
  newComment
}
    `;

/**
 * __useGetNewCommentSubscription__
 *
 * To run a query within a React component, call `useGetNewCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetNewCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewCommentSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetNewCommentSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetNewCommentSubscription, GetNewCommentSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetNewCommentSubscription, GetNewCommentSubscriptionVariables>(GetNewCommentDocument, options);
      }
export type GetNewCommentSubscriptionHookResult = ReturnType<typeof useGetNewCommentSubscription>;
export type GetNewCommentSubscriptionResult = Apollo.SubscriptionResult<GetNewCommentSubscription>;
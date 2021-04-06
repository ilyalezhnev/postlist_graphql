import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts(
    $limit: Int
    $offset: Int
    $orderBy: SortRules
    $filter: String
  ) {
    posts(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter) {
      id
      title
      description
    }
    postsCount
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      comments
    }
  }
`;

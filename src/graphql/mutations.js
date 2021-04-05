import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost($title: String, $description: String) {
    addPost(title: $title, description: $description) {
      id
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String
    $description: String
    $comment: String
  ) {
    updatePost(
      id: $id
      title: $title
      description: $description
      comment: $comment
    ) {
      id
      title
      description
      comments
    }
  }
`;

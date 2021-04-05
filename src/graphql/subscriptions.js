import { gql } from "@apollo/client";

export const NEW_COMMENT_SUBSCRIPTION = gql`
  subscription {
    newComment
  }
`;

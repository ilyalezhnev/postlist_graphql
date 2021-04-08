const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    info: String!
    post(id: ID!): Post
    posts(limit: Int, offset: Int, orderBy: SortRules, filter: String): [Post]
    postsCount: Int
  }

  type Mutation {
    addPost(title: String, description: String): Post
    deletePost(id: ID!): Boolean
    updatePost(
      id: ID!
      title: String
      description: String
      comment: String
    ): Post
    signup(email: String, password: String): AuthPayload
    login(email: String, password: String): AuthPayload
  }

  type Subscription {
    newComment: String
  }

  type Post {
    id: ID!
    title: String
    description: String
    author: User
    comments: [String]
  }

  type User {
    id: ID!
    email: String
    password: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  input SortRules {
    createdAt: Sort
    title: Sort
  }

  enum Sort {
    asc
    desc
  }
`;

module.exports = {
  typeDefs,
};

const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    info: String!
    post(id: ID!): Post
    posts(limit: Int, offset: Int, orderBy: SortRules, filter: String): [Post]
    postsCount: Int
  }

  type Post {
    id: ID!
    title: String
    description: String
    comments: [String]
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
  }

  input SortRules {
    createdAt: Sort
    title: Sort
  }

  enum Sort {
    asc
    desc
  }

  type Subscription {
    newComment: String
  }
`;

module.exports = {
  typeDefs,
};

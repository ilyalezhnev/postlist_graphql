const { ApolloServer, PubSub } = require("apollo-server");
const { postResolvers } = require("./src/graphql/resolvers");
const Subscription = require("./src/graphql/subscribers");
const { typeDefs } = require("./src/graphql/typeDefs");
const mongoose = require("mongoose");
const { getCurrentUserId } = require("./src/utils/utils");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.6py83.mongodb.net/postlist_mern_graphql?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

const pubsub = new PubSub();

const resolvers = {
  ...postResolvers,
  Subscription,
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const userId = getCurrentUserId(token);

    return {
      ...req,
      pubsub,
      userId,
    };
  },
});

apolloServer
  .listen()
  .then(({ url }) => console.log(`Server is running on ${url}`));

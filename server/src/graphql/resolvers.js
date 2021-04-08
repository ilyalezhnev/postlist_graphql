const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { PostModel } = require("../models/post");
const { UserModel } = require("../models/user");
require("dotenv").config();

const postResolvers = {
  Query: {
    info: () => "Hello world",
    post: async (parent, args, context, info) => {
      const post = await PostModel.findById({ _id: args.id });

      return post;
    },
    posts: async (parent, args, context, info) => {
      const { limit, offset, orderBy, filter } = args;
      const sortRules = orderBy ? orderBy : { createdAt: "desc", title: "asc" };
      const filterParams = filter
        ? {
            $or: [
              {
                title: new RegExp(filter, "i"),
                description: new RegExp(filter, "i"),
              },
            ],
          }
        : undefined;

      const posts = await PostModel.find(filterParams)
        .limit(limit)
        .skip(offset)
        .sort(sortRules);

      return posts;
    },
    postsCount: async () => {
      const postsCount = await PostModel.find().count();

      return postsCount;
    },
  },
  Mutation: {
    addPost: (parent, args, context, info) => {
      const newPost = new PostModel({
        title: args.title,
        description: args.description,
      });

      newPost.save((err, newPost) => {
        if (err) return console.error(err);
      });

      return newPost;
    },
    deletePost: async (parent, args, context, info) => {
      await PostModel.findByIdAndDelete({ _id: args.id }, (err, data) => {
        if (!err) {
          console.log("Post deleted");
        }
      });
    },
    updatePost: async (parent, args, context, info) => {
      const { id, title, description, comment } = args;

      const post = await PostModel.findByIdAndUpdate(
        { _id: id },
        {
          title,
          description,
        },
        (err, data) => {
          if (!err) {
            console.log("Post updated");
          }
        }
      );

      if (comment) {
        // workaround for avoid duplicates on comments array
        post.comments.push(comment);
        await post.save();
        context.pubsub.publish("NEW_COMMENT", comment);
      }

      return post;
    },
    signup: async (parent, args, context, info) => {
      const trimmedEmail = args.email.trim().toLowerCase();
      const hashedPassword = await bcrypt.hash(args.password, 10);

      const user = await UserModel.create({
        email: trimmedEmail,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return {
        user,
        token,
      };
    },
    login: async (parent, args, context, info) => {
      const user = await UserModel.findOne({ email: args.email });

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      const valid = await bcrypt.compare(args.password, user.password);

      if (!valid) {
        throw new AuthenticationError("Password is not correct");
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return {
        user,
        token,
      };
    },
  },
};

module.exports = {
  postResolvers,
};

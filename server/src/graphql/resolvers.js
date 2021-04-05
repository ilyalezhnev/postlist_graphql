const { PostModel } = require("../models/post");

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

      return await PostModel.findByIdAndUpdate(
        { _id: id },
        {
          title,
          description,
          $push: { comments: comment },
        },
        (err, data) => {
          if (!err) {
            if (comment) {
              context.pubsub.publish("NEW_COMMENT", comment);
            }

            console.log("Post updated");
          }
        }
      );
    },
  },
};

module.exports = {
  postResolvers,
};

function newCommentSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_COMMENT");
}

const newComment = {
  subscribe: newCommentSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

module.exports = {
  newComment,
};

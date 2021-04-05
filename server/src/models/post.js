const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    comments: [String],
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const PostModel = mongoose.model("Post", postSchema);

module.exports = {
  PostModel,
};

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, "email required"],
      unique: [true, "email already exists"],
    },
    password: { type: String, require: [true, "password required"] },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};

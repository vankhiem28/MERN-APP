import mongoose from "mongoose";

const Schame = mongoose.Schema;

const Post = new Schame(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
    url: { type: String },
    status: { type: String, enum: ["TO LEARN", "LEARNING", "LEARNED"] },
    user: { type: Schame.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", Post);

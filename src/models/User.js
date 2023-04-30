import mongoose from "mongoose";
import validator from "validator";
const Schame = mongoose.Schema;

const User = new Schame(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Email invalid",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length >= 10,
        message: "Password must be at least 10 characters",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", User);

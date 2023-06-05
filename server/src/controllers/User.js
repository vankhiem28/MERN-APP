import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import Exception from "../exceptions/Exception.js";
import User from "../models/User.js";

class UserController {
  // [POST] users/login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // check existing user
      const user = await User.findOne({ email });
      if (user) {
        // check correct password
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (isCorrectPassword) {
          // create jwt
          const token = jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: "1d" });
          // create refresh token
          // const refreshToken = jwt.sign({ data: user }, process.env.JWT_REFRESH_SECRET, {
          //   expiresIn: "10d",
          // });

          res.status(200).json({
            success: true,
            token: token,
            // refreshToken,
            user,
          });
        } else {
          throw new Exception("Password or Email is incorrect");
        }
      } else {
        throw new Exception("User not found");
      }
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  // [POST] users/register
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      // check existing user
      const user = await User.findOne({ email });
      if (!!user) throw new Exception("User is already registered");
      // validate password
      const isPasswordValid = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      });
      if (!isPasswordValid)
        throw new Exception(
          "Password must be at least 8 characters and contain only letters, numbers"
        );

      // hash password
      const hashPassword = await bcrypt.hash(password, 10);
      //   insert to db
      const data = {
        ...req.body,
        password: hashPassword,
      };
      const newUser = await User.create(data);
      res.status(201).json({
        success: true,
        user: {
          ...newUser,
          password: "Not Show",
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // [GET] /users/auth
  async auth(req, res, next) {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) res.status(400).json({ success: false, message: "User not found" });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  // [GET] /
  async show(req, res, next) {
    try {
      const getUser = await User.find();
      res.status(200).json({
        message: "Get users successfully",
        data: getUser,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new UserController();

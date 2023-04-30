import Exception from "../exceptions/Exception.js";
import User from "../models/User.js";

class UserController {
  // [POST] user/login
  async login(req, res, next) {
    res.json("login");
  }
  // [POST] user/register
  async register(req, res, next) {
    const { email, password } = req.body;
    try {
      // check existing user
      const user = await User.findOne({ email });
      if (!!user) throw new Exception("User is already registered");
      // hash password
      //   insert to db
      const newUser = await User.create(req.body);
      res.status(201).json({
        message: "registered successfully",
        data: newUser,
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

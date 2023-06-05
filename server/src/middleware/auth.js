import jwt from "jsonwebtoken";
import Exception from "../exceptions/Exception.js";

const auth = async (req, res, next) => {
  // bypass router [login,register]
  if (req.url === "/users/login" || req.url === "/users/register") {
    next();
    return;
  }
  // other routes
  const token = req?.headers?.authorization?.split(" ")[1];
  try {
    if (!token) {
      throw new Exception("No token provided");
    }

    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    // check jwt Isexpired
    // const isExpired = Date.now() >= jwtObject.exp * 1000;
    // if (isExpired) {
    //   throw new Exception("Token expired");
    // }
    req.userId = jwtObject?.data?._id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default auth;

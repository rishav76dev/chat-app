import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
  try {
    // Get token from cookies (or headers if you're using Authorization header)
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the decoded userId (make sure 'userId' exists in the JWT payload)
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);

    // Handle invalid token or other errors
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Invalid or Expired Token" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

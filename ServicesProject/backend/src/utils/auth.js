import jwt from "jsonwebtoken";
import { SignUpModel } from "../models/signUp.models.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await SignUpModel.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

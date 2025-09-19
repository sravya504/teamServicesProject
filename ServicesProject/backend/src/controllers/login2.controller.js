import {SignUpModel1} from "../models/Signmodel.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = asyncHandler(async (req, res) => {
  const { mobileNumber, password } = req.body;

  const user = await SignUpModel1.findOne({ mobileNumber });
  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "7d" }
  );

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        mobileNumber: user.mobileNumber,
        fullName: user.fullName,
        email: user.email
      },
      token
    }
  });
});

export { Login };


import { SignUpModel1 } from '../models/Signmodel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SignUp = asyncHandler(async (req, res) => {
  const { mobileNumber, password, fullName, email } = req.body;

  const existingUser = await SignUpModel1.findOne({ mobileNumber });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await SignUpModel1.create({
    mobileNumber,
    password: hashedPassword,
    fullName,
    email
  });

  // Create JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "7d" }
  );

  res.status(201).json({
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

export { SignUp };

import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { name, email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUs = await User.findOne({ email }).session(session);

    if (existingUs) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    const token = jwt.sign(
      { userId: users[0]._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    await session.commitTransaction();

    return res.status(201).json({
      message: "User created successfully",
      data: {
        token,
        user: users[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

const signIn = async(req,res,next)=>{
    const {email, password}= req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser= await User.findOne({email})
    if (!existingUser){
        res.status(404).json({
            message:"usre not registerd "
        })
    }

    else {
        const isPasswordCorrect = await bcrypt.compare(
  password,
 existingUser.password
);

if (!isPasswordCorrect) {
  return res.status(401).json({ message: "Invalid email or password" });
}


 const token = jwt.sign(
  { userId: existingUser._id }, // payload: information inside the token
  JWT_SECRET,                   // secret from your .env config
  { expiresIn: "1d" }           // token expires in 1 day
);


return res.status(200).json({
  message: "login successfully",
  data: {
    token,
    user_id: existingUser._id.toString(),
    user: {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email
    }
  }
});


    }
}

const signOut = async (req,res,next)=>{




}

export { signUp ,signIn };
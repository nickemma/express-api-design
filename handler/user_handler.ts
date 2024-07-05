import jwt, { Secret } from "jsonwebtoken";
import { Request, Response } from "express";
import crypto from "crypto";
import prisma from "../types/db";
import { comparePassword, hashedPassword } from "../types/authCheck";
import { sendPasswordResetEmail } from "../util/emailService";

/*
 * @desc    Generate a token
 * @access  Private
 */

const secretKey = process.env.JWT_SECRET;
const tokenExpiration = process.env.NODE_ENV === "development" ? "1d" : "7d";

const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    secretKey as Secret,
    {
      expiresIn: tokenExpiration,
    }
  );
};

/*
 * @desc    Generate a 6-digit OTP
 * @access  Private
 */

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/*
 * @route   POST users/signup
 * @desc    Register a new user
 * @access  Public
 */

export const createNewUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Create the new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await hashedPassword(password),
      },
    });

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/*
 * @route   POST users/signin
 * @desc    Login a user
 * @access  Public
 */

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }
    const isPasswordValid = await comparePassword(password, user?.password!);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    res.status(200).json({ token: generateToken(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/*
 * @route   POST users/update-password
 * @desc    Update user password
 * @access  Private
 */

export const updatePassword = async (req: Request, res: Response) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    // validations here
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please add old & new password" });
    }

    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Please enter correct password" });
    }

    const hashedNewPassword = await hashedPassword(newPassword);
    await prisma.user.update({
      where: { email },
      data: { password: hashedNewPassword },
    });

    res
      .status(200)
      .json({ message: "Password changed successfully, Please login" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/*
 * @route   POST users/forgot-password
 * @desc    Forgot password
 * @access  Public
 */

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresIn = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresIn,
      },
    });

    await sendPasswordResetEmail(email, token);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/*
 * @route   POST users/reset-password
 * @desc    Reset password
 * @access  Public
 */

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.expiresIn < new Date()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedNewPassword = await hashedPassword(newPassword);

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedNewPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { token },
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

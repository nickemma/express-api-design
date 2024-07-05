import jwt, { Secret } from "jsonwebtoken";
import { Request, Response } from "express";
import prisma from "../types/db";
import { comparePassword, hashedPassword } from "../types/authCheck";

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
 * @route   POST users/signup
 * @desc    Register a new user
 * @access  Public
 */

export const createNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Create the new user
    const user = await prisma.user.create({
      data: {
        username,
        password: await hashedPassword(password),
      },
    });

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/*
 * @route   POST users/signin
 * @desc    Login a user
 * @access  Public
 */

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
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
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/*
 * @route   POST users/update-password
 * @desc    Update user password
 * @access  Private
 */

export const updatePassword = async (req: Request, res: Response) => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
 // validations here
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please add old & new password' });
    }

    const isPasswordValid = await comparePassword(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Please enter correct password' });
    }

    const hashedNewPassword = await hashedPassword(newPassword);
    await prisma.user.update({
      where: { username },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({ message: 'Password changed successfully, Please login' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
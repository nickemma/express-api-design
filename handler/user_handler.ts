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
 * @route   POST api/users/signup
 * @desc    Register a new user
 * @access  Public
 */

export const createNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
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
    res.status(500).json({ error: "Server error" });
  }
};

/*
 * @route   POST api/users/signin
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

    const isPasswordValid = await comparePassword(password, user?.password!);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ token: generateToken(user) });
  } catch (error) {
     console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

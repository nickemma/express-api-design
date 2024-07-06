import { Request, Response } from "express";
import {AuthenticatedRequest} from "../types/types";
import prisma from "../types/db";

/*
 * @route   GET api/product
 * @desc    Get all products
 * @access  Private
 */

export const getAllProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
      include: {
        products: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ data: user.products });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   GET api/product/:id
 * @desc    Get a product by id
 * @access  Private
 */

export const getProductById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findFirst({
      where: {
        id,
        belongsToId: req.user?.id,
      },
    });
    res.json({ data: product });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   POST api/product
 * @desc    Create a new product
 * @access  Private
 */

export const createProduct = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const authReq = req as AuthenticatedRequest;

    if (!authReq.user || !authReq.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        belongsToId: authReq.user.id,
      },
    });
    res.status(201).json({ data: product });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   PUT api/product/:id
 * @desc    Update a product by id
 * @access  Private
 */

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updated = await prisma.product.update({
      where: {
        id,
        belongsToId: (req as AuthenticatedRequest).user?.id,
      },
      data: {
        name,
      },
    });
    res.json({ data: updated });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   DELETE api/product/:id
 * @desc    Delete a product by id
 * @access  Private
 */

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.product.delete({
      where: {
        id,
        belongsToId: (req as AuthenticatedRequest).user?.id,
      },
    });
    res.json({ data: deleted });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

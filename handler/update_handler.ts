import { Request, Response } from "express";
import {AuthenticatedRequest} from "../types/types";
import prisma from "../types/db";
import { StatusUpdate } from "@prisma/client";

/*
 * @route   GET api/update
 * @desc    Get all updates
 * @access  Private
 */

export const getUpdates = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user?.id,
      },
      include: {
        updates: true,
      },
    });

    type UpdateType = {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      title: string;
      body: string;
      status: StatusUpdate;
      version: string | null;
      asset: string | null;
      productId: string;
    };

    const updated = products.reduce((allUpdates: UpdateType[], product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    res.json({ data: updated});
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   GET api/update/:id
 * @desc    Get a update by id
 * @access  Private
 */

export const getUpdateById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;

  try {
    const update = await prisma.update.findUnique({
      where: {
        id,
      },
    });
    res.json({ data: update });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   POST api/update
 * @desc    Create a new update
 * @access  Private
 */

export const createUpdate = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId,
        }
    })

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const created = await prisma.update.create({
        data: req.body,
    });
    res.json({ data: created });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   PUT api/update/:id
 * @desc    Update a update by id
 * @access  Private
 */

export const updateUpdate = async (req: Request, res: Response) => {
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
 * @route   DELETE api/update/:id
 * @desc    Delete a update by id
 * @access  Private
 */

export const deleteUpdate = async (req: Request, res: Response) => {
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

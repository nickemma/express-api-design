import { Request, Response } from "express";
import {AuthenticatedRequest} from "../types/types";
import prisma from "../types/db";
import { StatusUpdate } from "@prisma/client";

/*
 * @route   GET api/updatepoint
 * @desc    Get all updates points
 * @access  Private
 */

export const getPoints = async (
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

    if (updated.length === 0) {
      return res.status(200).json({ message: "No updates found" });
    }
    
    res.json({ data: updated});
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   GET api/updatepoint/:id
 * @desc    Get a update point by id
 * @access  Private
 */

export const getPointById = async (
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

    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }

    res.json({ data: update });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   POST api/updatepoint
 * @desc    Create a new update point
 * @access  Private
 */

export const createPoint = async (req: Request, res: Response) => {
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
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}},
        }
    });
    res.json({ data: created, message: "Update Created successfully"});
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   PUT api/updatepoint/:id
 * @desc    Update a point by id
 * @access  Private
 */

export const updatePoint = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: {
       belongsToId: (req as AuthenticatedRequest).user?.id,
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

    const allUpdates = products.reduce((updates: UpdateType[], product) => {
      return [...updates, ...product.updates];
    }, []);

    const matchedUpdate  = allUpdates.find((update) => update.id === req.params.id);

    if(!matchedUpdate ) {
      return res.status(404).json({ message: "Update not found" });
    }
    
    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });
    res.json({ data: updatedUpdate, message: "Updated successfully"});
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/*
 * @route   DELETE api/updatepoint/:id
 * @desc    Delete a point by id
 * @access  Private
 */

export const deletePoint = async (req: Request, res: Response) => {
 try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: (req as AuthenticatedRequest).user?.id,
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

    const allUpdates = products.reduce((updates: UpdateType[], product) => {
      return [...updates, ...product.updates];
    }, []);

    const matchedUpdate  = allUpdates.find((update) => update.id === req.params.id);

    if(!matchedUpdate ) {
      return res.status(404).json({ message: "Update not found" });
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id,
        },
    });

    res.json({ data: deleted, message: "Deleted successfully"});

  } catch (error: any) {
    throw new Error(error.message);
  }
};

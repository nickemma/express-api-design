import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/errorHandler";
import { StatusUpdate } from "@prisma/client";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../handler/product_handler";
import { createUpdate, deleteUpdate, getUpdateById, getUpdates, updateUpdate } from "../handler/update_handler";

const router = Router();

/**
 * GET /api/product
 * GET /api/product/:id
 * POST /api/product
 * PUT /api/product/:id
 * DELETE /api/product/:id
 **/

router.get("/product", getAllProducts);

router.get("/product/:id", getProductById);

router.post("/product", body("name").isString(), validate, createProduct);
router.put("/product/:id", body("name").isString(), validate, updateProduct);

router.delete("/product/:id", deleteProduct);

/**
 * GET /api/update
 * GET /api/update/:id
 * POST /api/update
 * PUT /api/update/:id
 * DELETE /api/update/:id
 **/

router.get("/update", getUpdates);

router.get("/update/:id", getUpdateById);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body('productId').exists().isString(),
  validate,
  createUpdate
);

router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status").optional().isIn(Object.values(StatusUpdate)),
  body("version").optional().isString(),
  validate,
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * GET /api/updatepoint
 * GET /api/updatepoint/:id
 * POST /api/updatepoint
 * PUT /api/updatepoint/:id
 * DELETE /api/updatepoint/:id
 **/

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  validate
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updatedId").exists().isString(),
  validate
);

router.delete("/updatepoint/:id", (req, res) => {});

export default router;

import { Router } from "express";
import { body, oneOf } from "express-validator";
import { validate } from "../middleware/errorHandler";
import { StatusUpdate } from "@prisma/client";

const router = Router();

/**
 * GET /api/product
 * GET /api/product/:id
 * POST /api/product
 * PUT /api/product/:id
 * DELETE /api/product/:id
 **/

router.get("/product", (req, res) => {
  res.json({ message: "Get all products" });
});

router.get("/product/:id", (req, res) => {});

router.post("/product", body("name").isString(), validate);
router.put("/product/:id", body("name").isString(), validate);

router.delete("/product/:id", (req, res) => {});

/**
 * GET /api/update
 * GET /api/update/:id
 * POST /api/update
 * PUT /api/update/:id
 * DELETE /api/update/:id
 **/

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  validate
);
router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status").optional().isIn(Object.values(StatusUpdate)),
  body("version").optional().isString(),
  validate
);

router.delete("/update/:id", (req, res) => {});

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
  validate
);

router.delete("/updatepoint/:id", (req, res) => {});

export default router;

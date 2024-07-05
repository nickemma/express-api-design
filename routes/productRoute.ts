import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/errorHandler";

const router = Router();

/**
    * GET /api/product
    * GET /api/product/:id
    * POST /api/product
    * PUT /api/product/:id
    * DELETE /api/product/:id
**/

router.get('/product', (req, res) => {
    res.json({ message: 'Get all products' });
});

router.get('/product/:id', (req, res) => {
});

router.post('/product', (req, res) => {
});

router.put('/product/:id', body('body').isString(), validate);

router.delete('/product/:id', (req, res) => {
});

/**
    * GET /api/update
    * GET /api/update/:id
    * POST /api/update
    * PUT /api/update/:id
    * DELETE /api/update/:id
**/

router.get('/update', (req, res) => {
});

router.get('/update/:id', (req, res) => {
});

router.post('/update', (req, res) => {
});

router.put('/update/:id', (req, res) => {
});

router.delete('/update/:id', (req, res) => {});
   
/**
    * GET /api/updatepoint
    * GET /api/updatepoint/:id
    * POST /api/updatepoint
    * PUT /api/updatepoint/:id
    * DELETE /api/updatepoint/:id
**/

router.get('/updatepoint', (req, res) => {
});

router.get('/updatepoint/:id', (req, res) => {
});

router.post('/updatepoint', (req, res) => {
});

router.put('/updatepoint/:id', (req, res) => {
});

router.delete('/updatepoint/:id', (req, res) => {
});

export default router
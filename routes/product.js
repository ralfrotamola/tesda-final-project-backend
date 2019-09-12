const express = require('express');
const { check } = require('express-validator');
const ProductController = require('../controller/product.controller');
const productValidator = require('../validation/product.validation');
const router = express.Router();

const productController = new ProductController();


router.get("/getproducts", productController.getProducts);
router.get("/getproductbyid/:id", productController.getProductById);
router.get("/getproductbyuserid/:user_id", productController.getProductByUserId);
router.post("/createproduct", 
            [check('img_path').trim().not().isEmpty().isString().withMessage("invalid img_path"),
            check('name').trim().not().isEmpty().withMessage("invalid product name").isString(),
            check('desc').trim().not().isEmpty().isString().withMessage("invalid description"),
            check('qty').trim().not().isEmpty().isNumeric().withMessage("invalid QTY"),
            check('price').trim().not().isEmpty().isDecimal().withMessage("invalid price")],
            productValidator.createProduct, productController.createProduct);

router.put("/updateproduct",
            [check('id').trim().not().isEmpty().isString().withMessage("invalid product id"),
            check('img_path').trim().not().isEmpty().isString().withMessage("invalid img_path"),
            check('name').trim().not().isEmpty().withMessage("invalid product name").isString(),
            check('desc').trim().not().isEmpty().isString().withMessage("invalid description"),
            check('qty').trim().not().isEmpty().isNumeric().withMessage("invalid QTY"),
            check('price').trim().not().isEmpty().isDecimal().withMessage("invalid price"),
            check('user_id').trim().not().isEmpty().isString().withMessage("invalid user id")],
            productValidator.updateProduct, productController.updateProduct);

module.exports = router;
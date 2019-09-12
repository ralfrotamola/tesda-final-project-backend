const ProductModel = require('../models/product.model');

class ProductController {

    getProducts(request, response) {
        ProductModel
            .find()
            .then(result => {
                response.status(200).json({
                    success: true,
                    products: result
                })
            }).catch(error => {
                response.status(400).json({
                    success: false,
                    message: error.message
                })
            });
    }

    getProductById(request, response) {
        ProductModel
            .findOne({ _id : request.params.id})
            .then(result => {
                response.status(200).json({
                    success: true,
                    products: result
                })
            }).catch(error => {
                response.status(400).json({
                    success: false,
                    message: error.message
                })
            });
    }

    getProductByUserId(request, response) {
        ProductModel
            .findOne({ user_id : request.params.id})
            .then(result => {
                response.status(200).json({
                    success: true,
                    products: result
                })
            }).catch(error => {
                response.status(400).json({
                    success: false,
                    message: error.message
                })
            });
    }

    createProduct(request, response) {
        const product = new ProductModel(request.body);
        product
            .save()
            .then(result => {
                response.status(200);
                response.json({
                    success: true,
                    message: result
                });
            })
            .catch(error => {
                response.status(400).json({
                    success: false,
                    message: error.message
                })
            });
    }

    updateProduct(request, response) {
        const query = { _id: request.body.id}
        ProductModel
            .findOneAndUpdate(query, 
                {$set:{
                    img_path: request.body.img_path,
                    name: request.body.name,
                    desc: request.body.desc,
                    qty: request.body.qty,
                    price: request.body.price,
                    user_id: request.body.user_id}},
                {new: true})
            .then(result => {
                response.status(200);
                response.json({
                    success: true,
                    message: result
                });
            })
            .catch(error => {
                response.status(400).json({
                    success: false,
                    message: error.message
                })
            });
    }
}

module.exports = ProductController;


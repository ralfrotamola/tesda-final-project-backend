const { validationResult } = require('express-validator');

exports.createProduct = (request, response, next) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ success: false, message: errors.array()});
    }
    // console.log(errors);
    next();
}

exports.updateProduct = (request, response, next) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ success: false, message: errors.array()});
    }
    // console.log(errors);
    next();
}
const { validationResult } = require('express-validator');

exports.registration = (request, response, next) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ success: false, message: errors.array()});
    }
    // console.log(errors);
    next();
}
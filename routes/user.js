const express = require('express');
const { check } = require('express-validator');
const UserController = require('../controller/user.controller');
const userValidator = require('../validation/user.validation');
const router = express.Router();

const userController = new UserController();

router.post("/register",
            [check('fullname').trim().not().isEmpty().isString(), 
            check('username').trim().not().isEmpty().isLength({min: 5}).isAlphanumeric(),
            check('password').trim().not().isEmpty().isLength({min: 5})], 
            userValidator.registration, 
            userController.register);

            
module.exports = router;
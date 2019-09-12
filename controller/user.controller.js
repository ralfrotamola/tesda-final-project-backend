const UserModel = require('../models/user.model');
const UserService = require('../services/user.service');
const userService = new UserService();

class UserController {
    constructor(){
    }

    register(request, response) {
        UserModel
            .findOne({ username: request.body.username })
            .then(result => {
                if (!result) {
                    userService
                        .hashPassword(request.body.password)
                        .then(hashedPassword => {
                            userService.saveUser(request, hashedPassword)
                            .then(result => response.status(200).json({success: true, message: 'Successfully Created'}))
                            .catch(error => response.status(400).json({success: false, message: error.message}))
                        })
                        .catch(error => response.status(400).json({success: false, message: error.message }));
                } else {
                    response.status(400).json({success: false, message: 'User Already Exist' })
                }
            })
            .catch(error => {
                response.status(400).json({
                    success: false,
                    message: error.message
                })
            });
    }
}

module.exports = UserController;
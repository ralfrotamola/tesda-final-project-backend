const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserService {

    constructor() {}

    // hashing password using bryct
    hashPassword (password) {
        return new Promise((resolve, reject) => {
            if (password === null) {
                return reject('password undefined');
            } else {
                bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(hashedPassword);
                    }
                });
            }
        });
    }

    async saveUser(request, hashedPassword) {
        const user = new UserModel({
            fullname: request.body.fullname,
            username: request.body.username,
            password: hashedPassword
        });
        const saveUser = await user.save();
        console.log(saveUser);
        return {
            saveUser
        }
    }

    // saveUser(request, hashedPassword) {
    //     return new Promise((resolve, reject) => {
    //         const user = new UserModel({
    //             fullname: request.body.fullname,
    //             username: request.body.username,
    //             password: hashedPassword
    //         });
    //             user.save()
    //             .then(result => {
    //                 resolve({
    //                     success: true,
    //                     message: 'Successfully Created'
    //                 })
    //                 console.log(result);
    //             })
    //             .catch(error => {
    //                 reject({
    //                     success: false,
    //                     message: error.message
    //                 })
    //             });
    //     })
    // }
}

module.exports = UserService;
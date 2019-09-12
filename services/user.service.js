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

    comparePassword(result, hashedPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(hashedPassword, result.password, (err, match) => {
                if (err) {
                    return reject(err);
                } else {
                    if (match) {
                        const response = {
                            _id: result._id,
                            username: result.username
                        }
                        console.log(`match: ${response}`)
                        return resolve(response)
                    } else {
                        console.log(`fail: ${match}`);
                        return reject('Invalid Username or Password');
                    }
                }
    
    
            });
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
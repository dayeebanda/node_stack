const { body } = require('express-validator')
const User = require('../../models/User')



module.exports =

    [
        body('username')
        .isLength({ min: 3, max: 15 }).withMessage('User Name Must between 3 to 15 character ')
        .custom(async username => {
            let user = await User.findOne({ username })
            if (user) {

                return Promise.reject('User Name already Used ')
            }

        }).trim(),

        body('email')
        .isEmail().withMessage('please provide a Valid Email')
        .custom(async email => {
            let user = await User.findOne({ email })
            if (user) {

                return Promise.reject('Email already Used ')
            }

        }).normalizeEmail(),


        body('password')
        .isLength({ min: 4 }).withMessage('Your Password must be grater than 5 chars'),

        body('confirmPassword')
        .isLength({ min: 4 }).withMessage('Your Password must be grater than 5 chars')

        .custom((confirmPassword, { req }) => {
            if (confirmPassword != req.body.password) {

                throw new Error('Password Does not Match')
            }
            return true

        })


    ]
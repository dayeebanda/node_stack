const { body } = require('express-validator')
const User = require('../../models/User')


module.exports = [

    body('email')
    .not().isEmpty().withMessage('Email Can not be Empty'),

    body('password')
    .not().isEmpty().withMessage('Password Can not be Empty'),

]
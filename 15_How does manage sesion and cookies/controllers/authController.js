const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

//const cookieParser = require('cookie-parser')

const User = require('../models/User')

const errorFormater = require('../utilis/validationErrorFormater')

exports.signupGetController = (req, res, next) => {


    //confirmPassword


    res.render('pages/auth/signup', { title: 'Create a New Account', error: {}, value: {} })

}
exports.signupPostController = async(req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormater)
    if (!errors.isEmpty()) {

        return res.render('pages/auth/signup', {
            title: 'Create a New Account',
            error: errors.mapped(),
            value: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password

            }
        })

        // return console.log(errors.mapped())
    }


    //console.log(req.body)

    let { username, email, password } = req.body

    try {

        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({

            username,
            email,
            password: hashedPassword
        })

        let createdUser = await user.save()

        console.log('User Created Successfull', createdUser)
        res.render('pages/auth/signup', { title: 'Create a New Account', value: {} })

    } catch (e) {
        console.log(e)
        next(e)

    }



}

exports.loginGetController = (req, res, next) => {
    console.log(req.session.isLoggedIn, req.session.user)

    res.render('pages/auth/login', { title: 'Login Page', error: {} })

}
exports.loginPostController = async(req, res, next) => {

    //res.cookie('name', 'habib').send('cookie set'); //Sets name = express
    let { email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormater)
    if (!errors.isEmpty()) {

        return res.render('pages/auth/login', {
            title: 'Login to your Account',
            error: errors.mapped(),


        })

        // return console.log(errors.mapped())
    }

    //console.log(document.cookie);

    try {
        let user = await User.findOne({ email })
        if (!user) {

            return res.json({

                message: 'Invalid Credential'
            })
        }
        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({

                message: 'Invalid Credential'
            })

        }

        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
                if (err) {

                    console.log(err)
                    return next(err)
                }
                res.redirect('/deshboard')

            })
            //console.log('Successfully Logged in', user)
            //res.render('pages/auth/login', { title: 'Login page', error: {} })

    } catch (e) {
        console.log(e)
        next()


    }


}
exports.logoutController = (req, res, next) => {

    req.session.destroy(err => {
        if (err) {
            console.log(err)
            return next(err)

        }
        return res.redirect('/auth/login')

    })

}
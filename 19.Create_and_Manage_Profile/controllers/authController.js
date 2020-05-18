const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const Flash = require('../utilis/Flash')

//const cookieParser = require('cookie-parser')

const User = require('../models/User')

const errorFormater = require('../utilis/validationErrorFormater')

exports.signupGetController = (req, res, next) => {


    // try {

    //     throw new Error('server Crash')
    // } catch (e) {

    //     next(e)
    // }

    //confirmPassword


    res.render('pages/auth/signup', {
        title: 'Create a New Account',
        error: {},
        value: {},
        flashMessage: Flash.getMessage(req)
    })

}
exports.signupPostController = async(req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormater)


    if (!errors.isEmpty()) {

        req.flash('fail', 'Please Check your Form')
        return res.render('pages/auth/signup', {
            title: 'Create a New Account',
            error: errors.mapped(),
            value: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password

            },
            flashMessage: Flash.getMessage(req)
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

        await user.save()
        req.flash('success', ' User Created Successfully')

        //console.log('User Created Successfull', createdUser)
        res.redirect('/auth/login')

    } catch (e) {
        next(e)

    }



}

exports.loginGetController = (req, res, next) => {
    //console.log(req.session.isLoggedIn, req.session.user)

    res.render('pages/auth/login', {
        title: 'Login Page',
        error: {},
        flashMessage: Flash.getMessage(req)
    })

}
exports.loginPostController = async(req, res, next) => {

    //res.cookie('name', 'habib').send('cookie set'); //Sets name = express
    let { email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormater)


    if (!errors.isEmpty()) {
        req.flash('fail', 'Please Check your Form ')

        return res.render('pages/auth/login', {
            title: 'Login to your Account',
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)


        })

        // return console.log(errors.mapped())
    }

    //console.log(document.cookie);

    try {
        let user = await User.findOne({ email })
        if (!user) {
            req.flash('fail', 'Please Provied Valid Credentials')

            return res.render('pages/auth/login', {
                title: 'Login to your Account',
                error: {},
                flashMessage: Flash.getMessage(req)


            })
        }
        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            req.flash('fail', 'Please Provied Valid Credentials')

            return res.render('pages/auth/login', {
                title: 'Login to your Account',
                error: {},
                flashMessage: Flash.getMessage(req)


            })

        }

        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
                if (err) {

                    console.log(err)
                    return next(err)
                }
                req.flash('success', 'Successfully Logged In')

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
        // req.flash('success', 'Successfully Logout')
        return res.redirect('/auth/login'
            //{ flashMessage: Flash.getMessage(req) }
        )

    })

}
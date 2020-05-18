const User = require('../models/User')
const bcrypt = require('bcrypt')


exports.signupGetController = (req, res, next) => {

    res.render('pages/auth/signup', { title: 'Create a New Account' })

}
exports.signupPostController = async(req, res, next) => {

    //console.log(req.body)

    let {
        username,
        email,
        password
        //confirmPassword
    } = req.body

    try {

        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({

            username,
            email,
            password: hashedPassword
        })

        let createdUser = await user.save()

        console.log('User Created Successfull', createdUser)
        res.render('pages/auth/signup', { title: 'Create a New Account' })

    } catch (e) {
        console.log(e)
        next(e)

    }



}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', { title: 'Login Page' })

}
exports.loginPostController = async(req, res, next) => {
    let { email, password } = req.body

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
        console.log('Successfully Logged in', user)
        res.render('pages/auth/login', { title: 'Login Page' })





    } catch (e) {
        console.log(e)
        next()


    }


}
exports.logoutController = (req, res, next) => {

}
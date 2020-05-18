const router = require('express').Router()

const { check, validationResult } = require('express-validator')

const Flash = require('../utilis/Flash')


router.get('/validator', (req, res, next) => {

    //console.log(req.flash('fail'))

    console.log(Flash.getMessage(req))

    console.log(req.flash('success'))
    res.render('playground/signup', { title: 'Validator playground' })

})
router.post('/validator',

    [
        check('username').not().isEmpty().withMessage('User can not empty')
        .isLength({ max: 15 }).withMessage('User Name can not be grater than 15 Charactar'),

        check('email').isEmail()
        .trim().
        withMessage('Please Provide A Valid Email').normalizeEmail(),

        check('password').custom(value => {
            if (value.length < 5) {

                throw new Error('Password Must be grater than 5 Characters')
            }
            return true

        }),

        check('confirmPassword').custom((value, { req }) => {
            if (value != req.body.password) {

                throw new Error('Password Does not match')
            }
            return true

        })
    ],

    (req, res, next) => {

        let errors = validationResult(req)

        if (!errors.isEmpty) {

            req.flash('fail', ' there is some Eroor')
        } else {
            req.flash('success', 'There is no Error')
        }

        //return res.redirect('/auth/login')

        res.redirect('/playground/validator')

    })



module.exports = router
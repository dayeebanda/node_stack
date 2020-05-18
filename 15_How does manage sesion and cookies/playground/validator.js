const router = require('express').Router()

const { check, validationResult } = require('express-validator')


router.get('/validator', (req, res, next) => {
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

        const formatter = (error) => error.msg



        console.log(errors.isEmpty())
        console.log(errors.array())
        console.log(errors.mapped())

        console.log(errors.formatWith(formatter).mapped())
        console.log(req.body.username, req.body.email)




        //console.log(errors)
        res.render('playground/signup', { title: 'Validator playground' })


    })



module.exports = router
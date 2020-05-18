const router = require('express').Router()

const { isAuthenticated } = require('../middleware/authMiddleware')
const {

    deshboardGetController
} = require('../controllers/deshboardController')


router.get('/', isAuthenticated, deshboardGetController)


module.exports = router
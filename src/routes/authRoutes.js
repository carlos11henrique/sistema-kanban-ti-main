const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {verify, authorize, ROLES} = require('../middleware/auth')


router.post('/register',verify,authorize([ROLES.NOA,]),authController.register)
router.post('/login',authController.login)

module.exports = router
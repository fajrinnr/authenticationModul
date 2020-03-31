const indexRouter = require('express').Router()
const userController = require('../controllers/userControllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

indexRouter.post('/register', userController.register)
indexRouter.post('/login', userController.login)
indexRouter.use(authentication)
indexRouter.post('/authentication', userController.TwoFactorAuthentication)
indexRouter.put('/resetpassword/:id',  authorization.userAuthorize, userController.resetPassword)

module.exports = indexRouter
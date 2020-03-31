require('dotenv').config()
const { User } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const authenticator = require('authenticator')
const sentEmail = require('../helpers/sentEmail')

let tfaKey = ''
let tfaToken = ''

class UserController {

  static async login(req, res, next) {
    try {
      let userEmail = {
        where: {
          email_address: req.body.email
        }
      }
      const user = await User.findOne(userEmail)
      if (!user) {
        let errorMsg = {
          status: 404,
          message: 'User Not Found'
        }
        throw errorMsg
      } else {
        if (bcrypt.checkPass(req.body.password, user.password)) {
          tfaKey = authenticator.generateKey();
          tfaToken = authenticator.generateToken(tfaKey);
          sentEmail(user.email_address, tfaToken)
          let userData = {
            id: user.id,
            name: user.full_name,
            email: user.email_address,
            status: user.status
          }
          res.status(200).json({ userData, token: jwt.createToken(userData) })
        } else {
          let errorMsg = {
            status: 400,
            message: 'Incorrect Email or Password'
          }
          throw errorMsg
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next  ) {
    const { name, email, password } = req.body
    try {
      console.log(name, email, password)
      let regisUser = {
        full_name: name,
        email_address: email,
        password
      }

      const user = await User.create(regisUser)
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async TwoFactorAuthentication(req, res, next) {
    try {
      if (tfaToken === String(req.body.token)) {
        const statusChange = {
          status: true
        }

        const userEmail = {
          where: {
            email_address: req.user.email
          }
        }
        const response = await User.update(statusChange, userEmail)
        res.status(200).json('Token is Correct')
      } else {
        let errorMsg = {
          status: 400,
          message: 'Incorrect Token'
        }
        throw errorMsg
      }
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword(req, res, next) {
    const { currentPassword, newPassword, newPassword2 } = req.body
    const userId = {
      where: {
        id: req.params.id
      },
      individualHooks: true
    }
    const userEmail = {
      where: {
        email_address: req.user.email
      }
    }

    const updatePassword = {
      password: newPassword
    }
    try {
      const user = await User.findOne(userEmail)
      if (!user) {
        let errorMsg = {
          status: 404,
          message: 'User Not Found'
        }
        throw errorMsg
      } else {
        if (bcrypt.checkPass(currentPassword, user.password)) {
          if (newPassword !== newPassword2) {
            let errorMsg = {
              status: 400,
              message: 'Passwords do not match'
            }
            throw errorMsg
          } else {
            const response = await User.update(updatePassword, userId)
            res.status(200).json('Succesfully updated password')
          }
        } else {
          let errorMsg = {
            status: 400,
            message: 'Incorrect Password'
          }
          throw errorMsg
        }
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController
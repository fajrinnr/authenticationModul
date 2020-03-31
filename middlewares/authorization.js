const {User} = require('../models')

class Authorization {
  static async statusTrue(req, res, next) {
    try {
      const user = await User.findOne({where: {email_address: req.user.email}})
      if (!user.status) {
        let errorMsg = {
          status: 401,
          message: 'Not Authorized'
        }
        throw errorMsg
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }

  static async userAuthorize(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id)
      if (!user) {
        let errorMsg = {
          status: 404,
          message: 'Not Found'
        }
        throw errorMsg
      } else if (user.id !== req.user.id || !user.status) {
        let errorMsg = {
          status: 401,
          message: 'Not Authorized'
        }
        throw errorMsg
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Authorization
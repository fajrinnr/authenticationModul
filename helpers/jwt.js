const jwt = require('jsonwebtoken')

class JwtHelpers {

  static createToken(token) {
    return jwt.sign(token, process.env.JWT_SECRET)
  }

  static verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }

}

module.exports = JwtHelpers
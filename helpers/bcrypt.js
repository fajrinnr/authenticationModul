const bcrypt = require('bcrypt')

class BcryptHelpers {

  static hashPass(password) {
    let salt = 10
    return bcrypt.hashSync(password, salt)
  }

  static checkPass(password, hashPass) {
    return bcrypt.compareSync(password, hashPass)
  }
}

module.exports = BcryptHelpers
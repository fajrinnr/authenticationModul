const jwt = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    let token = req.headers.token
    let user = jwt.verify(token)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
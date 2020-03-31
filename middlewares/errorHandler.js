module.exports = (err, req, res, next) => {
  console.log(err)
  if (err.name == 'SequelizeValidationError') {
    let errors = []
    err.errors.forEach(err => {
      errors.push(err.message)
    });
    res.status(400).json({message: errors})
  } else if (err.name == 'JsonWebTokenError') {
    res.status(404).json({message: 'Token Must be Provided'})
  } else if (err.status || err.message) {
    res.status(err.status).json({message: err.message})
  } else {
    res.status(500).json('Internal Server Error')
  }
}
module.exports = (err, req, res, next) => {
  if (err.status || err.message) {
    res.status(err.status).json(err.message)
  } else {
    res.status(500).json('Internal Server Error')
  }
}
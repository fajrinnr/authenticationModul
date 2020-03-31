const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', route)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening to Port ${port}`)
})
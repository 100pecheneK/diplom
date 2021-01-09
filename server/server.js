require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()
connectDB()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))
app.use('/api/auth', require('./routes/auth'))

// !START BATABASE ZONE
let users = [
  {
    username: 'Misha',
    accessToken: '',
    refreshToken: '',
  },
  {
    username: 'Jenya',
    accessToken: '',
    refreshToken: '',
  },
]
// !END BATABASE ZONE

app.listen(4000)

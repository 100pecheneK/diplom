const expess = require('express')
const router = expess.Router()
const User = require('../models/User')
const {
  comparePassword,
  getHashedPassword,
  validatePassword,
} = require('../utils/password')
const {
  generateAccessToken,
  generateRefreshToken,
  doIfRefreshTokenIsValid,
} = require('../utils/tokenGenerator')
const authRequired = require('../middlewares/authRequired')
const handleError = require('../utils/handleError')

// Return user information
router.get('/me', authRequired, (req, res) => {
  res.json(req.user)
})

// Authenticate User
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await User.findOne({ username })
    if (!existingUser) {
      return res.status(400).json({ message: 'Bad credentials' })
    }

    await comparePassword(password, existingUser.password)

    const accessToken = generateAccessToken({ username })
    const refreshToken = generateRefreshToken({ username })

    await User.findOneAndUpdate({ username }, { accessToken, refreshToken })

    res.json({ accessToken, refreshToken })
  } catch (error) {
    return handleError(res, error)
  }
})

// Delete refreshToken from database
router.delete('/logout', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken === null) {
    return res.status(401).json({ message: 'Bad token' })
  }
  doIfRefreshTokenIsValid(refreshToken, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Bad token' })

    await User.findOneAndUpdate(
      { username: user.username },
      { accessToken: '', refreshToken: '' }
    )

    res.status(204).json({ message: 'Logout successfully' })
  })
})

// Refresh accessToken by given refreshToken
router.post('/token', async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken === null) return res.sendStatus(401)
  doIfRefreshTokenIsValid(refreshToken, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Bad token' })

    const accessToken = generateAccessToken({ username: user.username })

    const existingUser = await User.findOne({ refreshToken })
    if (!existingUser) return res.status(403).json({ message: 'Bad token' })

    await User.findOneAndUpdate(
      { username: user.username },
      { accessToken },
      { new: true }
    )

    return res.json({ accessToken })
  })
})

// Create a new user
router.post('/register', async (req, res) => {
  const { username, phone, password } = req.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' })
  }

  const userFields = {
    username,
    phone,
    password: await getHashedPassword(password),
  }

  const newUser = new User(userFields)
  await newUser.save()
  return res.json('created')
})

// Change password
router.post('/password', authRequired, async (req, res) => {
  const { oldPassword, newPassword } = req.body
  try {
    await comparePassword(
      oldPassword,
      req.user.password,
      'Current password not match'
    )

    validatePassword(newPassword, req.user)

    req.user.password = await getHashedPassword(newPassword)

    await req.user.save()

    return res.json({ message: 'Password changed successfully' })
  } catch (error) {
    return handleError(res, error)
  }
})

module.exports = router

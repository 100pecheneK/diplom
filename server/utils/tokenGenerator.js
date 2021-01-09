const jwt = require('jsonwebtoken')

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3s' })
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}
function doIfRefreshTokenIsValid(refreshToken, cb) {
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, cb)
}
module.exports = {
  generateRefreshToken,
  generateAccessToken,
  doIfRefreshTokenIsValid,
}

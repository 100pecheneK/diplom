const bcrypt = require('bcryptjs')
const RequestError = require('./RequestError')

async function comparePassword(
  plainPassword,
  hashPassword,
  messageIfError = 'Bad credentials'
) {
  const isMatch = await bcrypt.compare(plainPassword, hashPassword)
  if (!isMatch) {
    throw new RequestError(400, messageIfError)
  }
}
async function getHashedPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(plainPassword, salt)
}

function validatePassword(password, user) {
  if (password === user.phone) {
    throw new RequestError(400, 'Bad password')
  }
}

module.exports = {
  comparePassword,
  getHashedPassword,
  validatePassword,
}

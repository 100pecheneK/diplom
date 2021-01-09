const jwt = require('jsonwebtoken')

function authRequired(req, res, next) {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  if (accessToken === null) return res.status(401).json({message:'No token'})
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(403).json({message:'Bad token'})
      // database request
      const existingUser = await User.findOne({ username: user.username })
      // user not found
      if (!existingUser) return res.status(404).json({message:'Bad credentials'})
      // invalid token
      if (existingUser.accessToken !== accessToken) return res.status(403).json({message:'Bad token'})
      req.user = existingUser
      next()
    }
  )
}

module.exports = authRequired

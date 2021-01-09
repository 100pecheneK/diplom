function handleError(res, error) {
  if (error.code) {
    return res.status(error.code).json({ message: error.message })
  }
  return res.status(500).json({ message: 'Server Error' })
}

module.exports = handleError

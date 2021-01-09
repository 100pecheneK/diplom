const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/jwt', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

module.exports = connectDB

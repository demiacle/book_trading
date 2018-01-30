import mongoose from 'mongoose'

var bookSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  requestedByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

export var bookModel = mongoose.model('book', bookSchema)

var userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  booksTraded: Number
})

export var userModel = mongoose.model('user', userSchema)

export default { bookModel, userModel }
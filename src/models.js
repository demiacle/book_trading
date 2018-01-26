import mongoose from 'mongoose'

var bookSchema = new mongoose.Schema({
  title: String,
  isbn: String,
  thumbnail: String
})

export var bookModel = mongoose.model('book', bookSchema)

var userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  city: String,
  state: String
})

export var userModel = mongoose.model('user', userSchema)

export default { bookModel, userModel }
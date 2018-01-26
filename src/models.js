import mongoose from 'mongoose'

var bookSchema = new mongoose.Schema({
  title: String,
  isbn: String,
  thumbnail: String
})

var model = mongoose.model('book', bookSchema)
export default model
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
  ], //array of blogs
})

const User = mongoose.model('User', userSchema)

export default User

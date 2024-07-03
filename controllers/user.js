import User from '../model/User.js'
import bcrypt from 'bcrypt'

export const getAllusers = async (req, res, next) => {
  let users
  try {
    users = await User.find()
    if (users == 0) {
      return res.status(404).json({
        message: 'No User Found',
      })
    }
    return res.status(200).json({
      message: 'Users Found successfully in Db',
      users,
    })
  } catch (err) {
    console.log(err)
  }
}

export const Signup = async (req, res) => {
  const { name, email, password } = req.body
  let user
  try {
    user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        blogs: [],
      })

      await user.save()
      return res.status(201).json({
        message: 'User Created Successfully',
        user,
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      message: err.message,
    })
  }
}

export const Login = async (req, res) => {
  const { email, password } = req.body
  let user
  try {
    user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Could not find user by this email',
      })
    } else {
      const isCorrect = await bcrypt.compare(password, user.password)
      if (isCorrect) {
        return res.status(200).json({
          success: true,
          message: 'User Logged in Successfully',
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'Incorrect Password',
        })
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      message: err.message,
    })
  }
}

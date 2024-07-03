import express from 'express'
import { getAllusers, Signup, Login } from '../controllers/user.js'

const userRouter = express.Router()

userRouter.get('/', getAllusers)
userRouter.post('/signup', Signup)
userRouter.post('/login', Login)

export default userRouter

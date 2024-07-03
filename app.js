import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/user.js'
import { blogrouter } from './routes/blog.js'

const app = express()
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/blog', blogrouter)

mongoose
  .connect(
    'mongodb+srv://admin:Vinny123@cluster0.g2zl4of.mongodb.net/BlogDb?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(5000, () => {
      console.log(
        'Db is connected and server has started listening on port 5000'
      )
    })
  })
  .catch((err) => {
    console.log(err)
  })

import express from 'express'
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getAllBlogsOfaUser,
  getByid,
  updateBlog,
} from '../controllers/blog.js'

export const blogrouter = express.Router()

blogrouter.get('/', getAllBlogs)
blogrouter.post('/add', addBlog)
blogrouter.put('/update/:id', updateBlog)
blogrouter.get('/:id', getByid)
blogrouter.delete('/:id', deleteBlog)
blogrouter.get('/user/:id', getAllBlogsOfaUser)

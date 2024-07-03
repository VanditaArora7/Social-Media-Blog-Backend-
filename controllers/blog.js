import mongoose from 'mongoose'
import Blog from '../model/Blog.js'
import User from '../model/User.js'

export const getAllBlogs = async (req, res) => {
  let blogs
  try {
    blogs = await Blog.find()
    if (blogs == 0) {
      return res.status(404).json({
        message: 'No Blogs Found in Db',
      })
    } else {
      return res.status(200).json({
        success: true,
        blogs,
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      message: err.message,
    })
  }
}

export const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body
  let existingUser
  try {
    existingUser = await User.findById(user)
    if (!existingUser) {
      return res.status(401).json({
        message: 'No Such User Found',
      })
    }
    const blog = await Blog.create({
      title,
      description,
      image,
      user,
    })
    const session = await mongoose.startSession()
    session.startTransaction()
    await blog.save({ session })
    await existingUser.blogs.push(blog)
    await existingUser.save({ session })
    await session.commitTransaction()

    return res.status(201).json({
      success: true,
      blog,
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      message: err.message,
    })
  }
}

export const updateBlog = async (req, res) => {
  const { id } = req.params
  const { title, description, image } = req.body
  let blog
  try {
    blog = await Blog.findByIdAndUpdate(id, {
      title,
      description,
      image,
    })
    if (!blog) {
      return res.status(404).json({
        message: 'No Such Blog in DB',
      })
    }
    return res.status(200).json({
      success: true,
      updatedBlog: blog,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const getByid = async (req, res) => {
  const { id } = req.params
  let blog
  try {
    blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({
        message: 'No Such Blog in DB',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Blog Found',
      blog,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: err.message,
    })
  }
}

export const deleteBlog = async (req, res) => {
  const { id } = req.params
  let blog
  try {
    blog = await Blog.findByIdAndDelete(id).populate('user')

    if (!blog) {
      return res.status(404).json({
        message: 'No Such Blog in DB',
      })
    }
    await blog.user.blogs.pull(blog)
    await blog.user.save()
    return res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      blog,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: err.message,
    })
  }
}
export const getAllBlogsOfaUser = async (req, res) => {
  const { id } = req.params
  let AlluserBlogs
  try {
    AlluserBlogs = await User.findById(id).populate('blogs')
    if (!AlluserBlogs) {
      return res.status(404).json({
        message: 'No Such Blogs in DB which belong to this user',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Blogs of this User Found',
      Blogs: AlluserBlogs.blogs,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: err.message,
    })
  }
}

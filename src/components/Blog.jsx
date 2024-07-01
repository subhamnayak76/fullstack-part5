import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {

  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const addedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const returnedBlog = await blogService.update(blog.id, addedBlog)
      updateBlog(returnedBlog)
    } catch (exception) {
      console.error('Error updating likes:', exception)
    }
  }

  

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} 
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
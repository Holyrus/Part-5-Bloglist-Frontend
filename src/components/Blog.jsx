import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [allVisible, setAllVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <ul>
        <li>{blog.title}<button onClick={() => setAllVisible(!allVisible)}>View</button></li>

        {allVisible && (
        <div>
          <li>{blog.author} </li>
          <li>{blog.url}</li> 
          <li>{blog.likes}<button onClick={() => updateBlog(blog.id)}>Like</button></li>
          <li>Created by {blog.user.username}</li>
        </div>
        )}
        {currentUser.username === blog.user.username &&
          <button onClick={() => deleteBlog(blog.id)}>Remove</button>
        }
      </ul>
    </div>
  )
}

export default Blog
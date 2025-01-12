import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, canUserDelete, user }) => {
  const [allVisible, setAllVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBtn = () => {
    return <button onClick={() => deleteBlog(blog.id)}>Remove</button>
  }

  return (
    <div style={blogStyle} className='blog'>
      {/* CSS attribute className 'blog' is used for access the component in tests */}
      <ul>
        <li>{blog.title}<button onClick={() => setAllVisible(!allVisible)}>View</button></li>
        <li>{blog.author} </li>
        {allVisible && (
        <div>
          <li>{blog.url}</li> 
          <li>{blog.likes}<button onClick={() => updateBlog(blog.id)}>Like</button></li>
          <li>Created by {user}</li>
        </div>
        )}
        {canUserDelete && 
        removeBtn()}
      </ul>
    </div>
  )
}

export default Blog
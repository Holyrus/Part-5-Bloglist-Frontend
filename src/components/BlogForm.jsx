import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
    
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }
  
  return (
    <div className="formDiv">
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <input
          value={newTitle}
          onChange={(e) => handleTitleChange(e)}
          placeholder='Title'
        />
        <br />
        <input
          value={newAuthor}
          onChange={(e) => handleAuthorChange(e)}
          placeholder='Author'
        />
        <br />
        <input
          value={newUrl}
          onChange={(e) => handleUrlChange(e)}
          placeholder='Url'
        />
        <br />
        <input
          value={newLikes}
          onChange={(e) => handleLikesChange(e)}
          placeholder='Likes'
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm

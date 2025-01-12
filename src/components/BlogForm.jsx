
const BlogForm = ({ addBlog, handleTitleChange, handleAuthorChange, handleUrlChange, handleLikesChange, newTitle, newAuthor, newUrl, newLikes }) => {
  
  return (
    <div className="formDiv">
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <input
          value={newTitle}
          onChange={handleTitleChange}
          placeholder='Title'
        />
        <br />
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
          placeholder='Author'
        />
        <br />
        <input
          value={newUrl}
          onChange={handleUrlChange}
          placeholder='Url'
        />
        <br />
        <input
          value={newLikes}
          onChange={handleLikesChange}
          placeholder='Likes'
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm

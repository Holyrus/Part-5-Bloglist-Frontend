import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) // Here we store the user token

  const blogFormRef = useRef()

  // When we enter the page, all checks if user is already logged in and can be found in local storage

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [user])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotificationMessage('Logged out successfully')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      // If browser are refreshed, the user token will be still logged
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user) // Storing the user token in the local storage
      )

      blogService.setToken(user.token) // Setting the token to the blogService
      setUser(user) // Storing the user token
      setUsername('')
      setPassword('')
      setNotificationMessage('Logged in successfully')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes('')
        setNotificationMessage(`A new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const updateBlog = id => {
    const likedBlog = blogs.find(blog => blog.id === id)

    const blogObject = {
      // title: likedBlog.title,
      // author: likedBlog.author,
      // url: likedBlog.url,
      // user: likedBlog.user,
      ...likedBlog,
      likes: likedBlog.likes += 1
    }

    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(
          blogs.map(blog => (blog.id === returnedBlog.id ? returnedBlog : blog))
        )
        setNotificationMessage('Like added')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage('Cannot add Like', error.response.data)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = id => {
    const blogToDelete = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setNotificationMessage('Blog removed')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage('Cannot remove blog', error.response.data)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />

      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>

       {user !== null &&
        <div>
           <p>{user.name} logged-in</p>
           <button onClick={handleLogout}>Logout</button>
           <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm
                addBlog={addBlog}
                handleTitleChange={handleTitleChange}
                handleAuthorChange={handleAuthorChange}
                handleUrlChange={handleUrlChange}
                handleLikesChange={handleLikesChange}
                newTitle={newTitle}
                newAuthor={newAuthor}
                newUrl={newUrl}
                newLikes={newLikes}
              />
           </Togglable>
           <h2>blogs</h2>
           {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={blog.user.username}
                currentUser={user}
              />
           )}
        </div>
      }
    </div>
  )
}

export default App
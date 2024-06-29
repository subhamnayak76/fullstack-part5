import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error.response || error)
        showNotification('Failed to fetch blogs', 'error')
      }
    }
    fetchData()
  }, [])
  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const handleLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  blogService.setToken(null)
  setUser(null)
}
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await blogService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      setName(user.name)
      setUsername('')
      setPassword('')
      showNotification(`Welcome ${user.name}`, 'success')
    } catch (exception) {
      showNotification('Wrong credentials', 'error')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url
      }
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      showNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
      
    } catch (exception) {
     showNotification('Failed to add blog', 'error')
      console.log('Failed to add blog', exception)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title: 
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: 
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: 
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification?.message} type={notification?.type} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in
          <button onClick={handleLogout}>Logout</button>
          </p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} />)

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('Url')
  const likes = screen.getByPlaceholderText('Likes')
  const sendButton = screen.getByText('Save')

  await user.type(title, 'test Title')
  await user.type(author, 'test Author')
  await user.type(url, 'http:test-url.com')
  await user.type(likes, '404')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test Title')
})

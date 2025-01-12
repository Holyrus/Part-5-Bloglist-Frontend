import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {

  // The beforeEach function renders the Togglable component and saves the field 
  // 'container' of the returned value.

  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className='testDiv'>
          Togglable content
        </div>
      </Togglable>
    ).container
  })

  test('Renders its child component', async () => {
    await screen.findAllByText('Togglable content')
  })

  test('At start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('After clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Toggled content can be closed by clicking the same button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('show...')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  // test('Toggled content can be closed by clicking the "cancel" button', async () => {
  //   const user = userEvent.setup()
  //   const button = screen.getByText('show...')
  //   await user.click(button)

  //   const closeButton = screen.getByText('cancel')
  //   await user.click(closeButton)

  //   const div = container.querySelector('.togglableContent')
  //   expect(div).toHaveStyle('display: none')
  // })
})

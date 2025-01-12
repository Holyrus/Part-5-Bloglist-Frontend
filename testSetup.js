// For testing install Vitest, jsdom, react-testing-library, jest-dom
// npm install --save-dev vitest jsdom
// npm install --save-dev @testing-library/react @testing-library/jest-dom
// npm install --save-dev eslint-plugin-vitest-globals
// npm install --save-dev @testing-library/user-event
// npm test -- --coverage

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})

// After each test, the function cleanup() is executed
// to reset the jsdom, which is simulating the browser environment.
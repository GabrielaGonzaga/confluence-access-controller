import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/ui/theme-provider'
import { router } from './routes/routes'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App

import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './App.css'
import { UserProvider } from './context/UserContex'

function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={ router } />
      </UserProvider>
    </>
  )
}

export default App

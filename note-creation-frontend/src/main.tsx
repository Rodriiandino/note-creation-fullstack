import ReactDOM from 'react-dom/client'
import './styles/global.css'
import '@fontsource-variable/caveat'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login.tsx'
import NoteManager from './pages/note-manager.tsx'
import NotFound from './pages/not-found.tsx'
import Register from './pages/register.tsx'
import ActivateAccount from './pages/activate-account.tsx'
import Home from './pages/home.tsx'

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <NotFound /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/activate-account', element: <ActivateAccount /> },
  { path: 'notes', element: <NoteManager /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

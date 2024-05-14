import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import '@fontsource-variable/caveat'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login.tsx'
import ManageNotes from './pages/manage-notes.tsx'
import NotFound from './pages/not-found.tsx'
import Register from './pages/register.tsx'
import ActivateAccount from './pages/activate-account.tsx'

const router = createBrowserRouter([
  { path: '/', element: <ManageNotes />, errorElement: <NotFound /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/activate-account', element: <ActivateAccount /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

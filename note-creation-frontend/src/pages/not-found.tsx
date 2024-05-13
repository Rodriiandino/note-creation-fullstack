import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 2rem)'
      }}
    >
      <h1>404</h1>
      <p>Page not found</p>
      <Link to='/'>Go to home</Link>
    </div>
  )
}

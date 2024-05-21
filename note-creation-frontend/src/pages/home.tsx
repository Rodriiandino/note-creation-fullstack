import Header from '../components/header/Header'
import '../styles/home.css'
import { useAuthStore } from '../context/useContext'
import { isTokenExpired, getToken, removeToken } from '../utils/token-service'
import { useEffect } from 'react'

export default function Home() {
  const { setIsAuth } = useAuthStore()

  useEffect(() => {
    const token = getToken()

    if (token && isTokenExpired(token)) {
      removeToken()
      setIsAuth(false)
    }

    if (token && !isTokenExpired(token)) {
      setIsAuth(true)
    }
  }, [])

  return (
    <>
      <Header />
      <main className='home'>
        <h1>Welcome to the home page!</h1>
      </main>
    </>
  )
}

import AsideCreateCard from '../components/aside/AsideCreateCard'
import Header from '../components/header/Header'
import CardLists from '../components/Notes/CardLists'
import HeaderSection from '../components/Notes/HeaderSection'
import { useAuthStore } from '../context/useContext'
import { useAuth } from '../components/hooks/useAuth'
import { useEffect } from 'react'

export default function ManageNotes() {
  const { checkAuthentication } = useAuth()
  const { isAuth } = useAuthStore()

  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  return (
    <>
      {isAuth && (
        <>
          <Header />
          <main>
            <AsideCreateCard />
            <div>
              <HeaderSection />
              <CardLists />
            </div>
          </main>
        </>
      )}
      {!isAuth && <h1>Debes iniciar sesión para ver tus notas</h1>}
    </>
  )
}

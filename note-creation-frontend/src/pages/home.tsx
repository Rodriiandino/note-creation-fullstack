import { useAuth } from '../components/hooks/useAuth'
import { useEffect } from 'react'
import Layout from '../components/layout'

export default function Home() {
  const { checkAuthentication } = useAuth()

  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  return <Layout>sección de inicio</Layout>
}

import { useAuth } from '../components/hooks/useAuth'
import { useEffect } from 'react'
import Layout from '../components/layout'
import HomeContent from '../components/home/home-content'

export default function Home() {
  const { checkAuthentication } = useAuth()

  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  return (
    <Layout>
      <HomeContent />
    </Layout>
  )
}

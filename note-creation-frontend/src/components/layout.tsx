import '../styles/layout.css'
import Footer from './footer/footer'
import Header from './header/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='home'>{children}</main>
      <Footer />
    </>
  )
}

import Aside from './components/aside/Aside'
import AsideCreateCard from './components/aside/AsideCreateCard'
import CardLists from './components/Section/CardLists'
import Header from './components/header/Header'
import HeaderSection from './components/Section/HeaderSection'
import Main from './components/Main'
import Section from './components/Section/Section'

function App() {
  return (
    <>
      <Header />
      <Main>
        <Aside>
          <AsideCreateCard />
        </Aside>
        <Section>
          <HeaderSection />
          <CardLists />
        </Section>
      </Main>
    </>
  )
}

export default App

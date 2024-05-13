import Aside from '../components/aside/Aside'
import AsideCreateCard from '../components/aside/AsideCreateCard'
import Header from '../components/header/Header'
import Main from '../components/Main'
import CardLists from '../components/Section/CardLists'
import HeaderSection from '../components/Section/HeaderSection'
import Section from '../components/Section/Section'

export default function ManageNotes() {
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

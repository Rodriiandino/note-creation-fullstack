import AsideCreateCard from '../components/aside/AsideCreateCard'
import Header from '../components/header/Header'
import CardLists from '../components/Notes/CardLists'
import HeaderSection from '../components/Notes/HeaderSection'

export default function ManageNotes() {
  return (
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
  )
}

import './notes-content.css'
import Header from '../header/Header'
import NotesContentHeader from './notes-content-header'
import NotesContentList from './notes-content-list'
import NoteCreationSidebar from './sidebar/note-creation-sidebar'

export default function NotesContent() {
  return (
    <>
      <Header />
      <main>
        <NoteCreationSidebar />
        <div>
          <NotesContentHeader />
          <NotesContentList />
        </div>
      </main>
    </>
  )
}

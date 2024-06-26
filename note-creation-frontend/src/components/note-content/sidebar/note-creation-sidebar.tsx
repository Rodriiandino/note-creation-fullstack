import './note-creation-sidebar.css'

import CreateCategoryForm from './CreateCategoryForm'
import CreateNoteForm from './CreateNoteForm'
import { useStore } from '../../../context/useContext'

export default function NoteCreationSidebar() {
  const { isEditing, isEditingCategory } = useStore()

  return (
    <aside>
      <div className='aside__create'>
        <h2>{isEditing ? 'Edit Note' : 'Create Note'}</h2>
        <CreateNoteForm />
      </div>

      <div className='aside__create'>
        <h2>{isEditingCategory ? 'Edit Category' : 'Create Category'}</h2>
        <CreateCategoryForm />
      </div>
    </aside>
  )
}

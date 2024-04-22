import './aside.css'

import CreateCategoryForm from './CreateCategoryForm'
import CreateNoteForm from './CreateNoteForm'
import { useStore } from '../../context/useContext'

export default function AsideCreateCard() {
  const { isEditing } = useStore()

  return (
    <div className='aside__create'>
      <div className='aside__create-container'>
        <h2>{isEditing ? 'Edit Note' : 'Create Note'}</h2>
        <CreateNoteForm />
      </div>

      <div className='aside__create-container'>
        <h2>Create Category</h2>
        <CreateCategoryForm />
      </div>
    </div>
  )
}

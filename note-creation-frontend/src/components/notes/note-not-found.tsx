import './note.css'

import { error } from '../../types/error-type'
import SuccessError from '../success-error'

export default function NoteNotFound({
  success,
  error
}: {
  success: string
  error: error
}) {
  return (
    <article className='note note__not-found'>
      <p>No notes found.</p>
      <SuccessError success={success} error={error} />
    </article>
  )
}

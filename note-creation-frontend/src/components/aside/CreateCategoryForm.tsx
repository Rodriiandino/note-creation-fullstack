import './aside.css'
import { useCategory } from '../hooks/useCategory'
import SuccessError from '../success-error'

export default function CreateCategoryForm() {
  const {
    categoryName,
    setCategoryName,
    handleCreateCategory,
    error,
    success
  } = useCategory()

  return (
    <form onSubmit={handleCreateCategory} className='aside__form'>
      <div className='aside__form-group'>
        <label htmlFor='categoryMake'>Name Category</label>
        <input
          id='categoryMake'
          type='text'
          placeholder='Make a category'
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          required
        />
      </div>
      <button type='submit'>Create</button>
      <SuccessError success={success} error={error} />
    </form>
  )
}

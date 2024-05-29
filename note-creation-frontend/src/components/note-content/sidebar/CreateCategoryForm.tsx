import SuccessError from '../../success-error'
import { useCategory } from '../../hooks/useCategory'
import { useStore } from '../../../context/useContext'

export default function CreateCategoryForm() {
  const {
    categoryName,
    categoryEditing,
    handleCreateCategory,
    handleUpdateCategory,
    error,
    success,
    handleChanges
  } = useCategory()
  const { isEditingCategory } = useStore()

  return (
    <form
      onSubmit={isEditingCategory ? handleUpdateCategory : handleCreateCategory}
      className='aside__form'
    >
      <div className='aside__form-group'>
        <label htmlFor='categoryMake'>Name Category</label>
        <input
          id='categoryMake'
          type='text'
          placeholder={
            isEditingCategory ? 'Edit your category' : 'Make a category'
          }
          value={isEditingCategory ? categoryEditing.name : categoryName}
          onChange={e =>
            handleChanges(e, isEditingCategory ? 'edit' : 'create')
          }
          required
        />
      </div>
      <button type='submit'>{isEditingCategory ? 'Edit' : 'Create'} </button>
      <SuccessError success={success} error={error} />
    </form>
  )
}

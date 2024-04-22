import './aside.css'
import { useState } from 'react'
import fetchApi from '../../utils/fetch-api'
import { CreateCategory } from '../../types/categories-type'
import { useStore } from '../../context/useContext'

export default function CreateCategoryForm() {
  const { setCategories } = useStore()
  const [categoryName, setCategoryName] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await fetchApi({
      path: '/categories/create',
      method: 'POST',
      body: { name: categoryName } as CreateCategory
    })

    const data = await fetchApi({ path: '/categories/all' })
    setCategories(data)
  }

  return (
    <form onSubmit={handleSubmit} className='aside__form'>
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
    </form>
  )
}

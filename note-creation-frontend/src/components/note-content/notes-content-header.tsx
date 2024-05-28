import { IconArchive, IconFilter, IconUnarchive } from '../icons'
import { useStore } from '../../context/useContext'
import { useState } from 'react'
import { CardType } from '../../types/card-types'
import { useNotes } from '../hooks/useNotes'

export default function NotesContentHeader() {
  const { showArchive, setShowArchive, setNotes, categories } = useStore()
  const [filter, setFilter] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const { getUserNotes, getUserArchivedNotes, getUserUnarchivedNotes } =
    useNotes()

  const handleShowFilter = () => {
    setShowFilter(!showFilter)
  }

  const handleArchive = () => {
    if (showArchive === 'all') {
      setShowArchive('archived')
      getUserArchivedNotes()
    } else if (showArchive === 'archived') {
      setShowArchive('unarchive')
      getUserUnarchivedNotes()
    } else {
      setShowArchive('all')
      getUserNotes()
    }
  }

  const handleFilter = async (category: string) => {
    const data: CardType[] = await getUserNotes()
    setShowArchive('all')
    setFilter(category)

    if (category === 'All') {
      setNotes(data)
      return
    }

    const filteredNotes = data.filter(note =>
      note.categories.some(cat => cat.name === category)
    )

    setNotes(filteredNotes)
  }

  const handleFilterClick = (e: any) => {
    const category = e.target.textContent
    handleFilter(category)
    handleShowFilter()
  }

  const handleSearch = async (e: any) => {
    const search = e.target.previousElementSibling.value
    const data: CardType[] = await getUserNotes()

    if (search === '') {
      setNotes(data)
      return
    }

    const filteredNotes = data.filter(note =>
      note.title.toLowerCase().includes(search.toLowerCase())
    )

    setNotes(filteredNotes)
  }

  return (
    <header className='header-section'>
      <p>
        {showArchive === 'all'
          ? 'All notes'
          : showArchive === 'archived'
            ? 'Archived notes'
            : 'Unarchive notes'}
        {filter === 'All' || filter === '' ? '' : ` - ${filter}`}{' '}
      </p>
      <input type='search' placeholder='Search notes' />
      <button onClick={handleSearch} className='button__search'>
        Search
      </button>
      <button onClick={handleShowFilter} className='filter__button'>
        <IconFilter />
        <p className='filter__text-popover'>Filter</p>
      </button>

      {showFilter && (
        <div className='categories__modal'>
          <button onClick={handleFilterClick}>All</button>
          {categories?.map(category => (
            <button key={category.id} onClick={handleFilterClick}>
              {category.name}
            </button>
          ))}
        </div>
      )}

      <button onClick={handleArchive} className='filter__button'>
        {showArchive === 'all' ? <IconArchive /> : <IconUnarchive />}
        <p className='filter__text-popover'>
          {showArchive === 'all'
            ? 'Archived'
            : showArchive === 'archived'
              ? 'Unarchive'
              : 'Show all'}
        </p>
      </button>
    </header>
  )
}

import './section.css'
import { IconArchive, IconFilter, IconUnarchive } from './icons-section'
import { useStore } from '../../context/useContext'
import fetchApi from '../../utils/fetch-api'
import { useState } from 'react'
import { CardType } from '../../types/card-types'

export default function HeaderSection() {
  const { showArchive, setShowArchive, setNotes, categories } = useStore()
  const [filter, setFilter] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const handleShowFilter = () => {
    setShowFilter(!showFilter)
  }

  const fetchApiAndSetNotes = async () => {
    const data: CardType[] = await fetchApi({ path: '/notes/all' })
    setNotes(data)
  }

  const fetchApiAndSetNotesArchived = async () => {
    const data: CardType[] = await fetchApi({ path: '/notes/archived' })
    setNotes(data)
  }

  const fetchApiAndSetNotesUnarchived = async () => {
    const data: CardType[] = await fetchApi({ path: '/notes/unarchived' })
    setNotes(data)
  }

  const handleArchive = () => {
    if (showArchive === 'all') {
      setShowArchive('archived')
      fetchApiAndSetNotesArchived()
    } else if (showArchive === 'archived') {
      setShowArchive('unarchive')
      fetchApiAndSetNotesUnarchived()
    } else {
      setShowArchive('all')
      fetchApiAndSetNotes()
    }
  }

  const handleFilter = async (category: string) => {
    const data: CardType[] = await fetchApi({ path: '/notes/all' })
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
    const data: CardType[] = await fetchApi({ path: '/notes/all' })

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
          {categories.map(category => (
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

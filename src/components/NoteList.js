 

import React, { useContext, useState } from 'react'
import { NotesContext } from '../context/NotesContext'
import { NoteItem } from './NoteItem'
import { Pagination } from './Pagination'

export function NoteList() {
  const { notes } = useContext(NotesContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('updatedAt')
  const [filterText, setFilterText] = useState('')
  const notesPerPage = 3

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filterText.toLowerCase()) ||
    note.content.toLowerCase().includes(filterText.toLowerCase())
  )

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    } else if (sortBy === 'createdAt') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
  })

  const indexOfLastNote = currentPage * notesPerPage
  const indexOfFirstNote = indexOfLastNote - notesPerPage
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          placeholder="Filter notes..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="flex-grow border rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          <option value="updatedAt">Sort by Last Updated</option>
          <option value="createdAt">Sort by Created Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
      <div className="space-y-4">
        {currentNotes.map(note => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sortedNotes.length / notesPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}


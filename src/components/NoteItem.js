import React, { useContext, useState } from 'react'
import { NotesContext } from '../context/NotesContext'

// Simple Node Item
export function NoteItem({ note }) {
  const { setEditingNote, deleteNote, theme } = useContext(NotesContext)
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
  }

  const truncateTitle = (title, maxLength = 50) => {
    if (title.length <= maxLength) return title
    return title.slice(0, maxLength).trim() + '...'
  }

  return (
    <div className={`
      group p-6 rounded-lg 
      transition-all duration-300
      ${theme === 'dark' ? 'bg-[#282828]' : 'bg-white'}
      transform hover:-translate-y-2 hover:scale-102
      hover:shadow-xl hover:shadow-blue-500/20
      cursor-pointer
      relative
      before:absolute before:inset-0 
      before:rounded-lg
      before:transition-colors
      before:duration-300
      hover:before:ring-2
      hover:before:ring-blue-500/50
      dark:hover:before:ring-blue-400/50
    `}>
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 truncate">
          {truncateTitle(note.title)}
        </h3>
        
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words">
            {isExpanded ? note.content : truncateText(note.content)}
          </p>
          
          {note.content.length > 150 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm font-medium 
                transition-colors duration-300"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
          text-sm text-gray-500 dark:text-gray-400">
          <div className="space-y-1 sm:space-y-0">
            <span className="block sm:inline-block mr-4">Created: {formatDate(note.createdAt)}</span>
            {note.updatedAt !== note.createdAt && (
              <span className="block sm:inline-block">Updated: {formatDate(note.updatedAt)}</span>
            )}
          </div>
          <div className="mt-2 sm:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setEditingNote(note)
              }}
              className="text-blue-500 hover:text-blue-700 mr-2 transition-colors duration-300"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteNote(note.id)
              }}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
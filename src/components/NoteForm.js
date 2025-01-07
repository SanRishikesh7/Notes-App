 

import React, { useState, useEffect, useContext } from 'react'
import { NotesContext } from '../context/NotesContext'

export function NoteForm() {
  const { editingNote, setEditingNote, addNote, updateNote } = useContext(NotesContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const MAX_TITLE_LENGTH = 50 

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setContent(editingNote.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [editingNote])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      if (editingNote) {
        updateNote({
          ...editingNote,
          title: title.trim(),
          content: content.trim(),
        })
      } else {
        addNote({
          title: title.trim(),
          content: content.trim(),
        })
      }
      setTitle('')
      setContent('')
    }
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    if (newTitle.length <= MAX_TITLE_LENGTH) {
      setTitle(newTitle)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="title" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
        Title <span className="text-sm text-gray-500">({title.length}/{MAX_TITLE_LENGTH})</span>
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
        maxLength={MAX_TITLE_LENGTH}
        className="w-full border rounded-md p-2 
          bg-white dark:bg-[#282828] 
          text-gray-900 dark:text-gray-100 
          focus:ring-2 focus:ring-blue-500 
          border-gray-300 dark:border-gray-600
          transition-all duration-300"
        required
      />
    </div>
      <div>
        <label htmlFor="content" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-md p-2 h-32 
            bg-white dark:bg-[#282828] 
            text-gray-900 dark:text-gray-100 
            focus:ring-2 focus:ring-blue-500 
            border-gray-300 dark:border-gray-600
            transition-all duration-300"
          required
        ></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        {editingNote && (
          <button
            type="button"
            onClick={() => setEditingNote(null)}
            className="px-4 py-2 rounded-md 
              bg-gray-300 dark:bg-[#282828] 
              text-gray-800 dark:text-gray-200 
              hover:bg-gray-400 dark:hover:bg-gray-700 
              transition-colors duration-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-md 
            bg-blue-500 text-white 
            hover:bg-blue-600 
            transform hover:scale-105
            transition-all duration-300"
        >
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
      </div>
    </form>
  )
}



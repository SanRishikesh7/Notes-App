 

import React, { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(NotesContext)

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}


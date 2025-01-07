import React, { createContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const NotesContext = createContext()

export function NotesProvider({ children }) {

  const getInitialTheme = () => {
      const storedTheme = localStorage.getItem('theme')
      if (storedTheme) {
        return storedTheme
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    return 'light'
  }

  const [notes, setNotes] = useLocalStorage('notes', [])
  const [editingNote, setEditingNote] = useState(null)
  const [theme, setTheme] = useLocalStorage('theme', getInitialTheme())

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'

        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      
      return newTheme
    })
  }

  useEffect(() => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
  }, [theme])

  const addNote = (note) => {
    const now = new Date().toISOString()
    setNotes(prevNotes => [...prevNotes, { ...note, id: Date.now(), createdAt: now, updatedAt: now }])
  }

  const updateNote = (updatedNote) => {
    setNotes(prevNotes => prevNotes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date().toISOString() } 
        : note
    ))
    setEditingNote(null)
  }

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  return (
    <NotesContext.Provider value={{ 
      notes, 
      editingNote, 
      setEditingNote, 
      addNote, 
      updateNote, 
      deleteNote, 
      theme, 
      toggleTheme 
    }}>
      {children}
    </NotesContext.Provider>
  )
}
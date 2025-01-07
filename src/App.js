import React, { useContext } from 'react'
import { NotesProvider, NotesContext } from './context/NotesContext'
import { NoteList } from './components/NoteList'
import { NoteForm } from './components/NoteForm'
import { ThemeToggle } from './components/ThemeToggle'

function NotesApp() {
  const { theme } = useContext(NotesContext)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#000000]' : 'bg-gray-100'
    } text-gray-900 dark:text-white`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dynamic Notes App</h1>
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-auto">
          <div className={`h-fit p-6 rounded-lg shadow-lg transition-all duration-300 ${
            theme === 'dark' ? 'bg-[#282828]' : 'bg-white'
          }`}>
            <h2 className="text-2xl font-semibold mb-4">Add/Edit Note</h2>
            <NoteForm />
          </div>
          <div className={`h-fit overflow-y-auto p-6 rounded-lg shadow-lg transition-all duration-300 ${
            theme === 'dark' ? 'bg-[#282828]' : 'bg-white'
          }`}>
            <h2 className="text-2xl font-semibold mb-4">Notes</h2>
            <NoteList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <NotesProvider>
      <NotesApp />
    </NotesProvider>
  )
}


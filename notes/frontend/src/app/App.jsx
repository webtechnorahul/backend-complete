import React from 'react'
import AllNotes from '../features/pages/AllNotes'
import {RouterProvider } from 'react-router-dom'
import {router} from "../app/App.router"
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
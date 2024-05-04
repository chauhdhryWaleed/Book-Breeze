import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Navbar></Navbar>
      <Outlet></Outlet> 
      {/* child page will not render with out outlet */}
    </>
  )
}

export default App

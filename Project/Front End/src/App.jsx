import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

// import Dashboard from './Dashboard/Dashboard'
// import ProductCard from './components/booklist'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <About/> */}
{/* <ProductCard/> */}
     {/* <DashboardLayout/> */}
      <Navbar></Navbar>
    
      {/* <Navbar2></Navbar2> */}
      <Outlet></Outlet> 
      {/* <Dashboard/> */}
      {/* <DashboardComponent/> */}
      {/* <Sidebar/> */}
      {/* child page will not render with out outlet */}
    </>
  )
}

export default App
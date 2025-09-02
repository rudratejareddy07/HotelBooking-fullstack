import React from 'react'
import NavBar from './components/NavBar.jsx'
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
const App=()=>{
  const isOwnerPath = useLocation().pathname.includes("owner");
  return(
    <div>
      { !isOwnerPath && <NavBar/>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
     
    </div>
  )
}
export default App;
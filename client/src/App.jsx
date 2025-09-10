import React from 'react'
import NavBar from './components/NavBar.jsx'
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AllRooms from './pages/AllRooms.jsx';
import Footer from './components/Footer.jsx';
const App=()=>{
  const isOwnerPath = useLocation().pathname.includes("owner");
  return(
    <div>
      { !isOwnerPath && <NavBar/>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRooms/>}/>
        </Routes>
      </div>
      <Footer/>
     
    </div>
  )
}
export default App;
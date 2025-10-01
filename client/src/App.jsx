import React from 'react'
import NavBar from './components/NavBar.jsx'
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AllRooms from './pages/AllRooms.jsx';
import Footer from './components/Footer.jsx';
import RoomDetails from './pages/RoomDetails.jsx';
import MyBookings from './pages/MyBookings.jsx';
import HotelReg from './components/HotelReg.jsx';
import Layout from './pages/hotelOwner/Layout.jsx';
import Dashboard from './pages/hotelOwner/Dashboard.jsx';
import AddRoom from './pages/hotelOwner/AddRoom.jsx';
import ListRoom from './pages/hotelOwner/ListRoom.jsx';


const App=()=>{
  const isOwnerPath = useLocation().pathname.includes("owner");
  return(
    <div>
      { !isOwnerPath && <NavBar/>}
       { false && <HotelReg/>} 
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRooms/>}/>
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
          <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='add-room' element={<AddRoom/>}/>
            <Route path='list-room' element={<ListRoom/>}/>
          </Route>
        </Routes>
      </div>
      <Footer/>
     
    </div>
  )
}
export default App;
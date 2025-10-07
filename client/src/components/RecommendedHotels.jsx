import React, { useEffect, useState } from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../../context/AppContext'

const RecommendedHotels = () => {
  const { rooms = [], searchedCities = [] } = useAppContext();
  const [recommended, setRecommended] = useState([]);
  
  const filterHotels = () => {
    const filteredHotels = rooms.slice().filter(room => 
      searchedCities.includes(room.hotel.city)
    );
    setRecommended(filteredHotels); // Fixed: was filterHotels, now filteredHotels
  }
  
  useEffect(() => {
    filterHotels()
  }, [rooms, searchedCities])
  
  // Debug to verify rooms are now available
  console.log('Rooms from context:', rooms);
  console.log('Recommended hotels:', recommended);
  
  // Use recommended hotels if available, otherwise fallback to dummy data
  const displayRooms = recommended.length > 0 
    ? recommended.slice(0, 4) 
    : roomsDummyData.slice(0, 4);
    
  return (
    <div className='flex flex-col items-center px-4 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title 
        title='Recommended Hotels' 
        subTitle=''
      />
      
      <div className='flex flex-wrap justify-center gap-6 mt-20'>
        {displayRooms.map((room, index) => (
          <HotelCard 
            key={room._id || room.id || `room-${index}`}
            room={room} 
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default RecommendedHotels
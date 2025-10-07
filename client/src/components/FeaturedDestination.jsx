// import React from 'react'
// import { roomsDummyData } from '../assets/assets'
// import HotelCard from './HotelCard'
// import Title from './Title'
// import { useNavigate } from 'react-router-dom'

// const FeaturedDestination = () => {
//   const navigate=useNavigate();
  
//   return (
//     <div className='flex flex-col items-center px-4 md:px-16 lg:px-24 bg-slate-50 py-20'>
//         <Title title='Featured Destination' subTitle='Discover our handpicked selection od exceptional properties around the world,offering unparalleled luxury and unforgettable experiences'/>
        
//         <div className='flex flex-wrap  justify-center gap-6 mt-20'>
//             {roomsDummyData.slice(0,4).map((room,index)=>(
//                 <HotelCard key={room._id} room={room} index={index}/>
//             ))}
//         </div>
//         <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}}
//         className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
//           View All Destinations
//         </button>
//     </div>
//   )
// }

// export default FeaturedDestination






import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../../context/AppContext'

const FeaturedDestination = () => {
  const { rooms = [], navigate } = useAppContext();
  
  // Debug to verify rooms are now available
  console.log('Rooms from context:', rooms);
  console.log('Rooms length:', rooms?.length);

  // Use actual rooms if available, otherwise fallback to dummy data
  const displayRooms = rooms && rooms.length > 0 
    ? rooms.slice(0, 4) 
    : roomsDummyData.slice(0, 4);

  return (
    <div className='flex flex-col items-center px-4 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title 
        title='Featured Destination' 
        subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'
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
      
      <button 
        onClick={() => { navigate('/rooms'); scrollTo(0,0) }}
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'
      >
        View All Destinations
      </button>
    </div>
  )
}

export default FeaturedDestination
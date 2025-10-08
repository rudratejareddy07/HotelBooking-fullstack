// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets, facilityIcons, roomCommonData} from '../assets/assets';
// import StarRating from '../components/StarRating';
// import { useAppContext } from '../../context/AppContext';

// const RoomDetails = () => {
//   const { id } = useParams();
//   const {rooms,getToken,axios,navigate}=useAppContext()
//   const [room, setRoom] = useState(null);
//   const [mainImage, setMainImage] = useState(null);

//   const [checkInDate,setCheckInDate]=useState(null);
//     const [checkOutDate,setCheckOutDate]=useState(null);
//       const [guests,setGuests]=useState(1);
    
//     const [isAvailable,setIsAvailable]=useState(false);


//   useEffect(() => {
//     const selectedRoom = rooms.find(r => r._id === id);
//     if (selectedRoom) {
//       setRoom(selectedRoom);
//       setMainImage(selectedRoom.images?.[0] || 'fallback-image-url.png');
//     }
//   }, [rooms]);

//   return room && (
//     <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
//       {/* Room details */}
//       <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
//         <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
//         <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>
//           20% OFF</p>
          
//         {/* Display main image */}
        
//       </div>
//       <div className='flex items center gap-1 mt-2'>
//             <StarRating/>
//             <p className='ml-2'>200+ reviews</p>

//       </div>
//       <div className='flex items-center gap-1 text-gray-500 mt-2'>
//         <img src={assets.locationIcon} alt="location-icon" />
//         <span>{room.hotel.address}</span>
        
//       </div>
//       <div className='flex flex-col lg:flex-row mt-6 gap-6'>
//         <div className='lg:w-1/2 w-full'>
//           <img src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover'/>
//         </div>
//         <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
//             {room?.images.length > 1 && room.images.map((image,index)=>(
//               <img onClick={()=>setMainImage(image)} key={index} src={image} alt="Room image"
//               className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage===image && 'outline-3 outline-orange-500'}`}/>
//               ))}
//         </div>
//       </div>
//       {/* room highlights */}
//       <div className='flex flex-col md:flex-row md:justify-between mt-10'>
//         <div>
//           <h1 className='text-3xl md:text-4xl font-playfair'>
//               Experience Luxury Like Never Before
//           </h1>
//           <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
//             {room.amenities.map((item,index)=>(
//               <div key={index} className='flex flex-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
//                 <img src={facilityIcons[item]} alt="item" className='w-5 h-5' />
//                 <p className='text-xs'>{item}</p>

//               </div>
          
//             ))}
//           </div>
//         </div>
//         {/* room price */}
//         <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
//       </div>
//       <form action="" className='flex flex-col md:flex-row md:justify-between md:items-start  bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl 
//       mx-auto mt-16 max-w-6xl'>
//         <div>
//           <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center
//           gp-4 md:gap-10 text-gray-500'>
//             <div  className='flex flex-col'>
//             <label htmlFor="checkInDate" className='font-medium'>Check-in:</label>
//             <input type="date" id='checkInDate' placeholder='Check-in' className='w-full
//              rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' />
           
//               </div>
//               <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
//           <div className='flex flex-col'>
//              <label htmlFor="checkOutDate" className='font-medium'>Check-out:</label>
//             <input type="date" id='checkOutDate' placeholder='Check-out' className='w-full
//              rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
//           </div>
//           <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
//           <div className='flex flex-col'>
//               <label htmlFor="guests" className='font-medium'>Guests</label>
//             <input type="number" id='guests' placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none '
//             required />
//           </div>
//         </div>
//          </div>
         
//          <button
//              type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white rounded-md max-sm:w-full max-sm:mt-6 md:px-8 py-3 md:py-4 text-base cursor-pointer"
//           >
//             Check Availability
//           </button>

//       </form>
//       {/* common specifications */}
//       <div className='mt-25 space-y-4'>
//         {roomCommonData.map((spec,index)=>(
//           <div key={index} className='flex items-start gap-2'> 
//               <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
//               <div>
//                 <p className='text-base'>{spec.title}</p>
//                 <p className='text-gray-500'>{spec.description}</p>
//               </div>
//           </div>
//         ))}
//       </div>
//       <div>
//         <p className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
//           Guests will be allocated on the ground floor according to availability.You get a comfortable two bedroom apartment has a true city feeling.The price quoted is
//           for two guest,at the guest slot please mark the number of guests to get the exact price for groups.The Guests will be allocated
//           ground floor according to availability.You get the comfortable two bedroom apartment
//           that has a true city feeling.
//         </p>
//       </div>
//       {/* HOSTED BY */}
//       <div className='flex flex-col items-start gap-4'>
//           <div className=' flex gap-4'>
//             <img src={room.hotel.owner.image} alt="host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
//             <div> 
//               <p>Hosted by {room.hotel.name}</p>
//               <div className='flex items-center mt-1'>
//                 <StarRating/>
//                 <p className='ml-2'>200+ reviews</p>
//               </div>
//             </div>
//           </div>
//           <button className='px-6 py-2.5 mt-4 rounded text-white bg-blue-600
//           hover:bg-primary-dull transition-all cursor-pointer'> Contact now</button>
//       </div>
//     </div>
//   );
// };  

// export default RoomDetails;





















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets, facilityIcons, roomCommonData } from '../assets/assets';
// import StarRating from '../components/StarRating';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const RoomDetails = () => {
//   const { id } = useParams();
//   const { rooms } = useAppContext();

//   const [room, setRoom] = useState(null);
//   const [mainImage, setMainImage] = useState(null);

//   const [checkInDate, setCheckInDate] = useState('');
//   const [checkOutDate, setCheckOutDate] = useState('');
//   const [guests, setGuests] = useState(1);
//   const [isAvailable,setIsAvailable]=useState(false);


//   //check if the room is available
//   const checkAvailability = async ()=>{
//     try{
//       //check is check-in date is greater than check-out date
//       if(checkInDate >= checkOutDate){
//         toast.error('Check-In Date should be less than Check-Out Date')
//         return;
//       }
//       const {data}=await axios.post('/api/bookings/check-availability',{room:id,checkIndate,checkOutDate})
//       if(data.success){
//         if(data.isAvailable){
//           setIsAvailable(true)
//           toast.success('Room is available')
//         }else{
//           setIsAvailable(false)
//           toast.error('Room is not available')
//         }
//       }else{
//         toast.error(data.message)
//       }
//     }catch(error){
//      toast.error(error.message)
        
//     }
//   }

//   //onsubmithandler function to check availability & book the room
//   const onsubmithandler=async(e)=>{
//     try{
//       e.preventDefault();
//       if(!isAvailable){
//         return checkAvailability();

//       }else{
//         const {data}=await axiox.post('/api/bookings/book' ,{room:id,checkInDate,checkOutDate,
//           guests,paymentMethod:"Pay at Hotel"
//         },{headers : {Authorization : 'Bearer ${await getToken}'}})
//         if(data.success){
//           toast.success(data.message)
//           Navigate('/my-bookings')
//           scrollTo(0,0)
//         }else{
//           toast.error(data.message)
//         }
//       }
//     }catch(error){
//          toast.error(error.message)
//     }
//   }

//   // Fetch the room based on the ID from URL
//   useEffect(() => {
//     if (!rooms || rooms.length === 0) return;
//     const selectedRoom = rooms.find((r) => r._id === id);
//     if (selectedRoom) {
//       setRoom(selectedRoom);
//       setMainImage(selectedRoom.image?.[0] || assets.fallbackImage);
//     }
//   }, [rooms, id]);

//   if (!room) return <p className="text-center mt-20">Loading room details...</p>;

//   return (
//     <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
//       {/* Room title and discount */}
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
//         <h1 className="text-3xl md:text-4xl font-playfair">
//           {room.hotel?.name || 'Hotel Name'}{' '}
//           <span className="font-inter text-sm">({room.roomType || 'Room Type'})</span>
//         </h1>
//         <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
//           20% OFF
//         </p>
//       </div>

//       {/* Ratings and address */}
//       <div className="flex items-center gap-1 mt-2">
//         <StarRating />
//         <p className="ml-2">200+ reviews</p>
//       </div>
//       <div className="flex items-center gap-1 text-gray-500 mt-2">
//         <img src={assets.locationIcon} alt="location-icon" />
//         <span>{room.hotel?.address || 'Address not available'}</span>
//       </div>

//       {/* Images */}
//       <div className="flex flex-col lg:flex-row mt-6 gap-6">
//         <div className="lg:w-1/2 w-full">
//           <img
//             src={mainImage || assets.fallbackImage}
//             alt="Room"
//             className="w-full rounded-xl shadow-lg object-cover"
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
//           {room.image?.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Room image ${index + 1}`}
//               onClick={() => setMainImage(image)}
//               className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
//                 mainImage === image ? 'outline-3 outline-orange-500' : ''
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Amenities & price */}
//       <div className="flex flex-col md:flex-row md:justify-between mt-10">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-playfair">
//             Experience Luxury Like Never Before
//           </h1>
//           <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
//             {room.amenities?.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
//               >
//                 <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
//                 <p className="text-xs">{item}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         <p className="text-2xl font-medium">${room.pricePerNight || 'N/A'}/night</p>
//       </div>

//       {/* Booking form */}
//       <form onSubmit={ onsubmithandler} className="flex flex-col md:flex-row md:justify-between md:items-start bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
//         <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
//           <div className="flex flex-col">
//             <label htmlFor="checkInDate" className="font-medium">Check-in:</label>
//             <input
//               type="date"
//               id="checkInDate"
//               value={checkInDate}
//               onChange={(e) => setCheckInDate(e.target.value)}
//                min={new Date().toISOString().split('T')[0] } disabled={!checkInDate}
//               className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
//             />
//           </div>
//           <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
//           <div className="flex flex-col">
//             <label htmlFor="checkOutDate" className="font-medium">Check-out:</label>
//             <input
//               type="date"
//               id="checkOutDate"
//               value={checkOutDate}
//               onChange={(e) => setCheckOutDate(e.target.value)}
//               min={checkInDate} disabled={!checkInDate}
//               className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
//               required
//             />
//           </div>
//           <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
//           <div className="flex flex-col">
//             <label htmlFor="guests" className="font-medium">Guests</label>
//             <input
//               type="number"
//               id="guests"
//               value={guests}
//               min={1}
//               max={10}
//               onChange={(e) => setGuests(Number(e.target.value))}
//               className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
//               required
//             />
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white rounded-md max-sm:w-full max-sm:mt-6 md:px-8 py-3 md:py-4 text-base cursor-pointer"
//         >
//           {isAvailable ? "Book now" : "Check Availability"}
//         </button>
//       </form>

//       {/* Common room specifications */}
//       <div className="mt-10 space-y-4">
//         {roomCommonData.map((spec, index) => (
//           <div key={index} className="flex items-start gap-2">
//             <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6.5" />
//             <div>
//               <p className="text-base">{spec.title}</p>
//               <p className="text-gray-500">{spec.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Description */}
//       <div>
//         <p className="max-w-3xl border-y border-gray-300 my-10 py-10 text-gray-500">
//           Guests will be allocated on the ground floor according to availability. You get a comfortable two-bedroom apartment with a true city feeling. 
//           The price quoted is for two guests; please mark the number of guests to get the exact price for groups.
//         </p>
//       </div>

//       {/* Hosted by */}
//       <div className="flex flex-col items-start gap-4">
//         <div className="flex gap-4">
//           <img
//             src={room.hotel?.owner?.image || assets.fallbackImage}
//             alt="host"
//             className="h-14 w-14 md:h-18 md:w-18 rounded-full"
//           />
//           <div>
//             <p>Hosted by {room.hotel?.name || 'Host Name'}</p>
//             <div className="flex items-center mt-1">
//               <StarRating />
//               <p className="ml-2">200+ reviews</p>
//             </div>
//           </div>
//         </div>
//         <button className="px-6 py-2.5 mt-4 rounded text-white bg-blue-600 hover:bg-primary-dull transition-all cursor-pointer">
//           Contact now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RoomDetails;



























import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets, facilityIcons, roomCommonData } from '../assets/assets';
import StarRating from '../components/StarRating';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken } = useAppContext(); // Assuming getToken is in context
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // Check if the room is available
  const checkAvailability = async () => {
    try {
      // Check if check-in date is greater than check-out date
      if (checkInDate >= checkOutDate) {
        toast.error('Check-In Date should be less than Check-Out Date');
        return;
      }
      const { data } = await axios.post('/api/bookings/check-availability', {
        room: id,
        checkInDate,  // Fixed typo: was 'checkIndate'
        checkOutDate
      });
      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success('Room is available');
        } else {
          setIsAvailable(false);
          toast.error('Room is not available');
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // onsubmithandler function to check availability & book the room
  const onsubmithandler = async (e) => {
  try {
    e.preventDefault();
    console.log('=== BOOKING PROCESS STARTED ===');
    
    if (!isAvailable) {
      console.log('Checking availability...');
      return checkAvailability();
    } else {
      console.log('Proceeding to booking...');
      
      // Debug: Check if we have all required data
      console.log('Booking data:', {
        roomId: id,
        checkInDate,
        checkOutDate,
        guests,
        isAvailable
      });
      
      // Get token and verify it
      const token = await getToken();
      console.log('Token exists:', !!token);
      console.log('Token length:', token?.length);
      
      if (!token) {
        toast.error('Authentication token not found. Please log in again.');
        return;
      }
      
      // Make the booking request
      console.log('Making API request to /api/bookings/book...');
      const { data } = await axios.post(
        '/api/bookings/book',
        {
          room: id,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod: 'Pay at Hotel'
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Booking response:', data);
      
      if (data.success) {
        toast.success(data.message || 'Room booked successfully!');
        navigate('/my-bookings');
        window.scrollTo(0, 0);
      } else {
        toast.error(data.message || 'Booking failed');
      }
    }
  } catch (error) {
    console.error('=== BOOKING ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error response:', error.response);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    
    if (error.response?.status === 401) {
      toast.error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 404) {
      toast.error('Booking endpoint not found. Please contact support.');
    } else {
      toast.error(error.response?.data?.message || error.message || 'Booking failed');
    }
  }
};
  // Fetch the room based on the ID from URL
  useEffect(() => {
    if (!rooms || rooms.length === 0) return;
    const selectedRoom = rooms.find((r) => r._id === id);
    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.image?.[0] || assets.fallbackImage);
    }
  }, [rooms, id]);

  if (!room) return <p className="text-center mt-20">Loading room details...</p>;

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Room title and discount */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel?.name || 'Hotel Name'}{' '}
          <span className="font-inter text-sm">({room.roomType || 'Room Type'})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      {/* Ratings and address */}
      <div className="flex items-center gap-1 mt-2">
        <StarRating />
        <p className="ml-2">200+ reviews</p>
      </div>
      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel?.address || 'Address not available'}</span>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage || assets.fallbackImage}
            alt="Room"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.image?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Room image ${index + 1}`}
              onClick={() => setMainImage(image)}
              className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                mainImage === image ? 'outline-3 outline-orange-500' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Amenities & price */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-playfair">
            Experience Luxury Like Never Before
          </h1>
          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
            {room.amenities?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
              >
                <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl font-medium">${room.pricePerNight || 'N/A'}/night</p>
      </div>

      {/* Booking form */}
      <form
        onSubmit={onsubmithandler}
        className="flex flex-col md:flex-row md:justify-between md:items-start bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
          <div className="flex flex-col">
            <label htmlFor="checkInDate" className="font-medium">
              Check-in:
            </label>
            <input
              type="date"
              id="checkInDate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}  // Fixed: removed disabled
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
          <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="font-medium">
              Check-out:
            </label>
            <input
              type="date"
              id="checkOutDate"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate}
              disabled={!checkInDate}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
          <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
          <div className="flex flex-col">
            <label htmlFor="guests" className="font-medium">
              Guests
            </label>
            <input
              type="number"
              id="guests"
              value={guests}
              min={1}
              max={10}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white rounded-md max-sm:w-full max-sm:mt-6 md:px-8 py-3 md:py-4 text-base cursor-pointer"
        >
          {isAvailable ? 'Book now' : 'Check Availability'}
        </button>
      </form>

      {/* Common room specifications */}
      <div className="mt-10 space-y-4">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-2">
            <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6.5" />
            <div>
              <p className="text-base">{spec.title}</p>
              <p className="text-gray-500">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <p className="max-w-3xl border-y border-gray-300 my-10 py-10 text-gray-500">
          Guests will be allocated on the ground floor according to availability. You get a
          comfortable two-bedroom apartment with a true city feeling. The price quoted is for two
          guests; please mark the number of guests to get the exact price for groups.
        </p>
      </div>

      {/* Hosted by */}
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-4">
          <img
            src={room.hotel?.owner?.image || assets.fallbackImage}
            alt="host"
            className="h-14 w-14 md:h-18 md:w-18 rounded-full"
          />
          <div>
            <p>Hosted by {room.hotel?.name || 'Host Name'}</p>
            <div className="flex items-center mt-1">
              <StarRating />
              <p className="ml-2">200+ reviews</p>
            </div>
          </div>
        </div>
        <button className="px-6 py-2.5 mt-4 rounded text-white bg-blue-600 hover:bg-primary-dull transition-all cursor-pointer">
          Contact now
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
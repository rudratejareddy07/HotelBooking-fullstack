// import React, { useState } from 'react'
// import { facilityIcons, roomsDummyData, assets } from '../assets/assets'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import StarRating from '../components/StarRating';
// import { useAppContext } from '../../context/AppContext';

// const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
//   <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//     <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
//     <span className='font-light select-none'>{label}</span>
//   </label>
// );

// const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
//   <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//     <input type="radio" name="sortOption" checked={selected} onChange={() => onChange(label)} />
//     <span className='font-light select-none'>{label}</span>
//   </label>
// );

// /*  Filters Component (Single Source of Truth) */
// const Filters = ({ roomTypes, priceRanges, sortOptions }) => (
//   <div className="px-5 pt-5">
//     <p className="font-medium text-gray-800 pb-2">Popular filters</p>
//     {roomTypes.map((type, index) => <CheckBox key={index} label={type} />)}

//     <p className="font-medium text-gray-800 pb-2 mt-5">Price Range</p>
//     {priceRanges.map((range, index) => <CheckBox key={index} label={range} />)}

//     <p className="font-medium text-gray-800 pb-2 mt-5">Sort By</p>
//     {sortOptions.map((option, index) => <RadioButton key={index} label={option} />)}
//   </div>
// );

// const AllRooms = () => {
//   const [searchParams,setSearchParams]=useSearchParams()
//   const[rooms,navigate,currency]=useAppContext()
  
//   const [openFilters, setOpenFilters] = useState(false);

//   const[selectedFilters,setSelectedFilters]=useState({
//     roomType:[],
//     priceRange:[]
//   })
//   const [selectedSort,setSelectedSort]=useState('')

//   const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
//   const priceRanges = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
//   const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

//   //handle chnages for filers and sorting
//   const handleFilterChnage={checked,value,type}=>{
//     setSelectedFilters((prevFilters)=>{
//       const updatedFilters={...prevFilters};
//       if(checked){
//         updatedFilters[type].push(value);
//       }else{
//         updatedFilters[type]=updatedFilters[type].filter(item=>item !==value);

//       }
//       return updatedFilters
//     })
//   }
  

//   const handleSortChange=(sortOption){
//     setSelectedSort(sortOption);
//   }

//   //FUNCTION TO CHGECK IF A ROOM MATCHES THE SELECTED room types
//   const matchesRoomType=(room)=>{
//     return selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);

//   }

//   //FUNCTION TO CHGECK IF A ROOM MATCHES THE SELECTED price range
//   const matchesPriceRange=(room)=>{
//     return selectedFilters.priceRange.length === 0 || selectedFilters.
//     priceRange.some(range=>{
//       const [min,max]=range.split('to').map(Number);
//       return room.pricePerNight >= min && room.pricePerNight <=max;
//     })

//   }

//   //fuunction to sort rooms based on the selected sort option
//   const sortRooms=(a,b)=>{
//     if(selectedSort === 'Price Low to High'){
//       return a.pricePerNight - b.pricePerNight;
//     }
//     if(selectedSort === 'Price Hight to Low'){
//       return b.pricePerNight - b.pricePerNight;
//     }
//     if(selectedSort === 'Newest First'){
//       return new Date(b.createdAt)-new Date(a.createdAt)
//     }
//     return 0;
//   }


//   //filter destination
//   const filterDestination=(room)=>{
//     const destination=searchParams.get('destination');
//     if(!destination) return true;
//     return room.hotel.city.toLowerCase().includes(destination.toLowerCase())
//   }


//   //FILTER AND SORT rooms based on the selected filters and sort option
//   const filteredRooms=useMemo(()=>{
//     return rooms.filter(room=>matchesRoomType(room) && matchesPriceRange(room) &&
//   filterDestination(room)).sort(sortRooms);
//   },[rooms,selectedFilters,selectedSort,searchParams])



//   //clear all filetrs
//   const clearFilters=()=>{
//     setSelectedFilters({
//       roomType:[],
//       priceRange:[],
//     });
//     setSelectSort('');
//     setSearchParams({});

//   }
  
//   return (
//     <div className='flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>

//       {/* Header Section */}
//       <div className='flex flex-col items-start text-left'>
//         <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
//         <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
//           Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
//         </p>
//       </div>

//       {/* Mobile Filters */}
//       <div className='lg:hidden mt-6 border border-gray-300 bg-white'>
//         <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
//           <p className="text-base font-medium text-gray-800">FILTERS</p>
//           <span
//             className="text-xs cursor-pointer"
//             onClick={() => setOpenFilters(!openFilters)}
//           >
//             {openFilters ? "HIDE" : "SHOW"}
//           </span>
//         </div>
//         <div className={`${openFilters ? "h-auto" : "h-0"} overflow-hidden transition-all duration-500`}>
//           <Filters roomTypes={roomTypes} priceRanges={priceRanges} sortOptions={sortOptions} />
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="flex flex-col lg:flex-row w-full gap-8 mt-8">
//         {/* Hotel Cards */}
//         <div className="flex-1 flex flex-col gap-8">
//           {filteredRooms.map((room) => (
//             <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30'>
//               <img
//                 onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0); }}
//                 src={room.images[0]}
//                 alt="hotel-img"
//                 title='View Room Details'
//                 className='max-h-65 md:w-1/3 rounded-xl shadow-lg object-cover cursor-pointer'
//               />
//               <div className='md:w-1/2 flex flex-col gap-2'>
//                 <p className='text-gray-500 mt-2'>{room.hotel.city}</p>
//                 <p
//                   onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0); }}
//                   className='text-gray-500 text-3xl font-playfair cursor-pointer'
//                 >
//                   {room.hotel.name}
//                 </p>

//                 <div className='flex items-center'>
//                   <StarRating />
//                   <p className='ml-2'>200+ reviews</p>
//                 </div>

//                 <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
//                   <img src={assets.locationIcon} alt="location-icon" />
//                   <span>{room.hotel.address}</span>
//                 </div>

//                 <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
//                   {room.amenities.map((item) => (
//                     <div key={item} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
//                       <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
//                       <p className='text-xs'>{item}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}/night</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Desktop Filters */}
//         <div className='hidden lg:block bg-white w-80 border border-gray-300 text-gray-600 h-fit'>
//           <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
//             <p className='text-base font-medium text-gray-800'>FILTERS</p>
//             <span className='text-xs cursor-pointer'>CLEAR</span>
//           </div>
//           <Filters roomTypes={roomTypes} priceRanges={priceRanges} sortOptions={sortOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };



























// // export default AllRooms;
// import React, { useState, useMemo } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// // Mock data for demonstration
// const facilityIcons = {
//   'Free Wifi': '📶',
//   'Free Breakfast': '🍳',
//   'Pool Access': '🏊',
//   'Free View': '🌄',
//   'Free Service': '🛎️'
// };

// const mockRooms = [
//   {
//     _id: '1',
//     roomType: 'Single Bed',
//     pricePerNight: 450,
//     createdAt: '2024-01-15',
//     hotel: { name: 'Grand Plaza Hotel', city: 'Mumbai', address: '123 Marine Drive' },
//     amenities: ['Free Wifi', 'Free Breakfast'],
//     images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400']
//   },
//   {
//     _id: '2',
//     roomType: 'Double Bed',
//     pricePerNight: 850,
//     createdAt: '2024-02-20',
//     hotel: { name: 'Ocean View Resort', city: 'Goa', address: '456 Beach Road' },
//     amenities: ['Free Wifi', 'Pool Access', 'Free View'],
//     images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400']
//   },
//   {
//     _id: '3',
//     roomType: 'Luxury Room',
//     pricePerNight: 1500,
//     createdAt: '2024-03-10',
//     hotel: { name: 'Royal Palace Hotel', city: 'Delhi', address: '789 Connaught Place' },
//     amenities: ['Free Wifi', 'Free Breakfast', 'Free Service'],
//     images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400']
//   },
//   {
//     _id: '4',
//     roomType: 'Family Suite',
//     pricePerNight: 2200,
//     createdAt: '2024-03-25',
//     hotel: { name: 'Mountain View Inn', city: 'Shimla', address: '321 Hill Station' },
//     amenities: ['Free Wifi', 'Free Breakfast', 'Pool Access', 'Free View'],
//     images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400']
//   },
//   {
//     _id: '5',
//     roomType: 'Single Bed',
//     pricePerNight: 350,
//     createdAt: '2024-04-01',
//     hotel: { name: 'Budget Stay', city: 'Mumbai', address: '555 Andheri' },
//     amenities: ['Free Wifi'],
//     images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400']
//   }
// ];

// const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
//   <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//     <input 
//       type="checkbox" 
//       checked={selected} 
//       onChange={(e) => onChange(e.target.checked, label)} 
//     />
//     <span className='font-light select-none'>{label}</span>
//   </label>
// );

// const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
//   <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//     <input 
//       type="radio" 
//       name="sortOption" 
//       checked={selected} 
//       onChange={() => onChange(label)} 
//     />
//     <span className='font-light select-none'>{label}</span>
//   </label>
// );

// const Filters = ({ 
//   roomTypes, 
//   priceRanges, 
//   sortOptions, 
//   selectedFilters, 
//   selectedSort,
//   onFilterChange,
//   onSortChange 
// }) => (
//   <div className="px-5 pt-5 pb-5">
//     <p className="font-medium text-gray-800 pb-2">Popular filters</p>
//     {roomTypes.map((type, index) => (
//       <CheckBox 
//         key={index} 
//         label={type}
//         selected={selectedFilters.roomType.includes(type)}
//         onChange={(checked) => onFilterChange(checked, type, 'roomType')}
//       />
//     ))}

//     <p className="font-medium text-gray-800 pb-2 mt-5">Price Range</p>
//     {priceRanges.map((range, index) => (
//       <CheckBox 
//         key={index} 
//         label={range}
//         selected={selectedFilters.priceRange.includes(range)}
//         onChange={(checked) => onFilterChange(checked, range, 'priceRange')}
//       />
//     ))}

//     <p className="font-medium text-gray-800 pb-2 mt-5">Sort By</p>
//     {sortOptions.map((option, index) => (
//       <RadioButton 
//         key={index} 
//         label={option}
//         selected={selectedSort === option}
//         onChange={onSortChange}
//       />
//     ))}
//   </div>
// );

// const StarRating = () => (
//   <div className="flex gap-1">
//     {[...Array(5)].map((_, i) => (
//       <span key={i} className="text-yellow-400">★</span>
//     ))}
//   </div>
// );

// const AllRooms = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const rooms = mockRooms; // Replace with: const { rooms, currency } = useAppContext();
  
//   const [openFilters, setOpenFilters] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState({
//     roomType: [],
//     priceRange: []
//   });
//   const [selectedSort, setSelectedSort] = useState('');

//   const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
//   const priceRanges = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
//   const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

//   // Handle changes for filters
//   const handleFilterChange = (checked, value, type) => {
//     setSelectedFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters };
//       if (checked) {
//         updatedFilters[type].push(value);
//       } else {
//         updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
//       }
//       return updatedFilters;
//     });
//   };

//   const handleSortChange = (sortOption) => {
//     setSelectedSort(sortOption);
//   };

//   // Function to check if a room matches the selected room types
//   const matchesRoomType = (room) => {
//     return selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);
//   };

//   // Function to check if a room matches the selected price range
//   const matchesPriceRange = (room) => {
//     if (selectedFilters.priceRange.length === 0) return true;
    
//     return selectedFilters.priceRange.some(range => {
//       const [min, max] = range.split(' to ').map(Number);
//       return room.pricePerNight >= min && room.pricePerNight <= max;
//     });
//   };

//   // Function to sort rooms based on the selected sort option
//   const sortRooms = (a, b) => {
//     if (selectedSort === 'Price Low to High') {
//       return a.pricePerNight - b.pricePerNight;
//     }
//     if (selectedSort === 'Price High to Low') {
//       return b.pricePerNight - a.pricePerNight;
//     }
//     if (selectedSort === 'Newest First') {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     }
//     return 0;
//   };

//   // Filter destination
//   const filterDestination = (room) => {
//     const destination = searchParams.get('destination');
//     if (!destination) return true;
//     return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
//   };

//   // Filter and sort rooms based on the selected filters and sort option
//   const filteredRooms = useMemo(() => {
//     return rooms
//       .filter(room => 
//         matchesRoomType(room) && 
//         matchesPriceRange(room) && 
//         filterDestination(room)
//       )
//       .sort(sortRooms);
//   }, [rooms, selectedFilters, selectedSort, searchParams]);

//   // Clear all filters
//   const clearFilters = () => {
//     setSelectedFilters({
//       roomType: [],
//       priceRange: [],
//     });
//     setSelectedSort('');
//     setSearchParams({});
//   };
  
//   return (
//     <div className='flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
//       {/* Header Section */}
//       <div className='flex flex-col items-start text-left'>
//         <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
//         <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
//           Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
//         </p>
//       </div>

//       {/* Active Filters Display */}
//       {(selectedFilters.roomType.length > 0 || selectedFilters.priceRange.length > 0 || selectedSort) && (
//         <div className="mt-4 p-4 bg-blue-50 rounded-lg">
//           <div className="flex items-center justify-between">
//             <div className="flex flex-wrap gap-2">
//               <span className="font-medium">Active Filters:</span>
//               {selectedFilters.roomType.map(type => (
//                 <span key={type} className="px-3 py-1 bg-blue-200 rounded-full text-sm">
//                   {type}
//                 </span>
//               ))}
//               {selectedFilters.priceRange.map(range => (
//                 <span key={range} className="px-3 py-1 bg-green-200 rounded-full text-sm">
//                   ${range}
//                 </span>
//               ))}
//               {selectedSort && (
//                 <span className="px-3 py-1 bg-purple-200 rounded-full text-sm">
//                   {selectedSort}
//                 </span>
//               )}
//             </div>
//             <button 
//               onClick={clearFilters}
//               className="text-sm text-red-600 hover:text-red-800 underline"
//             >
//               Clear All
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Results Count */}
//       <p className="mt-4 text-gray-600">
//         Showing {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''}
//       </p>

//       {/* Mobile Filters */}
//       <div className='lg:hidden mt-6 border border-gray-300 bg-white'>
//         <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
//           <p className="text-base font-medium text-gray-800">FILTERS</p>
//           <span
//             className="text-xs cursor-pointer hover:text-blue-600"
//             onClick={() => setOpenFilters(!openFilters)}
//           >
//             {openFilters ? "HIDE" : "SHOW"}
//           </span>
//         </div>
//         <div className={`${openFilters ? "max-h-[500px]" : "max-h-0"} overflow-hidden transition-all duration-500`}>
//           <Filters 
//             roomTypes={roomTypes} 
//             priceRanges={priceRanges} 
//             sortOptions={sortOptions}
//             selectedFilters={selectedFilters}
//             selectedSort={selectedSort}
//             onFilterChange={handleFilterChange}
//             onSortChange={handleSortChange}
//           />
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="flex flex-col lg:flex-row w-full gap-8 mt-8">
//         {/* Hotel Cards */}
//         <div className="flex-1 flex flex-col gap-8">
//           {filteredRooms.length === 0 ? (
//             <div className="text-center py-20">
//               <p className="text-2xl text-gray-500">No rooms found matching your criteria</p>
//               <button 
//                 onClick={clearFilters}
//                 className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           ) : (
//             filteredRooms.map((room) => (
//               <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300'>
//                 <img
//                   onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0); }}
//                   src={room.images[0]}
//                   alt="hotel-img"
//                   title='View Room Details'
//                   className='max-h-65 md:w-1/3 rounded-xl shadow-lg object-cover cursor-pointer hover:opacity-90 transition'
//                 />
//                 <div className='md:w-1/2 flex flex-col gap-2'>
//                   <p className='text-gray-500 mt-2'>{room.hotel.city}</p>
//                   <p
//                     onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0); }}
//                     className='text-gray-800 text-3xl font-playfair cursor-pointer hover:text-blue-600 transition'
//                   >
//                     {room.hotel.name}
//                   </p>

//                   <div className='flex items-center'>
//                     <StarRating />
//                     <p className='ml-2 text-gray-600'>200+ reviews</p>
//                   </div>

//                   <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
//                     <span>📍</span>
//                     <span>{room.hotel.address}</span>
//                   </div>

//                   <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
//                     {room.amenities.map((item) => (
//                       <div key={item} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
//                         <span>{facilityIcons[item]}</span>
//                         <p className='text-xs'>{item}</p>
//                       </div>
//                     ))}
//                   </div>

//                   <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}/night</p>
//                   <button 
//                     onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0); }}
//                     className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-fit"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Desktop Filters */}
//         <div className='hidden lg:block bg-white w-80 border border-gray-300 text-gray-600 h-fit sticky top-28'>
//           <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
//             <p className='text-base font-medium text-gray-800'>FILTERS</p>
//             <span 
//               onClick={clearFilters}
//               className='text-xs cursor-pointer hover:text-red-600 transition'
//             >
//               CLEAR
//             </span>
//           </div>
//           <Filters 
//             roomTypes={roomTypes} 
//             priceRanges={priceRanges} 
//             sortOptions={sortOptions}
//             selectedFilters={selectedFilters}
//             selectedSort={selectedSort}
//             onFilterChange={handleFilterChange}
//             onSortChange={handleSortChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllRooms;

















// import React, { useState, useMemo } from 'react';
// import { facilityIcons, assets } from '../assets/assets';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import StarRating from '../components/StarRating';
// import { useAppContext } from '../../context/AppContext';

// const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
//   <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//     <input 
//       type="checkbox" 
//       checked={selected} 
//       onChange={(e) => onChange(e.target.checked, label)} 
//     />
//     <span className='font-light select-none'>{label}</span>
//   </label>
// );

// const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
//   <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//     <input 
//       type="radio" 
//       name="sortOption" 
//       checked={selected} 
//       onChange={() => onChange(label)} 
//     />
//     <span className='font-light select-none'>{label}</span>
//   </label>
// );

// /* Filters Component */
// const Filters = ({ 
//   roomTypes, 
//   priceRanges, 
//   sortOptions, 
//   selectedFilters, 
//   selectedSort,
//   onFilterChange,
//   onSortChange 
// }) => (
//   <div className="px-5 pt-5 pb-5">
//     <p className="font-medium text-gray-800 pb-2">Popular filters</p>
//     {roomTypes.map((type, index) => (
//       <CheckBox 
//         key={index} 
//         label={type}
//         selected={selectedFilters.roomType.includes(type)}
//         onChange={(checked) => onFilterChange(checked, type, 'roomType')}
//       />
//     ))}

//     <p className="font-medium text-gray-800 pb-2 mt-5">Price Range</p>
//     {priceRanges.map((range, index) => (
//       <CheckBox 
//         key={index} 
//         label={range}
//         selected={selectedFilters.priceRange.includes(range)}
//         onChange={(checked) => onFilterChange(checked, range, 'priceRange')}
//       />
//     ))}

//     <p className="font-medium text-gray-800 pb-2 mt-5">Sort By</p>
//     {sortOptions.map((option, index) => (
//       <RadioButton 
//         key={index} 
//         label={option}
//         selected={selectedSort === option}
//         onChange={onSortChange}
//       />
//     ))}
//   </div>
// );

// const AllRooms = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { rooms, navigate, currency } = useAppContext();
  
//   const [openFilters, setOpenFilters] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState({
//     roomType: [],
//     priceRange: []
//   });
//   const [selectedSort, setSelectedSort] = useState('');

//   const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
//   const priceRanges = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
//   const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

//   // Handle changes for filters
//   const handleFilterChange = (checked, value, type) => {
//     setSelectedFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters };
//       if (checked) {
//         updatedFilters[type].push(value);
//       } else {
//         updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
//       }
//       return updatedFilters;
//     });
//   };

//   const handleSortChange = (sortOption) => {
//     setSelectedSort(sortOption);
//   };

//   // Function to check if a room matches the selected room types
//   const matchesRoomType = (room) => {
//     return selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);
//   };

//   // Function to check if a room matches the selected price range
//   const matchesPriceRange = (room) => {
//     if (selectedFilters.priceRange.length === 0) return true;
    
//     return selectedFilters.priceRange.some(range => {
//       const [min, max] = range.split(' to ').map(Number);
//       return room.pricePerNight >= min && room.pricePerNight <= max;
//     });
//   };

//   // Function to sort rooms based on the selected sort option
//   const sortRooms = (a, b) => {
//     if (selectedSort === 'Price Low to High') {
//       return a.pricePerNight - b.pricePerNight;
//     }
//     if (selectedSort === 'Price High to Low') {
//       return b.pricePerNight - a.pricePerNight;
//     }
//     if (selectedSort === 'Newest First') {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     }
//     return 0;
//   };

//   // Filter destination
//   const filterDestination = (room) => {
//     const destination = searchParams.get('destination');
//     if (!destination) return true;
//     return room.hotel?.city?.toLowerCase().includes(destination.toLowerCase());
//   };

//   // Filter and sort rooms based on the selected filters and sort option
//   const filteredRooms = useMemo(() => {
//     if (!rooms || !Array.isArray(rooms)) return [];
    
//     return rooms
//       .filter(room => 
//         matchesRoomType(room) && 
//         matchesPriceRange(room) && 
//         filterDestination(room)
//       )
//       .sort(sortRooms);
//   }, [rooms, selectedFilters, selectedSort, searchParams]);

//   // Clear all filters
//   const clearFilters = () => {
//     setSelectedFilters({
//       roomType: [],
//       priceRange: [],
//     });
//     setSelectedSort('');
//     setSearchParams({});
//   };
  
//   return (
//     <div className='flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>

//       {/* Header Section */}
//       <div className='flex flex-col items-start text-left'>
//         <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
//         <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
//           Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
//         </p>
//       </div>

//       {/* Mobile Filters */}
//       <div className='lg:hidden mt-6 border border-gray-300 bg-white'>
//         <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
//           <p className="text-base font-medium text-gray-800">FILTERS</p>
//           <span
//             className="text-xs cursor-pointer"
//             onClick={() => setOpenFilters(!openFilters)}
//           >
//             {openFilters ? "HIDE" : "SHOW"}
//           </span>
//         </div>
//         <div className={`${openFilters ? "h-auto" : "h-0"} overflow-hidden transition-all duration-500`}>
//           <Filters 
//             roomTypes={roomTypes} 
//             priceRanges={priceRanges} 
//             sortOptions={sortOptions}
//             selectedFilters={selectedFilters}
//             selectedSort={selectedSort}
//             onFilterChange={handleFilterChange}
//             onSortChange={handleSortChange}
//           />
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="flex flex-col lg:flex-row w-full gap-8 mt-8">
//         {/* Hotel Cards - EXACTLY AS FIRST CODE */}
//         <div className="flex-1 flex flex-col gap-8">
//           {!rooms || rooms.length === 0 ? (
//             <div className="text-center py-20">
//               <p className="text-2xl text-gray-500">No rooms available</p>
//             </div>
//           ) : filteredRooms.length === 0 ? (
//             <div className="text-center py-20">
//               <p className="text-2xl text-gray-500">No rooms found matching your criteria</p>
//               <button 
//                 onClick={clearFilters}
//                 className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           ) : (
//             filteredRooms.map((room) => (
//               <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30'>
//                 <img
//                   onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0); }}
//                   src={room.images?.[0] || assets.uploadArea}
//                   alt="hotel-img"
//                   title='View Room Details'
//                   className='max-h-65 md:w-1/3 rounded-xl shadow-lg object-cover cursor-pointer'
//                 />
//                 <div className='md:w-1/2 flex flex-col gap-2'>
//                   <p className='text-gray-500 mt-2'>{room.hotel?.city}</p>
//                   <p
//                     onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0); }}
//                     className='text-gray-500 text-3xl font-playfair cursor-pointer'
//                   >
//                     {room.hotel?.name}
//                   </p>

//                   <div className='flex items-center'>
//                     <StarRating />
//                     <p className='ml-2'>200+ reviews</p>
//                   </div>

//                   <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
//                     <img src={assets.locationIcon} alt="location-icon" />
//                     <span>{room.hotel?.address}</span>
//                   </div>

//                   <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
//                     {room.amenities && room.amenities.length > 0 ? (
//                       room.amenities.map((item) => (
//                         <div key={item} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
//                           <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
//                           <p className='text-xs'>{item}</p>
//                         </div>
//                       ))
//                     ) : null}
//                   </div>

//                   <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}/night</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Desktop Filters */}
//         <div className='hidden lg:block bg-white w-80 border border-gray-300 text-gray-600 h-fit'>
//           <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
//             <p className='text-base font-medium text-gray-800'>FILTERS</p>
//             <span 
//               onClick={clearFilters}
//               className='text-xs cursor-pointer'
//             >
//               CLEAR
//             </span>
//           </div>
//           <Filters 
//             roomTypes={roomTypes} 
//             priceRanges={priceRanges} 
//             sortOptions={sortOptions}
//             selectedFilters={selectedFilters}
//             selectedSort={selectedSort}
//             onFilterChange={handleFilterChange}
//             onSortChange={handleSortChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllRooms;











































import React, { useState, useMemo } from 'react';
import { facilityIcons, assets } from '../assets/assets';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useAppContext } from '../../context/AppContext';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input 
      type="checkbox" 
      checked={selected} 
      onChange={(e) => onChange(e.target.checked, label)} 
    />
    <span className='font-light select-none'>{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input 
      type="radio" 
      name="sortOption" 
      checked={selected} 
      onChange={() => onChange(label)} 
    />
    <span className='font-light select-none'>{label}</span>
  </label>
);

/* Filters Component */
const Filters = ({ 
  roomTypes, 
  priceRanges, 
  sortOptions, 
  selectedFilters, 
  selectedSort,
  onFilterChange,
  onSortChange 
}) => (
  <div className="px-5 pt-5 pb-5">
    <p className="font-medium text-gray-800 pb-2">Popular filters</p>
    {roomTypes.map((type, index) => (
      <CheckBox 
        key={index} 
        label={type}
        selected={selectedFilters.roomType.includes(type)}
        onChange={(checked) => onFilterChange(checked, type, 'roomType')}
      />
    ))}

    <p className="font-medium text-gray-800 pb-2 mt-5">Price Range</p>
    {priceRanges.map((range, index) => (
      <CheckBox 
        key={index} 
        label={range}
        selected={selectedFilters.priceRange.includes(range)}
        onChange={(checked) => onFilterChange(checked, range, 'priceRange')}
      />
    ))}

    <p className="font-medium text-gray-800 pb-2 mt-5">Sort By</p>
    {sortOptions.map((option, index) => (
      <RadioButton 
        key={index} 
        label={option}
        selected={selectedSort === option}
        onChange={onSortChange}
      />
    ))}
  </div>
);

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();
  
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: []
  });
  const [selectedSort, setSelectedSort] = useState('');

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
  const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

  // Handle changes for filters
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type].push(value);
      } else {
        updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
      }
      return updatedFilters;
    });
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  // Function to check if a room matches the selected room types
  const matchesRoomType = (room) => {
    return selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);
  };

  // Function to check if a room matches the selected price range
  const matchesPriceRange = (room) => {
    if (selectedFilters.priceRange.length === 0) return true;
    
    return selectedFilters.priceRange.some(range => {
      const [min, max] = range.split(' to ').map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });
  };

  // Function to sort rooms based on the selected sort option
  const sortRooms = (a, b) => {
    if (selectedSort === 'Price Low to High') {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === 'Price High to Low') {
      return b.pricePerNight - a.pricePerNight;
    }
    if (selectedSort === 'Newest First') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };

  // Filter destination
  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return room.hotel?.city?.toLowerCase().includes(destination.toLowerCase());
  };

  // Filter and sort rooms based on the selected filters and sort option
  const filteredRooms = useMemo(() => {
    if (!rooms || !Array.isArray(rooms)) return [];
    
    return rooms
      .filter(room => 
        matchesRoomType(room) && 
        matchesPriceRange(room) && 
        filterDestination(room)
      )
      .sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort('');
    setSearchParams({});
  };

  // Debug: Log rooms data
  console.log('Rooms data:', rooms);
  console.log('Filtered rooms:', filteredRooms);
  
  return (
    <div className='flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>

      {/* Header Section */}
      <div className='flex flex-col items-start text-left'>
        <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
        <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
          Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
        </p>
      </div>

      {/* Mobile Filters */}
      <div className='lg:hidden mt-6 border border-gray-300 bg-white'>
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <span
            className="text-xs cursor-pointer"
            onClick={() => setOpenFilters(!openFilters)}
          >
            {openFilters ? "HIDE" : "SHOW"}
          </span>
        </div>
        <div className={`${openFilters ? "h-auto" : "h-0"} overflow-hidden transition-all duration-500`}>
          <Filters 
            roomTypes={roomTypes} 
            priceRanges={priceRanges} 
            sortOptions={sortOptions}
            selectedFilters={selectedFilters}
            selectedSort={selectedSort}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row w-full gap-8 mt-8">
        {/* Hotel Cards */}
        <div className="flex-1 flex flex-col gap-8">
          {!rooms || rooms.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">No rooms available</p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">No rooms found matching your criteria</p>
              <button 
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredRooms.map((room) => {
              // Debug individual room
              console.log('Room:', room._id, 'Images:', room.images);
              
              return (
                <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30'>
                  <img
                    onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0); }}
                    src={
                      room.image && room.image.length > 0 
                        ? room.image[0] 
                        : 'https://via.placeholder.com/400x300?text=No+Image'
                    }
                    alt="hotel-img"
                    title='View Room Details'
                    className='max-h-65 md:w-1/3 rounded-xl shadow-lg object-cover cursor-pointer'
                    onError={(e) => {
                      console.error('Image failed to load:', room.image?.[0]);
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
                    }}
                  />
                  <div className='md:w-1/2 flex flex-col gap-2'>
                    <p className='text-gray-500 mt-2'>{room.hotel?.city || 'City not available'}</p>
                    <p
                      onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0); }}
                      className='text-gray-500 text-3xl font-playfair cursor-pointer'
                    >
                      {room.hotel?.name || 'Hotel name not available'}
                    </p>

                    <div className='flex items-center'>
                      <StarRating />
                      <p className='ml-2'>200+ reviews</p>
                    </div>

                    <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                      <img src={assets.locationIcon} alt="location-icon" />
                      <span>{room.hotel?.address || 'Address not available'}</span>
                    </div>

                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                      {room.amenities && room.amenities.length > 0 ? (
                        room.amenities.map((item) => {
                          // Debug amenity icons
                          console.log('Amenity:', item, 'Icon:', facilityIcons[item]);
                          
                          return (
                            <div key={item} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                              {facilityIcons[item] ? (
                                <img 
                                  src={facilityIcons[item]} 
                                  alt={item} 
                                  className='w-5 h-5'
                                  onError={(e) => {
                                    console.error('Amenity icon failed:', item, facilityIcons[item]);
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <span className='w-5 h-5 text-xs'>🏨</span>
                              )}
                              <p className='text-xs'>{item}</p>
                            </div>
                          );
                        })
                      ) : (
                        <p className='text-xs text-gray-400'>No amenities listed</p>
                      )}
                    </div>

                    <p className='text-xl font-medium text-gray-700'>${room.pricePerNight || 0}/night</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Filters */}
        <div className='hidden lg:block bg-white w-80 border border-gray-300 text-gray-600 h-fit'>
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
            <p className='text-base font-medium text-gray-800'>FILTERS</p>
            <span 
              onClick={clearFilters}
              className='text-xs cursor-pointer'
            >
              CLEAR
            </span>
          </div>
          <Filters 
            roomTypes={roomTypes} 
            priceRanges={priceRanges} 
            sortOptions={sortOptions}
            selectedFilters={selectedFilters}
            selectedSort={selectedSort}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
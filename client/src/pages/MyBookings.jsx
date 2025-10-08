// import React, { useState } from 'react'
// import Title from '../components/Title'
// import {assets, userBookingsDummyData } from '../assets/assets'

// const MyBookings = () => {
//     const [bookings,setBookings]=useState(userBookingsDummyData)
//   return (
//     <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'> 
//         <Title title='My Bookings' subTitle='Easily manage your paste,current and
//         upcoming hotel reservations in one place.Plan your trips seamlessly with just a few clicks' align='left'/>
//         <div className='max-w-6xl mt-8 w-full text-gray-800'>
//             <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b
//             border-gray-300 font-medium text-base py-3'>
//                 <div className='w-1/3'>
//                     Hotels
//                 </div>
//                 <div className='w-1/3'>
//                     Date & Timings
//                 </div>
//                 <div className='w-1/3'>
//                     Payment
//                 </div>
//              </div>
//                 {bookings.map((booking)=>(
//                     <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr]
//                     w-full border-b border-gray-300 py-6 first:border-t'>
//                             <div className='flex flex-col md:flex-row'>
//                                 <img src={booking.room.images[0]} alt="hotel-img" 
//                                 className='min-md:w-44 rounded shadow object-cover' />
//                                 <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
//                                     <p className='font-playfair text-2xl'>{booking.hotel.name}
//                                     <span className='font-inter text-sm'>({booking.room.roomType})</span>
//                                     </p>
//                                     <div className='flex items-center gap-1 text-sm text-gray-500'>
//                                         <img src={assets.locationIcon} alt="location-icon" />
//                                         <span>{booking.hotel.address}</span>
//                                     </div>
//                                     <div className='flex items-center gap-1 text-sm text-gray-500'>
//                                         <img src={assets.guestsIcon} alt="guests-icon" />
//                                         <span>Guests:{booking.guests}</span>
//                                     </div>
//                                     <p className='text-base'>Total:${booking.totalPrice}</p>
//                                 </div>
//                             </div>
//                             {/* ---------Date and timings--------- */}
//                             <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
//                                 <div>
//                                     <p>Check-In:</p>
//                                     <p className='text-gray-500 text-sm'>
//                                         {new Date(booking.checkInDate).toDateString()}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p>Check-Out:</p>
//                                     <p className='text-gray-500 text-sm'>
//                                         {new Date(booking.checkOutDate).toDateString()}
//                                     </p>
//                                 </div>
//                             </div>
//                             {/* ----payment status---- */}
//                             <div className='flex flex-col items-start justify-center pt-3'>
//                                 <div className='flex items-center gap-2'>
//                                     <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
//                                     <p className={`text-sm ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>
//                                         {booking.isPaid ? "Paid" : "Unpaid"}
//                                     </p>

//                                 </div>
//                                 {!booking.isPaid && ( 
//                                     <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400
//                                     rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
//                                         Pay Now
//                                     </button>
//                                 )}
//                             </div>
//                     </div>

//                 ))}
           
//         </div>
//     </div>
//   )
// }

// export default MyBookings;


















import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const { getToken } = useAppContext()

    // Fetch real bookings from API
    useEffect(() => {
        fetchBookings()
    }, [])

    const fetchBookings = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/bookings/user', {
                headers: { Authorization: `Bearer ${token}` }
            })
            
            if (data.success) {
                setBookings(data.bookings || [])
            } else {
                toast.error(data.message)
                // Fallback to empty array if API fails
                setBookings([])
            }
        } catch (error) {
            console.error('Error fetching bookings:', error)
            toast.error('Failed to load bookings')
            setBookings([])
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
                <div className="text-center">Loading bookings...</div>
            </div>
        )
    }

    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'> 
            <Title 
                title='My Bookings' 
                subTitle='Easily manage your past, current and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks' 
                align='left'
            />
            <div className='max-w-6xl mt-8 w-full text-gray-800'>
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                    <div className='w-1/3'>Hotels</div>
                    <div className='w-1/3'>Date & Timings</div>
                    <div className='w-1/3'>Payment</div>
                </div>
                
                {bookings.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No bookings found.</p>
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                            {/* Hotel Info - SAFE ACCESS */}
                            <div className='flex flex-col md:flex-row'>
                                <img 
                                    src={booking.room?.image?.[0] || assets.fallbackImage} 
                                    alt="hotel-img" 
                                    className='w-full md:w-55 h-32 rounded shadow object-cover' 
                                />
                                <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                                    <p className='font-playfair text-2xl'>
                                        {booking.hotel?.name || 'Hotel'}
                                        <span className='font-inter text-sm'>({booking.room?.roomType || 'Room'})</span>
                                    </p>
                                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                                        <img src={assets.locationIcon} alt="location-icon" />
                                        <span>{booking.hotel?.address || 'Address not available'}</span>
                                    </div>
                                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                                        <img src={assets.guestsIcon} alt="guests-icon" />
                                        <span>Guests: {booking.guests || 1}</span>
                                    </div>
                                    <p className='text-base'>Total: ${booking.totalPrice || 0}</p>
                                </div>
                            </div>
                            
                            {/* Date and Timings */}
                            <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                                <div>
                                    <p>Check-In:</p>
                                    <p className='text-gray-500 text-sm'>
                                        {booking.checkInDate ? new Date(booking.checkInDate).toDateString() : 'Not set'}
                                    </p>
                                </div>
                                <div>
                                    <p>Check-Out:</p>
                                    <p className='text-gray-500 text-sm'>
                                        {booking.checkOutDate ? new Date(booking.checkOutDate).toDateString() : 'Not set'}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Payment Status - UPDATED FOR REAL DATA */}
                            <div className='flex flex-col items-start justify-center pt-3'>
                                <div className='flex items-center gap-2'>
                                    <div className={`h-3 w-3 rounded-full ${
                                        booking.status === 'confirmed' || booking.isPaid ? "bg-green-500" : "bg-yellow-500"
                                    }`}></div>
                                    <p className={`text-sm ${
                                        booking.status === 'confirmed' || booking.isPaid ? "text-green-500" : "text-yellow-500"
                                    }`}>
                                        {booking.status === 'confirmed' ? 'Confirmed' : 
                                         booking.status === 'pending' ? 'Pending' :
                                         booking.isPaid ? 'Paid' : 'Unpaid'}
                                    </p>
                                </div>
                                {(booking.status === 'pending' || !booking.isPaid) && ( 
                                    <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                                        Pay Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MyBookings
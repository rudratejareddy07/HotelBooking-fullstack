import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../../context/AppContext.jsx'
import toast from 'react-hot-toast'

const ListRoom = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const { axios, getToken, user ,currency} = useAppContext()
  
  // Fetch rooms of the hotel owner
  const fetchRooms = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/rooms/owner', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setRooms(data.rooms || data.message || [])
      } else {
        toast.error(data.message)
        setRooms([])
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      setRooms([])
    } finally {
      setLoading(false)
    }
  }

  // Toggle room availability
  const toggleAvailability = async (roomId, currentStatus) => {
    try {
      console.log('Toggling room:', roomId);
      
      // Optimistically update UI for immediate visual feedback
      setRooms(prevRooms => 
        prevRooms.map(room => 
          room._id === roomId 
            ? { ...room, isAvailable: !currentStatus }
            : room
        )
      );

      // Use the correct endpoint: POST /api/rooms/toggle-availability
      const { data } = await axios.post(
        '/api/rooms/toggle-availability',
        { roomId },
        { 
          headers: { 
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      console.log('Toggle response:', data);
      
      if (data.success) {
        toast.success('Room availability updated');
        // Update with backend response to ensure consistency
        if (data.room) {
          setRooms(prevRooms => 
            prevRooms.map(room => 
              room._id === roomId ? data.room : room
            )
          );
        }
      } else {
        toast.error(data.message);
        // Revert optimistic update if backend failed
        fetchRooms();
      }
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to update room availability');
      // Revert optimistic update on error
      fetchRooms();
    }
  }

  useEffect(() => {
    if (user) {
      fetchRooms()
    }
  }, [user])

  if (loading) {
    return (
      <div>
        <Title 
          align='left' 
          font='outfit' 
          title='Room Listings' 
          subTitle='View, edit or manage all listed rooms.'
        />
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading rooms...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Title 
        align='left' 
        font='outfit' 
        title='Room Listings' 
        subTitle='View, edit or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.'
      />
      <p className='text-gray-500 mt-8'>All Rooms ({rooms.length})</p>
      
      {rooms.length === 0 ? (
        <div className='w-full max-w-3xl border border-gray-300 rounded-lg p-8 text-center text-gray-500'>
          No rooms listed yet. Add your first room to get started!
        </div>
      ) : (
        // FIXED SCROLLABLE CONTAINER
        <div className='w-full max-w-3xl border border-gray-300 rounded-lg overflow-hidden'>
          <div className='max-h-80 overflow-y-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 sticky top-0 z-10'>
                <tr>
                  <th className='py-3 px-4 text-gray-800 font-medium text-left bg-gray-50'>Name</th>
                  <th className='py-3 px-4 text-gray-800 font-medium text-left bg-gray-50 max-sm:hidden'>Facility</th>
                  <th className='py-3 px-4 text-gray-800 font-medium text-center bg-gray-50'>Price/night</th>
                  <th className='py-3 px-4 text-gray-800 font-medium text-center bg-gray-50'>Available</th>
                </tr>
              </thead>
              <tbody className='text-sm bg-white divide-y divide-gray-200'>
                {rooms.map((item, index) => (
                  <tr key={item._id || index} className='hover:bg-gray-50'>
                    <td className='py-3 px-4 text-gray-700'>
                      {item.roomType}
                    </td>
                    <td className='py-3 px-4 text-gray-700 max-sm:hidden'>
                      {item.amenities?.join(', ') || 'N/A'}
                    </td>
                    <td className='py-3 px-4 text-gray-700 text-center'>
                      {currency}{item.pricePerNight}
                    </td>
                    <td className='py-3 px-4 text-center'>
                      <div className="flex justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={item.isAvailable || false}
                            onChange={() => toggleAvailability(item._id, item.isAvailable)}
                          />
                          <div className={`w-11 h-6 rounded-full peer ${item.isAvailable ? 'bg-blue-600' : 'bg-gray-300'} transition-colors duration-200`}>
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${item.isAvailable ? 'translate-x-5' : 'translate-x-0'}`}></span>
                          </div>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListRoom
import Booking from "../models/Booking"
import Room from "../models/Room"


//function to check availabbility of room
const checkAvailability=async({checkInDate,checkOutDate,room})=>{
    try{
        const bookings=await Booking.find({
            room,
        checkInDate:{$lte:checkOutDate},
        checkOutDate:{$gte:checkInDate}
        })
        
    }catch(error){
        console.error(error.message)
    }
}


//api to check availability of room
//POST/api/bookingd/check-availabilistdy
export const checkAvailabilityAPI=async(req,res)=>{
    try{
        const {room,checkInDate,checkOutDate}=req.body;
        const isAvailable=await checkAvailability({checkInDate,checkOutDate,room});
        res.json({success:true,isAvailable})
    
    }catch(error){
         res.json({success:false,message:error.message})
    }
}


//APIT TO create a new booking
//post/api/booking/book
export const createBooking=async(req,res)=>{
    try{
        const {room,checkInDate,checkOutDate,guests}=req.body;
        const user=req.user._id;
        //before booking check availabilaity
        const isAvailable=await checkAvailability({checkInDate,checkOutDate,room});
        
        //get tortalproce from room
        const roomData=await Room.findById(room).populate("hotel");
        let totalPrice=roomData.pricePerNight;

        //calculate totalPrice based on nights
         const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff =checkOut.getTime()-checkIn.getTime();
        const nights=Math.cell(timeDiff/(1000*3600*24));
        totalPrice*=nights;
        const booking=await Booking.create({
            user,
            room,
            hotel:roomData.hotel._id,
            guests:+guests,
            checkInDate,
            checkOutDate,
            totalPrice
        })
        res.json({success:true,message:"Booking created successfully"})
    
    }catch(error){
        console.log(error);
         res.json({success:false,message:"Failed to create booking"})
    }
}

//api to get all booking for a user
//get/api/bookings/user
export const getUserBookings=async(req,res)=>{
    try{
        const user=req.user._id;
        const bookings=await Booking.find({user}.populate("room hotel user").sort({createdAt:-1}));
        
         res.json({success:true,bookings})
    }catch(error){
              res.json({success:false,message:"Failed to fetch booking"})
    }
}
export const getHotelBookings=async(req,res)=>{
    try{
        const hotel=await Hotel.findOne({owner:req.auth.userId});
        if(!hotel){
            return res.json({success:false,message:"No hotel found"})
        }
        const bookings=await Booking.find({user}.populate("room hotel user").sort({createdAt:-1}));
        //total bookings
        const totalBookings=bookings.length;
        //total revenue
        const totalRevenue=bookings.reduce((acc,booking)=>acc+booking.totalPrice,0)
         res.json({success:true,dashboardData:{totalBookings,totalBookings,bookings}})
    }catch(error){
              res.json({success:false,message:"Failed to fetch booking"})
    }
}
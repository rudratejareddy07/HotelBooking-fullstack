import User from "../models/User";
import {WebHooks} from Svix;

const clerkWebhooks=async(req,res)=>{
    try{
        //create a svix instance with clerk webhook scret
        const whhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        //getting headers

        const headers={
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        };
        //verifying headers 
        await whook.verify(JSON.stringify(req.body),headers)

        //getting data from rewuest body
        const {data,type}=req.body

        const userData={
            _id:data.id,
            email:data.email_addresses[0].email_address,
            username:data.first_name + " " + data.last_name,
            image:data.image_url,

        }

        //switch cases for different events
        switch(type){
            case"user.created":{
                await User.create(userData);
                break;
            }
             case"user.updated":{
                await User.findByIdAndUpdate(data.id,userData);
                break;
            }
             case"user.delated":{
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }
        res.json({success:true,message:"Webhook Received"})



    }catch(error){
        console.log(error.message)
        res.json({sucess:false,message:error.message});
    }
}

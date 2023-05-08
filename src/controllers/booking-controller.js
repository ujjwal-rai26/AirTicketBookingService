const {StatusCodes}=require('http-status-codes');

const {BookingService}=require('../services/index');

const{createChannel,publishMessage}=require('../utils/messageQueue');
const {REMINDER_BINDING_KEY}=require('../config/serverConfig');

const bookingService=new BookingService();

class BookingController{

   constructor(){
   
   }

   async sendMessageToQueue(req,res)  {

    const channel=await createChannel();
     const payload={
        data:{
            subject:'this is a noti from queue',
            content:'some queue will subscribe this',
            recepientEmail:'ujjwalrai111111@gmail.com',
            notificationTime:'2023-01-01T09:49:00'
        },
        service:'CREATE_TICKET'
     }



    publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));

    return res.status(200).json({
        message:'successfully publish the message'
    });

   }

    async create(req,res) {
        try {
            const response=await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                message:'successfully completed booking',
                success:true,
                err:{},
                data:response
            })
        } 
        catch (error) {
            return res.status(error.statusCode).json({
                message:error.message,
                success:false,
                err:error.explanation,
                data:{}
            })
        }
    }

}



module.exports=BookingController;
    

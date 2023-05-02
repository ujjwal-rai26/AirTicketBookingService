const {StatusCodes}=require('http-status-codes');

const {Booking}=require('../models/index');

const {AppError,ValidationError}=require('../utils/errors/index');

class BookingRepository{

    async create(data){

    try {
        const booking=await Booking.create(data);
        return booking;
    } 
    catch (error) {
        if(error.name=='SequelizeValidationError'){
            throw new ValidationError(error);
        }

        throw new AppError(
            'RepositoryError',
            'Cannot create booking',
            'their is some issue creating the booking',
            StatusCodes.INTERNAL_SERVER_ERROR
        );

    }

}


}

module.exports=BookingRepository;
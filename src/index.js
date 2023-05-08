const express=require('express');
const bodyPareser=require('body-parser');
const app=express();

const {PORT}=require('./config/serverConfig');
const apiRoutes=require('./routes/index');

const db=require('./models/index');

// app.get('/bookingservice/api/v1/home',(req,res)=>{
//     res.json({message:'hitting the booing service'});
// })

const setupAndStartServer=()=>{
   app.use(bodyPareser.json());
   app.use(bodyPareser.urlencoded({extended:true}));

   app.use('/bookingservice/api',apiRoutes);

   app.listen(PORT,()=>{
    console.log(`server start at port ${PORT}`);

    if(process.env.DB_SYNC){
        db.sequelize.sync({alter:true});
    }
   
   })

}


setupAndStartServer();

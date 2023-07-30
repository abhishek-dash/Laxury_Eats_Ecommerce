import {connect,ConnectOptions} from 'mongoose';

export const dbConnect = async() =>{
    await connect(process.env.MONGO_URI!,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        ()=>console.log('Connected to Mongodb successfully'),
        (error)=>console.log(error)
    );
}
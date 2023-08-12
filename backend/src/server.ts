import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path:"./config.env"
});

import express from "express";
import cors from "cors";
import { dbConnect } from './configs/database.config';
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router'
import orderRouter from './routers/order.router';

dbConnect();
const app = express();
app.use(express.json());
// app.use(cors());
// app.options('*',cors());

// In your Express backend
const allowedOrigins = ['http://localhost:4200', 'https://laxuryeats.onrender.com'];

// Configure CORS with options
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
})

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));

// app.use(cors({
//     credentials:true,
//     origin:["http://localhost:4200","http://localhost:5000","https://laxuryeats.onrender.com"]
// }));


app.use("/api/foods",foodRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);

app.use(express.static('public'));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname ,'public','index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Website served on http://localhost:" + port);
    
})
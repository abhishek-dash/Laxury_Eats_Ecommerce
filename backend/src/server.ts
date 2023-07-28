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

const allowedOrigins = ["http://localhost:4200", "https://laxuryeats.onrender.com"];
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        // Check if the request origin is in the list of allowedOrigins or if it is undefined (server-originated request)
        const isAllowedOrigin = (!origin || allowedOrigins.includes(origin));
        callback(null, isAllowedOrigin);
    }
}));

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
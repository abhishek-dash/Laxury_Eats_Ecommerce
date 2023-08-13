import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import express from "express";
import cors from "cors";
import { dbConnect } from './configs/database.config';
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router'
import orderRouter from './routers/order.router';

dbConnect();
const app = express();
app.use(express.json());

// app.use(cors({
//   credentials:true,
//   origin:["http://localhost:4200"]
// }))

const corsOptions = {
  origin: 'https://laxuryeats.onrender.com',
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


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
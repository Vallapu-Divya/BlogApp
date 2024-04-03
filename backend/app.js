import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js'
import blogRouter from './routes/blog-routes.js'
import cors from 'cors'

const app=express();

app.use(cors())
app.use(express.json());

app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose.connect('mongodb+srv://admin:2uZFnrtv_auPePf@cluster0.cad0ve4.mongodb.net/BlogAppl?retryWrites=true&w=majority&appName=Cluster0'
).then(()=> 
app.listen(5000)).then(()=>console.log("localhost 5000...")).catch((err)=>console.log(err));
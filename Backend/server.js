//lets start the journey of backend 
//jay shree ganesh

import express from 'express'
import "dotenv/config"
import cors from "cors"
import cookieParser from 'cookie-parser'
import ConnectDB from './config/dbconnect.js'
import colors from 'colors'
import adminAuthRoutes from './routes/AdminRoutes/auth.admin.routes.js'
import getGymRoute from './routes/AdminRoutes/getgym.admin.routes.js'
import membershiPlansRoutes from './routes/AdminRoutes/membershiPlans.admin.routes.js'
import membershipRoutes from './routes/AdminRoutes/members.admin.routes.js'

console.log(membershipRoutes);
//get the port running on from here
const Port = process.env.PORT

//created a express app in app variaable
const app = express()


const AllowedOrigins = [
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || AllowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, //allows cookies,tokens to be sent to be sent
};

//initialise the require middelware here
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))

//lets make the running endpoint
app.get('/',(req,res)=>res.send(
    "Gym Management System Server"
))

//lets establish the connection with the database and if the connection is established then only listen the server
const StartServer = async () =>{
    const DatabaseConnection = await ConnectDB()
    if(DatabaseConnection){
        
        app.listen(Port,()=>console.log(colors.green(`Server is listening on port ${Port}`)))
    }else{
        console.log(colors.blue(`Halting Operations!!!`)); 
    }
}

app.use('/api/admin/auth',adminAuthRoutes)
app.use('/api/gym/',getGymRoute)
app.use('/api/gym/',membershiPlansRoutes)
app.use('/api/admin/members',membershipRoutes)

StartServer()

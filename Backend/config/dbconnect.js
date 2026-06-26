//this is the configuration file for the mongodb connection

import mongoose from "mongoose"
import colors from 'colors'

const ConnectDB = async () =>{
    const Mongodb_uri = process.env.MONGODB_URI
    try {
        const conn = await mongoose.connect(Mongodb_uri)
        console.log(colors.green("Database Connected Successfully!!"))
        if(conn.connection.readyState===1){
            return true
        }
        return false
    } catch (error) {
        console.log(colors.red("Database Connection Failed"))
        return false
    }
}

export default ConnectDB
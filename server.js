import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/route.js";
import connect from './database/connection.js';

const app = express()

/**app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

connect();




/**application port */
const port=process.env.PORT || 5000;
/**routes */
app.use('/api',router) /**apis */


app.get('/',(req,res)=>{
    try{
        res.json("Get Request")
    } catch(error){
        res.json(error)
    }
})

/**start server only if perfect connection is established */
connect().then(()=>{
    try{
        app.listen(port,()=>{
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch(error){
        console.log("Cannot connect to the server");
    }

}).catch(error=>{
    console.log("Invalid Databse Connection")
})

// app.listen(port,()=>{
//     console.log(`Server connected to http://localhost:${port}`);
// })
import express from 'express'

import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
const app = express()

import { connectDatabase } from './config/dbConnect.js'
import errorMiddleWare from './Middlewares/errors.js'


import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)



process.on('uncaughtException', (err) => {

    console.log(`ERROR : ${err}`);
    console.log("shutting down due to uncaught exception");
    process.exit(1);


});


dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

app.use(express.json({limit: '10mb'}));
app.use(cookieParser())

import productRoutes from "./routes/product.js"
import userRoutes from "./routes/auth.js"
import orderRoutes from "./routes/order.js"
import paymentRoutes from "./routes/payment.js"
import { fileURLToPath } from 'url'
app.use("/api/v1/", productRoutes)




app.use("/api/v1/", userRoutes)
app.use("/api/v1/",orderRoutes)
app.use("/api/v1/",paymentRoutes)

app.use(errorMiddleWare);


if (process.env.NODE_ENV==="PRODUCTION") {
    app.use(express.static(path.join(__dirname,"../frontend/build")));
    app.get('*',(req,res)=>{

res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))

    })
}

// connecting to database 



const server = app.listen(process.env.PORT, () => {

    console.log(`Server working on ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);


})



//handle unhandeled promise rejection 

process.on('unhandledRejection', (err) => {

    console.log(`ERROR : ${err}`);
    console.log('Shutting down server due to unhandeled rejection');
    server.close(() => {

        process.exit(1);

    }
    );

});





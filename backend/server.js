const express = require('express');
const app = express();
const errormiddleware = require('../backend/middleware/errormiddleware');
const productroute = require('./routes/product');

//handling the uncaught exception

process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the Server");
    process.exit(0);
})
//config
require('dotenv').config({path:__dirname + '/.env'}) 

const db = require('../backend/database/db');
const port = process.env.PORT     

//middleware
app.use(express.json());

//routes
app.use('/product', productroute);


//middleware
app.use(errormiddleware);

const server = app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
}); 

// Handling Unhandled promise rejection

process.on('unhandledRejection' , (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting Down the Server Due to Unhandled Rejection");
    server.close(()=>{
        process.exit(0);
    })
})
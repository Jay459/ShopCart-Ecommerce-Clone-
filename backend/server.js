const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
const errormiddleware = require('../backend/middleware/errormiddleware');
const productroute = require('./routes/product');
const userroutes = require('../backend/routes/user');
const orderroutes = require('../backend/routes/order')

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
app.use(cookieparser())

//routes
app.use('/product', productroute);
app.use('/user', userroutes);
app.use('/order',orderroutes);
app.get('/', (req, res) => {
    res.json({
        message:"hello world"
    })
});

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
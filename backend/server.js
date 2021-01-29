const express = require('express');
const app = express();
const productroute = require('./routes/product');

//config
require('dotenv').config({path:__dirname + '/.env'}) 

const db = require('../backend/database/db');
const port = process.env.PORT     

//middleware
app.use(express.json());

//routes
app.use('/product', productroute);


app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});
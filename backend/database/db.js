const mongoose = require('mongoose');
require('dotenv').config()
const url =  process.env.URL

mongoose.connect(url
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).
then(()=>{ 
    console.log("Connected to Database");
}).
catch((err)=>{
    console.log(err);
})

module.exports = mongoose;
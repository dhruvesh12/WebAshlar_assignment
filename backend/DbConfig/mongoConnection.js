var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/WebAshlar';

const dbconnect = ()=>{
    
    mongoose.connect(url).then((result)=>{
    console.log("Sucessfully Connected")
  
    mongoose.Promise = global.Promise;
    
    })
    
    
  }



  module.exports = dbconnect
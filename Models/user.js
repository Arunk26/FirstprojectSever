var mongoose =require('mongoose')
var Schema = mongoose.Schema;


//collection
 var schema = new Schema({
     name : {
         type : String,
         require : true,
         trim : true,
     },
     mobile : {
         type : Number,
         default: null
     },
     email : {
        type : String,
        require : true,
        trim : true,
     },
     password : {
         type : String,
         require : true,
         trim : false
     },
    
     createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedOn: {
        type: Date,
        default: Date.now()
    },
  
 })

 module.exports = mongoose.model('User',schema)
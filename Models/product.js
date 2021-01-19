var mongoose =require('mongoose')
var Schema = mongoose.Schema;

//collection
 var schema = new Schema({
    productName : {
         type : String,
         require : true,
     },
     quantity : {
        type : Number,
        require : true,
     },
     price : {
         type : Number,
         require : true,
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

 module.exports = mongoose.model('Product',schema)
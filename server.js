const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// register
var register = require('./routes/user_api')
app.use('/api/user',register)

// Product
var product = require('./routes/product_api')
app.use('/api/product',product)

//Db connection
var DBconfig = require('./Enivornment/DBconfig');
mongoose.connect(DBconfig.db,{useNewUrlParser:true})
.then(() =>console.log("DB connected"))
.catch(err => {
    console.log("DB Connection Error: " + err.message);
});

var port = process.env.PORT || DBconfig.PORT;
app.listen(port,console.log(`Server Started on port ${port}`))
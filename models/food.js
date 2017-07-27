// ham.js

var credentials = require("../lib/credentials"); 


var mongoose = require("mongoose"); 

// remote db settings 
  var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }  } };
  mongoose.connect(credentials.mongo.development.connectionString, options);


var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error!')); 


var foodSchema = mongoose.Schema({
    id: Number,
    name: String,
    type: String,
    perishable: Boolean,
    purchase: Date,
    expiry: Date,
}); 

module.exports = mongoose.model('Food', foodSchema); 
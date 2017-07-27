var Food require("./models/food"); 

// Insert test lines into the database. 

// new Ham({id: 0, callsign:"A1AAA", operator:"aa aaa", zip: "12121"}).save();

/* 
var foodSchema = mongoose.Schema({
    id: Number, // set by db automatically. 
    name: String,
    type: String,
    perishable: Boolean,
    purchase: Date,
    expiry: Date,
}); 
*/ 


new Food({id:0, 
          name:"mapo tofu", 
          type:"leftovers", 
          perishable: "true" , 
          purchase: new Date(), 
          expiry: new Date(elem.expiry.getTime() + 1*24*60*60000) }).save(); 

// No idea if this qwery will work, but here's the logic at least. 
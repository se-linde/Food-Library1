// Food Library. Front End: React. Back End: Node.js. 
// By Dwayne Linde

/*var foodSchema = mongoose.Schema({

id: Number, // set by db automatically.
name: String,
type: String,
perishable: Boolean,
purchase: Date,
expiry: Date,});
*/


'use strict';

let express = require("express"); 
let bodyParser = require("body-parser"); 
let app = express(); 
let Food = require("./models/food"); 

// Cross domain thingy! 
let cors = require('cors'); 

// Configure the Express app.
// 2112, Just Because. 

app.set('port', process.env.PORT || 2112); 
app.use(express.static(__dirname + '/../public')); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 
app.use('/api', require('cors')()); 
app.use((err, req, res, next) => {
    console.log(err, req, res, next); 
})


// This is where the template engine is set. 
let handlebars = require('express-handlebars'); 
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main'})); 
app.set("view engine", ".html"); 

// Homepage. 

app.get('/', (req, res) => {
    Food.find((err, foods) => {
        if (err) return next (err); 
        res.render('home', {foods: JSON.stringify(foods)});
    });
}); 

// This is the About Section. It's just a static page for now. 

app.get('/about', (req, res) => {
    res.type('text/html'); 
    res.render('about'); 
}); 

// API Section: 

// Single name. 
app.get('/api/food/:name', (req, res, next) => {
    let name = req.params.name; 
    console.log(name); 
    Food.findOne({name: name}, (err, result) => {
        if (err || !result) return next(err); 
        res.json( result ); 
    }); 
}); 

        
// Single expiry date. 
// Might be an issue because of the case
app.get('/api/food/:expiry', (req, res, next) => {
    let expiry = req.params.expiry; 
    console.log(expiry); 
    Food.findOne({expiry: expiry}, (err, result) => {
        if (err || !result) return next(err); 
        res.json(result); 
    });
});

// multiple foods

app.get('/api/foods', (req, res, next) => {
    Food.find((err, result) => {
        if (err || !result) return next(err); 
        res.json(result); 
    }); 
}); 
        
// multiple expiry dates
// Might be a problem due to case. 
app.get('/api/expiry', (req, res, next) => {
    Food.find((err, result) => {
        if (err || !result) return next(err); 
        res.json(result);  
    });
}); 

// Delete from the database. 
app.get('api/food/delete/:id', (req, res, next) => {
    Food.remove({"_id":req.params.id}, (err, result) => {
        if (err) return next (err); 
        // returns the number of items deleted: 
        res.json({"deleted": result.result.n}); 
    });
});

/* var foodSchema = mongoose.Schema({
    id: Number,
    name: String,
    type: String,
    perishable: Boolean,
    purchase: Date,
    expiry: Date,
}); 
*/ 

// Add to the database, via POST. 
app.post('/api/add/', (req, res, next) => {
    // Find and update existing item, or add a new one. 
    if (!req.body._id) { // This inserts a new document. 
        let food = new Food({name:req.body.name, 
                            type:req.body.type,
                            perishable:req.body.perishable,
                            purchase:req.body.purchase,
                            expiry:req.body.expiry}); 
        
            food.save ((err, newFood) => {
            if (err) return next (err); 
            consoleLog(newFood); 
            res.json({updated: 0, _id: newFood._id});     
        }); 
    } else { // This updates the existing document. 
        Food.updateOne({_id: req.body._id}, {name:req.body.name, 
                            type:req.body.type,
                            perishable:req.body.perishable,
                            purchase:req.body.purchase,
                            expiry:req.body.expiry}, (err, result) => {
            if (err) return next (err); 
            res.json({updated: result.nModified, _id: req.body._id}); 
        }); 
    }
}); 


// Add to the db via GET: 
app.get('api/add/:name/:type/:perishable/:purchase/:expiry', (req, res, next) => {
    let name =req.params.name; 
    Food.update({name: name}, {name: name, type: req.params.type, perishable: req.params.perishable, purchase: req.params.purchase, expiry: req.params.expiry}, {upsert: true}, (err, result) => {
        if (err) return next (err); 
        // nModified = 0 for a new item, 1+ for a new item. 
        res.json({updated: result.nModified}); 
    });
});

// 404 error - page not found.
app.use((req, res) => {
    res.type('text/plain'); 
    res.status(404); 
    res.send('404 - Page not Found'); 
}); 

// Tells the port it's listening, and kill command. Port = 2112. 
app.listen(app.get('port'), () => {
    console.log('Express Started on Port 2112 - press Ctrl + C to end.')
}); 







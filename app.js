const express = require('express');
const path = require('path')
const hbs = require('hbs');


//Create Express App
const app = express();

app.use(express.urlencoded({ extended: false}));

//Serve up static docs
app.use(express.static(__dirname + '/public'));

// Helper
//hbs.registerPartials(__dirname + '/views/partials');

// Templating Engine
app.set('view engine', 'hbs');

//Setting up the server

app.listen(3000, ()=>{
    console.log("Server running on port 3000...");
});

app.get("/", (req, res)=>{
    res.render("entry.hbs");
});

app.post("/login", (req,res, next)=>{
    res.sendStatus(200);
});


module.exports = app;
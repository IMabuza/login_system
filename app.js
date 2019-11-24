const express = require('express');
const pageRouter = require('./routes/page');

//Create Express App
const app = express();

app.use(express.urlencoded({ extended: false}));

//Serve up static docs
app.use(express.static(__dirname + '/public'));

// Templating Engine
app.set('view engine', 'hbs');


app.use("/", pageRouter);

//Setting up the server

app.listen(3000, ()=>{
    console.log("Server running on port 3000...");
});

module.exports = app;
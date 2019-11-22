const express = require('express');
const path = require('path')
const hbs = require('hbs');
const db_connect = require('./core/db_connect');
const crypto = require('crypto');
const mysql = require('mysql');


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

app.post("/login", (req,res)=>{

    var email = req.body.email
    console.log(email);

    var pw = req.body.password;
    var hashed_pw = crypto.createHash('sha256').update(pw).digest('hex');
    console.log(hashed_pw);

    // "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"

    var sql_check =  "SELECT * FROM users WHERE email =" + mysql.escape(email);

    //Check if email exists
    db_connect.query(sql_check, (err,rows) => {

        //If anything goes wrong
        if(err) throw err;

        if(rows.length == 0){
        //Email is not in db insert and return 201
        var sql_insert = "INSERT INTO users (email, password) VALUES (" + mysql.escape(email) + "," +  mysql.escape(hashed_pw) + ")"
        db_connect.query(sql_insert, (err, rows) =>{
            if(err) throw err;
            res.sendStatus(201);
        });
        }else{

        var sql_pw = "SELECT password FROM users WHERE email =" + mysql.escape(email);
        console.log(sql_pw);
        db_connect.query(sql_pw, (err, rows) =>{
            if(err) throw err;
            if(hashed_pw === rows[0].password){
                res.sendStatus(200);
            }else{
                res.status(404);
                //res.render('entry.hbd', {message: ""})
            }
        });
        }

    });
});


module.exports = app;
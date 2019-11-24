const express = require('express');
const hbs = require('hbs');
const db_connect = require('../core/db_connect');
const crypto = require('crypto');
const mysql = require('mysql');
const router = express.Router()

//Home page ---- login/registration page
router.get("/", (req, res)=>{
    res.render("entry.hbs");
});

//When login button pressed
router.post("/login", (req,res)=>{

    var email = req.body.email;

    var password = req.body.password;
    var hashed_pw = crypto.createHash('sha256').update(password).digest('hex');
    var hashed_pw_str = hashed_pw.toString();

    var sql_check =  "SELECT * FROM users WHERE email =" + mysql.escape(email);

    //Check if email exists
    db_connect.query(sql_check, (err,rows) => {

        //If anything goes wrong
        if(err) throw err;

        if(rows.length < 1){
        //Email is not in db insert along with password and return 201
        var sql_insert = "INSERT INTO users (email, password) VALUES (" + mysql.escape(email) + "," +  mysql.escape(hashed_pw) + ")"
        db_connect.query(sql_insert, (err, rows) =>{
            if(err) throw err;
            res.sendStatus(201); //Created
        });
        }else{

        //Email is in db. Check if email matches password and return 200 or 404
        var sql_pw = "SELECT password FROM users WHERE email =" + mysql.escape(email);
        console.log(sql_pw);
        db_connect.query(sql_pw, (err, rows) =>{
            if(err) throw err;

            var stored_pw_str = rows[0].password.toString();
            var isEqual = (stored_pw_str == hashed_pw_str);

            if(!isEqual) res.sendStatus(404); // Not Found

            res.sendStatus(200); //Found -- OK

            
        });
        }

    });
});

module.exports = router;
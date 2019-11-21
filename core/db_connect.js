const util = require('util');
const mysql = require('mysql');

const db_connect = mysql.createConnection({
    connectionLimit: 10,
    host:"localhost",
    user:"user",
    password:"pass",
    database:"db"
});

db_coonect.getConnection((err, connection) => {
    if(err){
        console.error("Could not connect to the database");
    
    }

    if(connection){
        connection.release();
        return;
    }
});

db_connect.query = util.promisify(db_connect.query);

module.exports = db_connect;
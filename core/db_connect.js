const db_connect = require('mysql');

const connection = db_connect.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');

  var sql = "CREATE TABLE IF NOT EXISTS users (id int(11) AUTO_INCREMENT PRIMARY KEY, email varchar(255), password varchar(255))";
  connection.query(sql, (err,result) => {
    if(err) throw err;
    console.log("Table users created");
  });
});



module.exports = connection;
const db_connect = require('mysql');

const connection = db_connect.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'db'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;

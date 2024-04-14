//module 
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Ksrao96@",
    database: "testdb"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  })

  module.exports = {'dbCon': con}
    

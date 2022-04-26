const mysql = require('mysql');


// use mysql;
// grant all on testdb.* to 'root'@'%';
// flush privileges;

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'long8520',
    database:'smart_home'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection; 
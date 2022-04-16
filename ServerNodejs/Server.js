const http = require('http');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { status } = require('express/lib/response');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// use mysql;
// grant all on testdb.* to 'root'@'%';
// flush privileges;

app.post('/test', (req, res) => {
    var sql = 'SELECT * FROM student';
    db.query(sql,function (err, result) {
            res.send( JSON.stringify(result))
    });
});

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'long8520',
    database:'testdb'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/logout', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var sql = 'SELECT * FROM student WHERE email = ? AND password = ?';
    db.query(sql, [email, password], function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        if(data[0] != null){
            res.send( JSON.stringify({
                status:'true', 
                email: req.body.email,
                password:req.body.password
            }));
        }  
        else {
            res.send( JSON.stringify({
                status:'false', 
                email: req.body.email,
                password:req.body.password
            }));
        }
    });
});

app.post('/temp', (req, res) => {
    var sql = 'SELECT * FROM status';
    console.log(req.body);
    db.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var status = data[0].status;
        console.log(status);
        if (status == "OFF"){
            var sql = "UPDATE status SET status ='ON'";
            db.query(sql, function (err, result) {
                console.log("OFF -> ON");
                res.send( JSON.stringify({
                    status:'ON', 
                }));
            });
        }
        else{
            var sql = "UPDATE status SET status ='OFF'";
            db.query(sql, function (err, result) {
                console.log("ON ->> OFF");
                res.send( JSON.stringify({
                    status:'OFF', 
                }));
            });
        }
    });
});

app.post('/temp_', (req, res) => {
    var sql = 'SELECT * FROM status';
    console.log(req.body);
    db.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var status = data[0].status;
        console.log(status);
        if (status == "OFF"){
            var sql = "UPDATE status SET status ='ON'";
            db.query(sql, function (err, result) {
                console.log("OFF -> ON");
                res.send( JSON.stringify({
                    status:'ON', 
                }));
            });
        }
        else{
            var sql = "UPDATE status SET status ='OFF'";
            db.query(sql, function (err, result) {
                console.log("ON ->> OFF");
                res.send( JSON.stringify({
                    status:'OFF', 
                }));
            });
        }
    });
});

app.post('/status', (req, res) => {
    var sql = 'SELECT * FROM status';
    console.log(req.body);
    db.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var status = data[0].status;
        console.log(status);
        if (status == "OFF"){
            var sql = "UPDATE status SET status ='ON'";
            db.query(sql, function (err, result) {
                console.log("OFF -> ON");
                res.send( JSON.stringify({
                    status:'ON', 
                }));
            });
        }
        else{
            var sql = "UPDATE status SET status ='OFF'";
            db.query(sql, function (err, result) {
                console.log("ON ->> OFF");
                res.send( JSON.stringify({
                    status:'OFF', 
                }));
            });
        }
    });
});

app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var sql = 'SELECT * FROM student WHERE email = ? AND password = ?';
    db.query(sql, [email, password], function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        if(data[0] != null){
            res.send( JSON.stringify({
                status:'true', 
                email: req.body.email,
                password:req.body.password
            }));
        }  
        else {
            res.send( JSON.stringify({
                status:'false', 
                email: req.body.email,
                password:req.body.password
            }));
        }
        
    });
});

app.post('/data', (req, res) => {
    console.log(req.body);
    var data = {email: req.body.email, password:req.body.password};
    var sql = 'insert into student SET ?';
    db.query(sql,data, (err, result) => {
        if(err) throw err;
        console.log(result);
        
        res.send( JSON.stringify({
            status:'Data success', 
            id: null,
            email: req.body.email,
            password:req.body.password
        }));
    })
});

app.listen(3001, '192.168.1.111', () => {
    console.log("Server is running on port 3001");
});

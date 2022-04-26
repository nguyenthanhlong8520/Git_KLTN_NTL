const express = require('express');
var router = express.Router();
var connection = require('../models/dataPool')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
    // res.send("ok");
    console.log(req.body.email);
    var data = {email: req.body.email, password:req.body.password};
    var sql = "INSERT INTO accounts SET ?";
    var sql_ = "Select * from accounts Where email = ?";
    
    connection.query(sql_, req.body.email, function (err, result) {
        if (err) throw err;
        // console.log(result);
        if(result == ""){
            connection.query(sql, data, function (err, result) {
                if (err) throw err;
                res.send(result);
            });
        }
        else{
            res.send('User invalid');
        }
    });
})

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {
        connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(err, results) {
            if (err) throw err;
            if(results == ""){
                    res.json({
                        message: 'login fail'
                    });
            }
            else{
                var token = jwt.sign({ 
                    _id: results[0].id
                }, 'mk')
                return res.json({
                    message: 'Oke',
                    token: token,
                    result: results
                });
                //console.log(results[0].id);
            }
        });
    } 
    else {
         res.send("Email or password is not NUll")
    }
})

router.post('/logout', (req, res) => {
    if (req.headers && req.headers.authorization){
        res.json({
            message: 'oke'
        })
    }
    else {
        res.json({
            message: 'co cai nit'
        })
    }
})

module.exports = router;
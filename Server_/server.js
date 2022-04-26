const express = require('express');
var app = express();
var bodyParser = require('body-parser');

var router_02 = require('./router/account.js')
var router_03 = require('./router/remote.js')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.json('Home');
})

app.post('/', (req, res) => {
    res.json('Home post');
})

app.use('/account', router_02)
app.use('/remote', router_03)

app.listen(3000, () => {
    console.log(`Server start on port 3000`);
})
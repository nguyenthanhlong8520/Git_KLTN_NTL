const express = require('express');
var router = express.Router();
var connection = require('../models/dataPool');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');

const host = 'airconditioner.cloud.shiftr.io';
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'airconditioner',
  password: 'long8520',
  reconnectPeriod: 1000,
})

const topic = 'home/room_01/air-conditioner'
const topic_02 = 'home/room_02/air-conditioner'


client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic_02, topic], () => {
      console.log(`Subscribe '${topic}'`)
    })
    
})
  
client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})


router.post('/changeStatus', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    console.log(req.body);
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var status = data[0].operation_status;
        var temp = data[0].temperature_value;
        //console.log(status);
        if (status == "OFF"){
            var sql = "UPDATE air_conditioner_data SET operation_status ='ON'";
            connection.query(sql, function (err, result) {
                console.log("OFF -> ON");
                res.send( JSON.stringify({
                    operation_status:'ON',
                    temperature_value: temp
                }));
            });
            client.publish(topic, 'ON', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else{
            var sql = "UPDATE air_conditioner_data SET operation_status ='OFF'";
            connection.query(sql, function (err, result) {
                console.log("ON ->> OFF");
                res.send(JSON.stringify({
                    operation_status:'OFF',
                    temperature_value: temp
                }));
            });
            client.publish(topic, 'OFF', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
              })
        }
    });
})

router.post('/changeMode', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var operation_mode = data[0].operation_mode;
        //console.log(status);
        if (operation_mode == "AUTO"){
            var sql = "UPDATE air_conditioner_data SET operation_mode ='COOL'";
            connection.query(sql, function (err, result) {
                console.log("AUTO -> COOL");
                res.send( JSON.stringify({
                    operation_mode:'COOL'
                }));
            });
        }
        else if (operation_mode == "COOL"){
            var sql = "UPDATE air_conditioner_data SET operation_mode ='DRY'";
            connection.query(sql, function (err, result) {
                console.log("COOL ->> DRY");
                res.send(JSON.stringify({
                    operation_mode: 'DRY'
                }));
            });
        }
        else if (operation_mode == "DRY"){
            var sql = "UPDATE air_conditioner_data SET operation_mode ='AUTO'";
            connection.query(sql, function (err, result) {
                console.log("DRY ->> AUTO");
                res.send(JSON.stringify({
                    operation_mode: 'AUTO'
                }));
            });
        }
    });
})

router.post('/increaseTemp', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var temp_value = data[0].temperature_value + 1;
        var sql = "UPDATE air_conditioner_data SET temperature_value = ?";
        connection.query(sql, temp_value, function (err, result) {});

        res.send(JSON.stringify({
            temp_value: temp_value, 
        }));

    });

    // var sql = 'SELECT * FROM air_conditioner_data';
    // connection.query(sql,function (err, result) {
    //     var data =  JSON.parse(JSON.stringify(result));
    //     console.log(data);
    //     var temp_value = data[0].temperature_value;
    //     res.send( JSON.stringify({
    //         temp_value:temp_value, 
    //     }));
    // });
})

router.post('/decreaseTemp', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var temp_value = data[0].temperature_value - 1;
        var sql = "UPDATE air_conditioner_data SET temperature_value = ?";
        connection.query(sql, temp_value, function (err, result) {});
        res.send(JSON.stringify({
            temp_value: temp_value, 
        }));
    });
})

router.post('/updateTemp', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    console.log(req.body);
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var temp = data[0].temperature_value;
        res.send( JSON.stringify({
                temperature_value: temp
        }));
           
    });
})


module.exports = router;
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

const myFunc = () => {
    var timeNow = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0];
    timeNow = addTimes(timeNow, '07:00:00');
    //console.log(timeNow);
    var sql = 'SELECT * FROM auto_sleep';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var modeAutoSleep = data[0].modeAutoSleep;
        var temp_value;
        var message_mqtt = String(temp_value);
        if (modeAutoSleep == "ON"){
                // AUTO
                var time_0 = data[0].time_0;
                var time_1 = data[0].time_1;
                var time_2 = data[0].time_2;
                var time_3 = data[0].time_3;
                // var time_4 = data[0].time_4;

                var t0 = String(data[0].t0);
                var t1 = String(data[0].t1);
                var t2 = String(data[0].t2);
                var t3 = String(data[0].t3);

                //console.log(time_0 + " " + time_1 + " " + time_2 + " " + time_3 + " " + time_4);

                if (time_0 < timeNow && time_1 > timeNow){
                    // to do
                    console.log("parse 1");
                    client.publish(topic, t0, { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                }
                else if (time_1 < timeNow && time_2 > timeNow){
                    // to do
                    console.log("parse 2");
                    client.publish(topic, t1, { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                }
                else if (time_2 < timeNow && time_3 > timeNow){
                    // to do
                    console.log("parse 3");
                    client.publish(topic, t2, { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                }
                else {
                    // todo 
                    console.log("parse 4");
                    client.publish(topic, t3, { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                }

        }
    });
}

setInterval(myFunc, 2*1000);

// Convert a time in hh:mm format to minutes
function timeToMins(time) {
    var b = time.split(':');
    return b[0]*60 + +b[1];
}
  
// Convert minutes to a time in format hh:mm
// Returned value is in range 00  to 24 hrs
function timeFromMins(mins) {
    function z(n){return (n<10? '0':'') + n;}
    var h = (mins/60 |0) % 24;
    var m = mins % 60;
    return z(h) + ':' + z(m);
}
  
// Add two times in hh:mm format
function addTimes(t0, t1) {
    return timeFromMins(timeToMins(t0) + timeToMins(t1));
}

router.post('/statusAutonatic' , (req, res) =>{
    var sql = 'SELECT * FROM auto_sleep';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var modeAutoSleep = data[0].modeAutoSleep;
        if (modeAutoSleep == "OFF"){
            var sql = "UPDATE auto_sleep SET modeAutoSleep ='ON'";
            connection.query(sql, function (err, result) {
                console.log("OFF -> ON");
                res.send( JSON.stringify({
                    modeAutoSleep:'ON',
                }));
                // MQTT
            });
        }
        else {
            var sql = "UPDATE auto_sleep SET modeAutoSleep ='OFF'";
            connection.query(sql, function (err, result) {
                console.log("ON -> OFF");
                res.send( JSON.stringify({
                    modeAutoSleep:'OFF',
                }));
            });
            // MQTT
        }
        // var t0 = data[0].t0;
        // var time_1 = data[0].time_1;
        // console.log(time_1.toString());
    });    
})


router.post('/setParamsAutomatic' , (req, res) =>{
        
        var tempStart = req.body.tempStart;
        var tempMax = req.body.tempMax;
        let timeStart = req.body.timeStart;
    
        var time_1 = addTimes(timeStart, '01:00:00');
        var time_2 = addTimes(time_1, '02:00:00');
        var time_3 = addTimes(time_2, '03:00:00');
        var time_4 = addTimes(time_3, '02:00:00');

        var t1 = parseInt(tempStart) - 2;
        var t2 = parseInt(t1) + 1;
        var t3 = parseInt(t2) + 2;

        //console.log(tempStart + " " + tempMax + " " + timeStart + " " + time_1 + " " + time_2 + " " + time_3 + " " + time_4);
        console.log(tempStart + " " + t1 + " " + t2 + " " + t3);

        var sql = "UPDATE auto_sleep SET t0 = ?";
        connection.query(sql, tempStart, function (err, result) {
            if (err) throw err;
        });

        var sql = "UPDATE auto_sleep SET t1 = ?";
        connection.query(sql, t1, function (err, result) {
            if (err) throw err;
        });

        var sql = "UPDATE auto_sleep SET t2 = ?";
        connection.query(sql, t2, function (err, result) {
            if (err) throw err;
        });

        var sql = "UPDATE auto_sleep SET t3 = ?";
        connection.query(sql, t3, function (err, result) {
            if (err) throw err;
        });

        var sql = "UPDATE auto_sleep SET tmax = ?";
        connection.query(sql, tempMax, function (err, result) {
            if (err) throw err;
        });

        var sql = "UPDATE auto_sleep SET time_0 = ?";
        connection.query(sql, timeStart, function (err, result) {
            if (err) throw err;
        });


        var sql = "UPDATE auto_sleep SET time_1 = ?";
        connection.query(sql, time_1, function (err, result) {
            if (err) throw err;
        });

        var sql = "UPDATE auto_sleep SET time_2 = ?";
        connection.query(sql, time_2, function (err, result) {
            if (err) throw err;
        });

        var sql = "UPDATE auto_sleep SET time_3 = ?";
        connection.query(sql, time_3, function (err, result) {
            if (err) throw err;
        });

        var sql = "UPDATE auto_sleep SET time_4 = ?";
        connection.query(sql, time_4, function (err, result) {
            if (err) throw err;
            res.send( JSON.stringify({
                status: 'oke'
            }));
        }); 
})

router.post('/changeStatus', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    //console.log(req.body);
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
            client.publish(topic, 'COOL', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (operation_mode == "COOL"){
            var sql = "UPDATE air_conditioner_data SET operation_mode ='DRY'";
            connection.query(sql, function (err, result) {
                console.log("COOL ->> DRY");
                res.send(JSON.stringify({
                    operation_mode: 'DRY'
                }));
            });
            client.publish(topic, 'DRY', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (operation_mode == "DRY"){
            var sql = "UPDATE air_conditioner_data SET operation_mode ='AUTO'";
            connection.query(sql, function (err, result) {
                console.log("DRY ->> AUTO");
                res.send(JSON.stringify({
                    operation_mode: 'AUTO'
                }));
            });
            client.publish(topic, 'AUTO', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
    });
})

router.post('/increaseTemp', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var temp_value = data[0].temperature_value + 1;
        var sql = "UPDATE air_conditioner_data SET temperature_value = ?";
        var message_mqtt = String(temp_value);
        connection.query(sql, temp_value, function (err, result) {});

        res.send(JSON.stringify({
            temp_value: temp_value, 
        }));

        client.publish(topic, message_mqtt, { qos: 0, retain: false }, (error) => {
            if (error) {
              console.error(error)
            }
        })

    });
})

router.post('/decreaseTemp', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var temp_value = data[0].temperature_value - 1;
        var sql = "UPDATE air_conditioner_data SET temperature_value = ?";
        var message_mqtt = String(temp_value);
        connection.query(sql, temp_value, function (err, result) {});
        res.send(JSON.stringify({
            temp_value: temp_value, 
        }));

        client.publish(topic, message_mqtt, { qos: 0, retain: false }, (error) => {
            if (error) {
              console.error(error)
            }
        })
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
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

function temperature_phase(value, x)
{
    var flagg, data;
    var sql = 'SELECT * FROM air_conditioner_data';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        data =  JSON.parse(JSON.stringify(result));
        flagg = data[0].temperature_value;
        
        if(value == 0){
            var sql_ = 'UPDATE data_auto SET temp_0 = "' + flagg + '" where id = 82';
            connection.query(sql_, function (err, result) {
                if (err) throw err;
            });  
           
        }
        else if (value == 1){
            var sql_ = 'UPDATE data_auto SET temp_1 = "' + flagg + '" where id = 82';
            connection.query(sql_, function (err, result) {
                if (err) throw err;
            });   
              
        }
        else if (value == 2){
            var sql_ = 'UPDATE data_auto SET temp_2 = "' + flagg + '" where id = 82';
            connection.query(sql_, function (err, result) {
                if (err) throw err;  
            });   
              
        }
        else if (value == 3){
            var sql_ = 'UPDATE data_auto SET temp_3 = "' + flagg + '" where id = 82';
            connection.query(sql_, function (err, result) {
                if (err) throw err;
            });   
            var sql_ = 'UPDATE auto_sleep SET t3 = "' + x + '" where id = 1';
            connection.query(sql_, function (err, result) {
                if (err) throw err;
            });   
        }
    });
}

function flag(t1, t2, t3, t4)
{
    var sql = 'SELECT * FROM auto_sleep';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        var data =  JSON.parse(JSON.stringify(result));
        var flagg = data[0].tmax;
        if( flagg == 1 ){
            // insert
            var sql = 'select * from data_auto where id = 82';
            connection.query(sql, function (err, result) {
                data =  JSON.parse(JSON.stringify(result));
                var data_ = {temp_0: data[0].temp_0, temp_1: data[0].temp_1, temp_2: data[0].temp_2, temp_3: data[0].temp_3};
                var sql = "INSERT INTO data_auto SET ?";                
                connection.query(sql, data_, function (err, result) {
                if (err) throw err;
                });
            });

            var sql = "UPDATE auto_sleep SET modeAutoSleep = 'OFF'";                
            connection.query(sql, function (err, result) {
            if (err) throw err;
            });

            var sql = "UPDATE auto_sleep SET tmax = 0";                
            connection.query(sql, function (err, result) {
            if (err) throw err;
            });  
        }
    });
}

const myFunc = () => {
    var timeNow = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0];
    timeNow = addTimes(timeNow, '07:00:00');
    //console.log(timeNow);
    var sql = 'SELECT * FROM auto_sleep';
    connection.query(sql, function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var modeAutoSleep = data[0].modeAutoSleep;
        if (modeAutoSleep == "ON"){
                if (data[0].time_0 < timeNow && data[0].time_1 > timeNow){
                    // to do
                    console.log("parse 1");
                    temperature_phase(0);
                    //console.log(t1)
                    client.publish(topic, String(data[0].t0), { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })

                    client.publish(topic, 'Flow_High', { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                }
                else if (data[0].time_1 < timeNow && data[0].time_2 > timeNow){
                    // to do
                    console.log("parse 2");
                    temperature_phase(1);
                    client.publish(topic, String(data[0].t1), { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                    client.publish(topic, 'Flow_Mid', { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                }
                else if (data[0].time_2 < timeNow && data[0].time_3 > timeNow){
                    // to do
                    console.log("parse 3");
                    temperature_phase(2);
                    client.publish(topic, String(data[0].t2), { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                    client.publish(topic, 'Flow_Low', { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                }
                else if (data[0].time_3 < timeNow && data[0].time_4 > timeNow){
                    // todo 
                    console.log("parse 4");
                    temperature_phase(3);
                    client.publish(topic, String(data[0].t3), { qos: 0, retain: false }, (error) => {
                        if (error) {
                          console.error(error)
                        }
                    })
                }
                else if (data[0].time_4 < timeNow){
                    flag(25, 26, 27, 28);
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
    var sql = 'SELECT AVG(temp_0) as avg from data_auto';
    connection.query(sql, function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var avg = data[0].avg;
        avg = avg.toFixed();
        console.log(avg)   
        if (err) throw err;
        var sql = "UPDATE auto_sleep SET t0 = ?";
        connection.query(sql, avg, function (err, result) {
            if (err) throw err;
        });
    });

    var sql = 'SELECT AVG(temp_1) as avg from data_auto';
    connection.query(sql, function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var avg = data[0].avg;
        avg = avg.toFixed();
        console.log(avg)   
        if (err) throw err;
        var sql = "UPDATE auto_sleep SET t1 = ?";
        connection.query(sql, avg, function (err, result) {
            if (err) throw err;
        });
    });

    var sql = 'SELECT AVG(temp_2) as avg from data_auto';
    connection.query(sql, function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var avg = data[0].avg;
        avg = avg.toFixed();
        console.log(avg)   
        if (err) throw err;
        var sql = "UPDATE auto_sleep SET t2 = ?";
        connection.query(sql, avg, function (err, result) {
            if (err) throw err;
        });
    });

    var sql = 'SELECT AVG(temp_3) as avg from data_auto';
    connection.query(sql, function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var avg = data[0].avg;
        avg = avg.toFixed();
        console.log(avg)   
        if (err) throw err;
        var sql = "UPDATE auto_sleep SET t3 = ?";
        connection.query(sql, avg, function (err, result) {
            if (err) throw err;
        });
    });
    

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
            var sql = "UPDATE auto_sleep SET tmax = 1";
            connection.query(sql, function (err, result) {
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
    
        let timeStart = req.body.timeStart;
    
        // var time_1 = addTimes(timeStart, '01:00:00');
        // var time_2 = addTimes(time_1, '02:00:00');
        // var time_3 = addTimes(time_2, '03:00:00');
        // var time_4 = addTimes(time_3, '02:00:00');

        var time_1 = addTimes(timeStart, '00:01:00');
        var time_2 = addTimes(time_1, '00:01:00');
        var time_3 = addTimes(time_2, '00:01:00');
        var time_4 = addTimes(time_3, '00:01:00');

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
        if (operation_mode == "Auto"){
            var sql = "UPDATE air_conditioner_data SET operation_mode ='Cool'";
            connection.query(sql, function (err, result) {
                console.log("AUTO -> COOL");
                res.send( JSON.stringify({
                    operation_mode:'Cool'
                }));
            });
            client.publish(topic, 'Cool', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (operation_mode == "Cool"){
            var sql = "UPDATE air_conditioner_data SET operation_mode ='Dry'";
            connection.query(sql, function (err, result) {
                console.log("COOL ->> DRY");
                res.send(JSON.stringify({
                    operation_mode: 'Dry'
                }));
            });
            client.publish(topic, 'Dry', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (operation_mode == "Dry"){
            var sql = "UPDATE air_conditioner_data SET operation_mode ='Heating'";
            connection.query(sql, function (err, result) {
                console.log("DRY ->> HEATING");
                res.send(JSON.stringify({
                    operation_mode: 'Heating'
                }));
            });
            client.publish(topic, 'Heating', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (operation_mode == "Heating"){
            var sql = "UPDATE air_conditioner_data SET operation_mode ='Auto'";
            connection.query(sql, function (err, result) {
                console.log("Heating ->> AUTO");
                res.send(JSON.stringify({
                    operation_mode: 'Auto'
                }));
            });
            client.publish(topic, 'Auto', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
    });
})

router.post('/increaseTemp', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    var temp_;
    var timeNow = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0];
    timeNow = addTimes(timeNow, '07:00:00');
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var temp_value = data[0].temperature_value + 1;
        
        var sql = "UPDATE air_conditioner_data SET temperature_value = ?";
        var message_mqtt = String(temp_value);
        connection.query(sql, temp_value, function (err, result) {});

        res.send(JSON.stringify({
            temp_value: temp_value, 
        }));
        temp_ = temp_value;

        client.publish(topic, message_mqtt, { qos: 0, retain: false }, (error) => {
            if (error) {
              console.error(error)
            }
        })
    });
})

router.post('/decreaseTemp', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    var temp_;
    var timeNow = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0];
    timeNow = addTimes(timeNow, '07:00:00');
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var temp_value = data[0].temperature_value - 1;
        var sql = "UPDATE air_conditioner_data SET temperature_value = ?";
        var message_mqtt = String(temp_value);
        temp_ = temp_value;
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

router.post('/dataTemp', (req, res) => {
    var sql = 'SELECT * FROM auto_sleep';
    // console.log(req.body);
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        console.log(data[0].t0)
        var t0 = data[0].t0;
        var tmax = data[0].tmax;
        var t1 = data[0].t1;
        var t2 = data[0].t2;
        var t3 = data[0].t3;
        res.send( JSON.stringify({
                t0 : t0,
                tmax : tmax,
                t1 : t1,
                t2 : t2,
                t3 : t3 
        }));
    });
})

router.post('/changeFlow', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var Flow_rate = data[0].air_flow_rate;
        //console.log(status);
        if (Flow_rate == "Low"){
            var sql = "UPDATE air_conditioner_data SET air_flow_rate ='Mid'";
            connection.query(sql, function (err, result) {
                console.log("Low -> Mid");
                res.send( JSON.stringify({
                    Flow_rate:'Mid'
                }));
            });
            client.publish(topic, 'Flow_Mid', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (Flow_rate == "Mid"){
            var sql = "UPDATE air_conditioner_data SET air_flow_rate ='High'";
            connection.query(sql, function (err, result) {
                console.log("Mid ->> High");
                res.send(JSON.stringify({
                    Flow_rate: 'High'
                }));
            });
            client.publish(topic, 'Flow_High', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (Flow_rate == "High"){
            var sql = "UPDATE air_conditioner_data SET air_flow_rate ='Auto'";
            connection.query(sql, function (err, result) {
                console.log("High ->> AUTO");
                res.send(JSON.stringify({
                    Flow_rate: 'Auto'
                }));
            });
            client.publish(topic, 'Flow_Auto', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (Flow_rate == "Auto"){
            var sql = "UPDATE air_conditioner_data SET air_flow_rate ='Low'";
            connection.query(sql, function (err, result) {
                console.log("Auto ->> Low");
                res.send(JSON.stringify({
                    Flow_rate: 'Low'
                }));
            });
            client.publish(topic, 'Flow_Low', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
    });
})


router.post('/changePowerSaving', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var power_saving = data[0].power_saving;
        //console.log(status);
        if (power_saving == "PowerSaving"){
            var sql = "UPDATE air_conditioner_data SET power_saving ='Normal'";
            connection.query(sql, function (err, result) {
                console.log("PowerSaving -> Normal");
                res.send( JSON.stringify({
                    power_saving:'Normal'
                }));
            });
            client.publish(topic, 'Normal', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (power_saving == "Normal"){
            var sql = "UPDATE air_conditioner_data SET power_saving ='PowerSaving'";
            connection.query(sql, function (err, result) {
                console.log("Normal ->> PowerSaving");
                res.send(JSON.stringify({
                    power_saving: 'Power Saving'
                }));
            });
            client.publish(topic, 'Power', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
    });
})

router.post('/changeDirection_vertical', (req, res) => {
    var sql = 'SELECT * FROM air_conditioner_data';
    connection.query(sql,function (err, result) {
        var data =  JSON.parse(JSON.stringify(result));
        var direction = data[0].direction_vertical;
        //console.log(status);
        if (direction == "Up"){
            var sql = "UPDATE air_conditioner_data SET direction_vertical ='Central'";
            connection.query(sql, function (err, result) {
                console.log("Up -> Central");
                res.send( JSON.stringify({
                    direction:'Central'
                }));
            });
            client.publish(topic, 'Central_Direction_Vertical', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (direction == "Central"){
            var sql = "UPDATE air_conditioner_data SET direction_vertical ='Down'";
            connection.query(sql, function (err, result) {
                console.log("Central ->> Dow");
                res.send(JSON.stringify({
                    direction: 'Down'
                }));
            });
            client.publish(topic, 'Down_Vertical', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
        else if (direction == "Down"){
            var sql = "UPDATE air_conditioner_data SET direction_vertical ='Up'";
            connection.query(sql, function (err, result) {
                console.log("Dow ->> Up");
                res.send(JSON.stringify({
                    direction: 'Up'
                }));
            });
            client.publish(topic, 'Up_Vertical', { qos: 0, retain: false }, (error) => {
                if (error) {
                  console.error(error)
                }
            })
        }
    });
})

module.exports = router;
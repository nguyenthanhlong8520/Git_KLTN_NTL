import react, {Component, useState, useContext, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity, 
    ImageBackground,
    StatusBar,
    Dimensions,
    TextInput,
    Image, 
    Button
} from 'react-native'
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay/lib";
import COLORS from '../Style/Color';
import STYLES from '../Style/Style';
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import {BASE_URL} from '../config';
import CircularProcess from 'react-native-circular-progress-indicator'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default HomeScreen = ({ navigation }) => {
    const [status, setStatus] = useState('OFF');
    const [booleanStatus, setBoleanStatus] = useState('OFF');
    const [temp, setTemp] = useState("0");
    const [mode, setMode] = useState('DRY');
    const [flow, setFlow] = useState('HIGH');
    const [powerSaving, setPowerSaving] = useState('Power Saving');
    const [direction, setSetDirection] = useState('UP');
    const {dataChart} = useContext(AuthContext);

    const getData = () => {
      axios
      .post(`${BASE_URL}/remote/getData`)
      .then(res => {
        //console.log(res.data);
        var data =  JSON.parse(JSON.stringify(res.data));
        setStatus(data['operation_status']);
        setTemp(data['temperature_value']);
        setMode(data['operation_mode']);
        setFlow(data['flow']);
        setPowerSaving(data['power']);
        setSetDirection(data['direction']);
      })
      .catch(e => {
        //console.log(`change status error ${e}`);
      }); 
  };

    const changeStatus = () => {
        axios
        .post(`${BASE_URL}/remote/changeStatus`)
        .then(res => {
          console.log(res.data);
          var data =  JSON.parse(JSON.stringify(res.data));
          //var temp = res.data[0].temperature_value;
          //console.log(data.temperature_value);
          setStatus(data['operation_status']);
          setTemp(data['temperature_value']);
          var milliseconds = (new Date()).getMilliseconds();
          console.log(milliseconds);
        })
        .catch(e => {
          //console.log(`change status error ${e}`);
        }); 
    };

    const increaseTemp = () => {
        axios
        .post(`${BASE_URL}/remote/increaseTemp`)
        .then(res => {
          var data =  JSON.parse(JSON.stringify(res.data));
          var temp_value = data['temp_value'];
          setTemp(temp_value)
        })
        .catch(e => {
          console.log(`increase error ${e}`);
        }); 
    };

    const decreaseTemp = () => {
        axios
        .post(`${BASE_URL}/remote/decreaseTemp`)
        .then(res => {
          console.log(res.data);
          var data =  JSON.parse(JSON.stringify(res.data));
          var temp_value = data['temp_value'];
          setTemp(temp_value)
        })
        .catch(e => {
          console.log(`decrease error ${e}`);
        }); 
    };

    const changeMode = () => {
        axios
        .post(`${BASE_URL}/remote/changeMode`)
        .then(res => {
          console.log(res.data);
          var milliseconds = (new Date()).getMilliseconds();
          console.log(milliseconds);
          var data =  JSON.parse(JSON.stringify(res.data));
          var mode = data['operation_mode'];
          setMode(mode)
          
        })
        .catch(e => {
          console.log(`change mode error ${e}`);
        }); 
    };

    const changeFlow = () => {
        axios
        .post(`${BASE_URL}/remote/changeFlow`)
        .then(res => {
          console.log(res.data);
          var milliseconds = (new Date()).getMilliseconds();
          console.log(milliseconds);
          var data =  JSON.parse(JSON.stringify(res.data));
          var flow = data['Flow_rate'];
          setFlow(flow)
        })
        .catch(e => {
          console.log(`change flow error ${e}`);
        }); 
    };

    const changePowerSaving = () => {
        axios
        .post(`${BASE_URL}/remote/changePowerSaving`)
        .then(res => {
          console.log(res.data);
          var data =  JSON.parse(JSON.stringify(res.data));
          var power_saving = data['power_saving'];
          setPowerSaving(power_saving)
        })
        .catch(e => {
          console.log(`change power saving error ${e}`);
        });   
    };

    const changeDirection = () => {
        axios
        .post(`${BASE_URL}/remote/changeDirection_vertical`)
        .then(res => {
          console.log(res.data);
          var data =  JSON.parse(JSON.stringify(res.data));
          var direction = data['direction'];
          setSetDirection(direction)
        })
        .catch(e => {
          console.log(`change direction error ${e}`);
        }); 
    };

    
    useEffect(() => {
      const interval = setInterval(() => {
        getData();
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
        <ImageBackground style = {{height: '100%', width:'100%'}} source={require('../img/bg1.jpg')} resizeMode='stretch'>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={{flex:1}}>
                <View style={{height: '120%', width:'100%',  top: -20}}>
                <View style={{ width:'75%', 
                                   height:20, 
                                   flexDirection: 'row', 
                                   marginTop:15, 
                                   alignItems: 'center', 
                                   justifyContent: 'center',
                                   left:35
                                }}>
                            <View style={{ width:'90%', height: '250%', flexDirection: 'row', marginTop:30}}>
                            <TouchableOpacity style={{height: '140%', width: '25%', marginTop: 30, 
                                                      marginRight:100, marginLeft:5, alignItems: 'center', 
                                                      justifyContent: 'center', borderWidth:1, borderRadius: 20, 
                                                      borderColor:"white", backgroundColor:"white"}}
                                        onPress = {() => {
                                            changeMode();
                                        }}
                                        >
                                        <Image source={require('../img/snow.png')} style={{top:3}}/>
                                        <Text style={{color: '#327DFA', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin",top:-5}}>{mode}</Text>
                            </TouchableOpacity>
                            </View>
                  </View>
                    <View style={{ width:'75%', 
                                   height:20, 
                                   flexDirection: 'row', 
                                   marginTop:-19, 
                                   alignItems: 'center', 
                                   justifyContent: 'center',
                                   left:160
                                }}>
                            <View style={{ width:'90%', height: '250%', flexDirection: 'row', marginTop:30}}>
                            <TouchableOpacity style={{height: '140%', width: '25%', marginTop: 30, 
                                                      marginRight:100, marginLeft:17, alignItems: 'center', 
                                                      justifyContent: 'center', borderWidth:1, borderRadius: 20, 
                                                      borderColor:"white", backgroundColor:"white"}}
                                        onPress = {() => {
                                            changeFlow();
                                        }}
                                        >
                                         <Image source={require('../img/fan.png')} style={{top:3}}/>
                                         <Text style={{color: '#327DFA', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin", top: -5}}>{flow}</Text>
                            </TouchableOpacity>
                            
                            </View>
                    </View>
                    <View style={{ width:'75%', 
                                   height:20, 
                                   flexDirection: 'row', 
                                   marginTop: -18, 
                                   alignItems: 'center', 
                                   justifyContent: 'center',
                                   left:286
                                }}>
                            <View style={{ width:'100%', height:37, flexDirection: 'row', marginTop:30}}>
                            <TouchableOpacity style={{height: '205%', width: '25%', marginTop: 20, 
                                                      marginRight:100, marginLeft:24, alignItems: 'center', 
                                                      justifyContent: 'center', borderWidth:1,  borderRadius: 20, 
                                                      borderColor:"white", backgroundColor:"white"}}
                                        onPress = {() => {
                                             changeDirection();
                                        }}
                                        >
                                        <Image source={require('../img/direction.png')} style={{top:3}}/>
                                        <Text style={{color: '#327DFA', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin",  top: -5}}>{direction}</Text>
                            </TouchableOpacity>
                            </View>
                    </View>
                    <View style = {{
                            marginBottom: 65, top: 110, alignItems: 'center', 
                            flex:'column', 
                            right: 16,
                            left: 16,
                            borderRadius: 16,
                        }}>
                        <CircularProcess 
                            radius={120}
                            value={temp}
                            textColor='#FFFFFF'
                            title="Temperature"
                            progressValueColor={'#ecf0f1'}
                            activeStrokeColor={'#f39c12'}
                            inActiveStrokeColor={'#9b59b6'}                          
                            fontSize= {20}
                            valueSuffix={'°C'}
                        />
                    </View>
                    <View style={{ width:'75%', 
                                   height:20, 
                                   flexDirection: 'row', 
                                   marginTop:130, 
                                   alignItems: 'center', 
                                   justifyContent: 'center',
                                   left:35,
                                   borderRadius:16
                                }}>
                            <TouchableOpacity style={{height: '370%', width: '25%', marginTop: 0, 
                                                      marginRight:100, marginLeft:55, alignItems: 'center', 
                                                      justifyContent: 'center', borderWidth:1, borderRadius: 48, backgroundColor:"white"}}
                                        onPress = {() => {
                                            increaseTemp();
                                        }}
                                        >
                                        <Text style={{color: '#327DFA', fontWeight: 'bold', 
                                                      fontSize: 32, fontFamily:"Cochin", marginTop:-8}}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={{height: '370%', width: '25%', marginTop: 25, 
                                                      marginRight:55, marginLeft:-42, alignItems: 'center', 
                                                      justifyContent: 'center',
                                                      }}
                                               onPress = {() => {
                                                    changeStatus();
                                                    setBoleanStatus(!booleanStatus)
                                                }}>
                                                {booleanStatus ?                                                      
                                                    <Image source={require('../img/powrt_on.png')} />:
                                                    <Image source={require('../img/power.png')}/>
                                                }
                                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 25, fontFamily:"Cochin", marginTop:4}}>{status}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height: '370%', width: '25%',alignItems: 'center', 
                                                      justifyContent: 'center', 
                                                      borderWidth:1, borderRadius: 48, backgroundColor:"white"}}
                                        onPress = {() => {
                                            decreaseTemp();
                                        }}
                                        >
                                        <Text style={{color: '#327DFA', fontWeight: 'bold', fontSize: 32, fontFamily:"Cochin", marginTop:-8}}>-</Text>
                            </TouchableOpacity>  
                    </View>
                    <View style={{ width:'75%', 
                                   height:20, 
                                   flexDirection: 'row', 
                                   marginTop:130, 
                                   alignItems: 'center', 
                                   justifyContent: 'center',
                                   left:65,
                                }}>
                            <TouchableOpacity style={{height: '330%', width: '25%', marginTop: 0, 
                                                      marginRight:100, marginLeft:55, alignItems: 'center', 
                                                      justifyContent: 'center', borderWidth:1, borderRadius: 18, backgroundColor:"white"}}
                                        onPress = {() => {
                                            changePowerSaving();
                                        }}
                                        >
                                        <Text style={{color: '#327DFA', fontWeight: 'bold', 
                                                      fontSize: 22, fontFamily:"Cochin", marginTop:-8}}>{powerSaving}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={{height: '370%', width: '25%', marginTop: 25, 
                                                      marginRight:55, marginLeft:-42, alignItems: 'center', 
                                                      justifyContent: 'center',
                                                      }}
                                               onPress = {() => {
                                                    dataChart();
                                                    navigation.navigate('setting');
                                                }}>
                                                <Image source={require('../img/auto_sleep.png')} style={{top:3}}/>
                                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 17, fontFamily:"Cochin", marginTop:4}}>Auto Sleep</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
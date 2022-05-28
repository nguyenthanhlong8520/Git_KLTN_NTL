import react, {Component, useState, useContext} from "react";
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
    const [temp, setTemp] = useState('12');
    const [mode, setMode] = useState('DRY');
    const {dataChart} = useContext(AuthContext);


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
        })
        .catch(e => {
          console.log(`login error ${e}`);
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
          console.log(`login error ${e}`);
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
          console.log(`login error ${e}`);
        }); 
    };

    const changeMode = () => {
        axios
        .post(`${BASE_URL}/remote/changeMode`)
        .then(res => {
          console.log(res.data);
          var data =  JSON.parse(JSON.stringify(res.data));
          var mode = data['operation_mode'];
          setMode(mode)
        })
        .catch(e => {
          console.log(`login error ${e}`);
        }); 
    };

    return (
        <ImageBackground style = {{height: '100%', width:'100%'}} source={require('../img/bg1.jpg')} resizeMode='stretch'>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={{flex:1}}>
                <View style={{height: '120%', width:'100%',  top: -20}}>
                    <View style={{
                            marginBottom: 65, top: 50, alignItems: 'center', 
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
                                   marginTop:15, 
                                   alignItems: 'center', 
                                   justifyContent: 'center',
                                   left:35
                                }}>
                            <TouchableOpacity style={{height: '190%', width: '17%', marginTop: 0, marginRight:100, marginLeft:55, alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            increaseTemp();
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin"}}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height: '190%', width: '17%',alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            decreaseTemp();
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin", marginBottom:1}}>-</Text>
                            </TouchableOpacity>  
                    </View>
                    <View style={{width:'92.5%', height:'30%', marginBottom: 50, alignItems: 'center', borderWidth:1, borderColor:'#a5a5a5', flex:'column', 
                            right: 16,
                            left: 16,
                            borderRadius: 16,
                            top: 40
                        }}>
                        {/*Status*/}     
                        <View style={{ width:'75%', height:20, flexDirection: 'row', marginTop:30}}>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:20, marginLeft:-10, fontFamily:"Cochin"}}>Status</Text>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18,  marginLeft:100, fontFamily:"Cochin"}}>{status}</Text>
                            <TouchableOpacity style={{height: '190%', width: '24%', marginTop: 0, marginLeft:77, alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            changeStatus();
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin"}}>ON/OFF</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width:'75%', height:20, flexDirection: 'row', marginTop:30}}>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:20, marginLeft:-9, fontFamily:"Cochin"}}>Mode</Text>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:100, fontFamily:"Cochin"}}>{mode}</Text>
                            <TouchableOpacity style={{height: '190%', width: '34%', marginTop: 0, marginLeft:55, alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            changeMode();
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin"}}>Change Mode</Text>
                            </TouchableOpacity>
                        </View>
                         {/*Humidity*/}
                         <View style={{ width:'75%', height:20, flexDirection: 'row', marginTop:30}}>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:20, marginLeft:-20, fontFamily:"Cochin"}}>Humidity</Text>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:80, fontFamily:"Cochin"}}>60 %</Text>
                        </View>
                    </View>
                    { <View style={{width:'92.5%', marginBottom: 50, alignItems: 'center', borderWidth:1, borderColor:'#a5a5a5', flex:'column', 
                            right: 16,
                            left: 16,
                            borderRadius: 16,
                            fontFamily:"Cochin",
                            top: 10
                        }}>
                        <Button
                                title="Sleep Mode"
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                                onPress = {() => {
                                    // something 
                                    dataChart();
                                    navigation.navigate('setting');
                                }}
                        />
                    </View> }
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
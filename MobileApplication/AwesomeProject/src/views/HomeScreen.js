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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default HomeScreen = ({ navigation }) => {
    const {changeStatus} = useContext(AuthContext);
    const [status, setStatus] = useState('OFF');
    const [temp, setTemp] = useState('20');

    const change = () => {
        axios
        .post(`${BASE_URL}/status`)
        .then(res => {
          var data =  JSON.parse(JSON.stringify(res.data));
          var status = data['status'];
          console.log(status);
          setStatus(status)
        })
        .catch(e => {
          console.log(`login error ${e}`);
        }); 
    };

    const changeTemperature = () => {
        axios
        .post(`${BASE_URL}/status`)
        .then(res => {
          var data =  JSON.parse(JSON.stringify(res.data));
          var temp = data['temp'];
          console.log(temp);
          setStatus(temp)
        })
        .catch(e => {
          console.log(`login error ${e}`);
        }); 
    };

    const changeTemperature_ = () => {
        axios
        .post(`${BASE_URL}/status`)
        .then(res => {
          var data =  JSON.parse(JSON.stringify(res.data));
          var temp = data['temp'];
          console.log(temp);
          setStatus(temp)
        })
        .catch(e => {
          console.log(`login error ${e}`);
        }); 
    };

    return (
        <ImageBackground style = {{height: '100%', width:'100%'}} source={require('../img/bgs.jpg')} resizeMode='stretch'>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={{flex:1}}>
                <View style={{height: '100%', width:'100%'}}>

                    <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark,  marginLeft: 10}}>
                        Home
                    </Text>
                    <Text
                        style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary, marginLeft: 7}}>
                        Screen
                    </Text>
                    </View>
                   
                    <View style={{borderWidth:0, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../img/air.png')} style={{width: '40%', height: '40%'}} />
                        <Text style={{color: 'black', fontWeight: 'bold', fontSize:18}}>AIR CONDITIONER</Text>
                    </View>

                    <View style={{width:'92.5%', height:'30%', marginBottom: 50, alignItems: 'center', borderWidth:1, borderColor:'#a5a5a5', flex:'column', 
                            right: 16,
                            left: 16,
                            borderRadius: 16,
                        }}>
                        {/*Status*/}     
                        <View style={{ width:'75%', height:20, flexDirection: 'row', marginTop:30}}>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:-10}}>Status</Text>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18,  marginLeft:100}}>{status}</Text>
                            <TouchableOpacity style={{height: '190%', width: '24%', marginTop: 0, marginLeft:77, alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            change();
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin"}}>ON/OFF</Text>
                            </TouchableOpacity>
                        </View>
                       
                        {/*Temperature*/}     
                        <View style={{ width:'75%', height:20, flexDirection: 'row', marginTop:30}}>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginRight:12, marginLeft:-32}}>Temperature</Text>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18,  marginLeft:50}}>{temp} °C</Text>
                            <TouchableOpacity style={{height: '190%', width: '14%', marginTop: 0, marginRight:4, marginLeft:55, alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            // -
                                            changeTemperature();
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin"}}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height: '190%', width: '14%',alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            // -
                                            changeTemperature_();
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin", marginBottom:1}}>-</Text>
                            </TouchableOpacity>  
                        </View>
                        {/*Mode*/}
                        <View style={{ width:'75%', height:20, flexDirection: 'row', marginTop:30}}>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:-9}}>Mode</Text>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:100}}>Auto</Text>
                            <TouchableOpacity style={{height: '190%', width: '34%', marginTop: 0, marginLeft:55, alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            //login(email, password)
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin"}}>Change Mode</Text>
                            </TouchableOpacity>
                        </View>
                         {/*Humidity*/}
                         <View style={{ width:'75%', height:20, flexDirection: 'row', marginTop:30}}>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:-20}}>Humidity</Text>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:80}}>60 %</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
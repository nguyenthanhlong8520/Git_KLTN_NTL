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

import COLORS from '../Style/Color';
import STYLES from '../Style/Style';
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import {BASE_URL} from '../config';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default Setting = ({ navigation }) => {
    const [status, setStatus] = useState('OFF');
    const [temp, setTemp] = useState('12');
    const [mode, setMode] = useState('AUTO');

    const [tempStart, setTempStart] = useState('25');
    const [tempMax, setTempMax] = useState('27');
    // const [time, setTime] = useState(null);

    const statusSleepMode = () => {
        axios
        .post(`${BASE_URL}/remote/statusAutonatic`)
        .then(res => {
          console.log(res.data);
          var data =  JSON.parse(JSON.stringify(res.data));
          //var temp = res.data[0].temperature_value;
          //console.log(data.temperature_value);
          setStatus(data['modeAutoSleep']);
        //   setTemp(data['temperature_value']);
        })
        .catch(e => {
          console.log(`Error Status Sleep Mode !!!`);
        }); 
    };

    const Confirm = (tempStart, tempMax, timeStart) => {
        console.log("Clicked !!!")
        axios
          .post(`${BASE_URL}/remote/setParamsAutomatic`, {
            tempStart,
            tempMax,
            timeStart
          })
          .then(res => {
            var data =  JSON.parse(JSON.stringify(res.data));
            //setUserName(userInfo.result[0].email);
            console.log(data)
            
          })
          .catch(e => {
            console.log(`error ${e}`);
          });
      };

    return (
        <ImageBackground style = {{height: '100%', width:'100%'}} source={require('../img/s1.jpg')} resizeMode='stretch'>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={{flex:1}}>
                <View style={{height: '100%', width:'100%'}}>
                    <View style={{width:'92.5%', height:'30%', marginBottom: 0, alignItems: 'center', 
                            borderWidth:0, borderColor:'#a5a5a5', flex:'column', 
                            right: 16,
                            left: 16,
                            borderRadius: 16,
                        }}>
                        <Image source={require('../img/sleepmode.png')} style={{width: '40%', height: '60%', marginTop: 30}} />
                        <Text style={{fontFamily:"Cochin", color: 'black', 
                                      fontWeight: 'bold', fontSize:19, top:10}}>Automatic Temperature Regulation</Text>
                    </View>

                    <View style={{width:'92.5%', height:'30%', marginBottom: 50, alignItems: 'center', borderWidth:1, borderColor:'#a5a5a5', flex:'column', 
                            right: 16,
                            left: 16,
                            borderRadius: 16,
                        }}>
                        {/*Status*/}     
                        <View style={{ width:'75%', height:23, flexDirection: 'row', marginTop:30, right: 25}}>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:20, fontFamily:"Cochin"}}>Sleep Mode</Text>
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, left:70, fontFamily:"Cochin"}}>{status}</Text>
                            <TouchableOpacity style={{height: '170%', width: '26%', marginTop: -10, left:140, alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            statusSleepMode();
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18, fontFamily:"Cochin"}}>ON/OFF</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{ width:'75%', height:23, flexDirection: 'row', marginTop:30, right: 25}}>
                            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20, fontFamily:"Cochin"}}>Temperature Start</Text>
                            <TextInput 
                                style={{width:'24%', height:'130%', borderWidth:1, left: 120}}
                                value={tempStart}
                                onChangeText={text => setTempStart(text)}
                            />
                        </View>

                        <View style={{ width:'75%', height:23, flexDirection: 'row', marginTop:30, right: 25}}>
                            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20, fontFamily:"Cochin"}}>Temperature Max</Text>
                            <TextInput 
                                style={{width:'24%', height:'130%', borderWidth:1, left: 125}}
                                value={tempMax}
                                onChangeText={text => setTempMax(text)}
                            />
                        </View>

                        <View style={{height: '20%', width: '100%', marginTop: 0.01*windowHeight, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{height: '80%', width: '30%', marginTop: 7, alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            let timeStart = new Date().toLocaleTimeString();
                                            Confirm(tempStart, tempMax, timeStart);
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin"}}>Confirm</Text>
                        </TouchableOpacity> 
                        </View>
 
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
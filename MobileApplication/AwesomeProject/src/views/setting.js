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
import COLORS from '../Style/Color';
import STYLES from '../Style/Style';

// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createDrawerNavigator } from '@react-navigation/drawer';

// const ax = createDrawerNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default Setting = ({ navigation }) => {
    const {logout} = useContext(AuthContext);
    return (
        <ImageBackground style = {{height: '100%', width:'100%'}} source={require('../img/bgs.jpg')} resizeMode='stretch'>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={{flex:1}}>
                <View style={{height: '100%', width:'100%'}}>
                    <View style={{flexDirection: 'row', marginTop: 70}}>
                    <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark,  marginLeft: 10}}>
                        Setting
                    </Text>
                    <Text
                        style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary, marginLeft: 7}}>
                        Schedule
                    </Text>
                    </View>
                    <View
                        style={{
                          marginVertical: 20,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={STYLES.line}></View>
                        <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
                        <View style={STYLES.line}></View>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        }}>
                        <View style={{width: 10}}></View>
                       
                        <View style={STYLES.btnSecondary}>
                        <TouchableOpacity
                        onPress = {() => {
                            navigation.navigate('HomeScreen');
                        }}
                        >
                        <Text style={{fontSize: 16,  fontFamily:"Cochin", fontWeight: 'bold'}}>Home Screen</Text>
                        </TouchableOpacity>
                        
                        <Image
                            style={STYLES.btnImage}
                            source={require('../img/ins.png')}
                        />
                        </View>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop:30
                        }}>
                        <View style={{width: 10}}></View>
                       
                        <View style={STYLES.btnSecondary}>
                        <TouchableOpacity
                        onPress = {() => {
                            // navigation.navigate('Login');
                            logout();
                        }}
                        >
                        <Text style={{fontSize: 16,  fontFamily:"Cochin", fontWeight: 'bold'}}>Logout</Text>
                        </TouchableOpacity>
                        
                        <Image
                            style={STYLES.btnImage}
                            source={require('../img/ins.png')}
                        />
                        </View>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop:30
                        }}>
                        <View style={{width: 10}}></View>
                       
                        <View style={STYLES.btnSecondary}>
                        <TouchableOpacity
                        onPress = {() => {
                            //navigation.navigate('Login');
                        }}
                        >
                        <Text style={{fontSize: 16,  fontFamily:"Cochin", fontWeight: 'bold'}}>Confirm</Text>
                        </TouchableOpacity>
                        
                        <Image
                            style={STYLES.btnImage}
                            source={require('../img/ins.png')}
                        />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
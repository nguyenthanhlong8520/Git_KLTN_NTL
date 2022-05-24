import React from "react";
import { View, Text } from "react-native";

import {
    SafeAreaView,
    TouchableOpacity, 
    ImageBackground,
    StatusBar,
    Dimensions,
    TextInput,
    Image, 
    Button
} from 'react-native'

import COLORS from '../../Style/Color';
import STYLES from '../../Style/Style';

const ViewBoxesWithColorAndText = ({navigation}) => {
  return (
    <ImageBackground style = {{height: '100%', width:'100%'}} source={require('../../img/bgs.jpg')} resizeMode='stretch'>
    <StatusBar barStyle="light-content"/>
    <SafeAreaView style={{flex:1}}>
        <View style={{height: '100%', width:'100%'}}>
            <View style={{flexDirection: 'row', marginTop: 70}}>
            <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark,  marginLeft: 10}}>
                Bedroom
            </Text>
            <Text
                style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary, marginLeft: 7}}>
                1
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
                <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>List Device</Text>
                <View style={STYLES.line}></View>
            </View>
            <View
                style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                left:120,
                width: '40%',
                alignItems: 'center'
                }}>
                <View style={{width: 10}}></View>
               
                <View style={STYLES.btnSecondary}>
                <TouchableOpacity
                onPress = {() => {
                    navigation.navigate('ControlAir');
                }}
                >
                <Text style={{fontSize: 16,  fontFamily:"Cochin", fontWeight: 'bold'}}>Air Conditioner</Text>
                </TouchableOpacity>
                
                <Image
                    style={STYLES.btnImage}
                    source={require('../../img/air_icon.png')}
                />
                </View>
            </View>
        </View>
    </SafeAreaView>
</ImageBackground>
  );
};

export default ViewBoxesWithColorAndText;
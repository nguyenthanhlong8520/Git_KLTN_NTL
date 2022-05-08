import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useContext } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import profile from '../../../assets/profile.png';

import axios from "axios";
import {BASE_URL} from '../../config';
import { AuthContext } from "../../context/AuthContext";

// Tab ICons...
import home from '../../../assets/home.png';
import search from '../../../assets/search.png';
import notifications from '../../../assets/bell.png';
import settings from '../../../assets/settings.png';
import logout_ from '../../../assets/logout.png';
// Menu
import menu from '../../../assets/menu.png';
import close from '../../../assets/close.png';

// Photo
import photo from '../../../assets/photo.jpg';

import room1 from '../rooms/room1'

export default App = ({navigation}) =>{
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
  const {isLoading, login, userInfo, userName, logout} = useContext(AuthContext);

  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={profile} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginTop: 8
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>{userName}</Text>

        <TouchableOpacity>
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Search", search)}
          {TabButton(currentTab, setCurrentTab, "Notifications", notifications)}
          {TabButton(currentTab, setCurrentTab, "Settings", settings)}
          {TabButton(currentTab, setCurrentTab, "Log Out", logout_)}

        </View>

        <View>
          {/* {TabButton(currentTab, setCurrentTab, "LogOut", logout)} */}
        </View>

      </View>

      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: '#FFCCCC',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        { 
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            //userProfile();
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>
            <Image source={showMenu ? close : menu} style={{width: 20,height: 20,tintColor: 'black',marginTop: 40,}}></Image>
          </TouchableOpacity>

          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 20
          }}>{currentTab}</Text>
            <View style={{width:'92.5%', height:'60%', marginBottom: 40, alignItems: 'center', borderWidth:2, flex:'column', 
                            right: 16, left: 16, borderRadius: 16, marginTop:50 }}>

                        <View style={{width:'75%', height:45, flexDirection: 'row', marginTop:30, borderWidth:1, borderRadius:16}}>
                            <Image 
                                source={require('../../img/room1.png')}
                                style={{
                                    
                                }}
                            />
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:100}}></Text>
                            <TouchableOpacity style={{height: '190%', width: '34%', marginTop: 0, alignItems: 'center', justifyContent: 'center'}}
                                        onPress = {() => {
                                            navigation.navigate('Room1');
                                        }}
                                        >
                            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 26, fontFamily:"Cochin", marginBottom: 40}}>Room 1</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'75%', height:45, flexDirection: 'row', marginTop:30, borderWidth:1, borderRadius:16}}>
                            <Image 
                                source={require('../../img/room2.png')}
                                style={{
                                    
                                }}
                            />
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:100}}></Text>
                            <TouchableOpacity style={{height: '190%', width: '34%', marginTop: 0, alignItems: 'center', justifyContent: 'center'}}
                                        onPress = {() => {
                                            navigation.navigate('Room1');
                                        }}
                                        >
                            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 26, fontFamily:"Cochin", marginBottom: 40}}>Room 2</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'75%', height:45, flexDirection: 'row', marginTop:30, borderWidth:1, borderRadius:16}}>
                            <Image 
                                source={require('../../img/room3.png')}
                                style={{
                                    
                                }}
                            />
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:100}}></Text>
                            <TouchableOpacity style={{height: '190%', width: '34%', marginTop: 0, alignItems: 'center', justifyContent: 'center'}}
                                        onPress = {() => {
                                            navigation.navigate('Room1');
                                        }}
                                        >
                            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 26, fontFamily:"Cochin", marginBottom: 40}}>Room 3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'75%', height:45, flexDirection: 'row', marginTop:30, borderWidth:1, borderRadius:16}}>
                            <Image 
                                source={require('../../img/room4.png')}
                                style={{
                                    
                                }}
                            />
                            <Text style={{color: 'black', fontWeight: 'bold', fontSize:18, marginLeft:100}}></Text>
                            <TouchableOpacity style={{height: '190%', width: '34%', marginTop: 0, alignItems: 'center', justifyContent: 'center'}}
                                        onPress = {() => {
                                            navigation.navigate('Room1');
                                        }}
                                        >
                            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 26, fontFamily:"Cochin", marginBottom: 40}}>Room 4</Text>
                            </TouchableOpacity>
                        </View>
            </View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  const {logout} = useContext(AuthContext);
  return (

    <TouchableOpacity 
      onPress={() => {
      if (title == "Log Out") {
        logout();
        // Do your Stuff...
        
      } else {
        setCurrentTab(title)
      }
    }}
    
    >
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

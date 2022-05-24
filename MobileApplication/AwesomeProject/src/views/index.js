import 'react-native-gesture-handler'
import react, {Component, useContext} from "react";
import { NavigationContainer } from '@react-navigation/native';
import {
    View,
    Text,
    SafeAreaView
    ,Image
} from 'react-native'

import Login from './login'
import SignUpScreen from "./Signup";
import HomeScreen from "./HomeScreen";
import setting from "./setting";

import home_menu from './menu/home_menu';
import time from './menu/time';
import Room1 from './rooms/room1'
import Room2 from './rooms/room2'
import Room3 from './rooms/room3'
import Room4 from './rooms/room4'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from "../context/AuthContext";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Tabs(){
    return (
        <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 70,
              position: 'absolute',
              bottom: 25,
              right: 16,
              left: 16,
              borderRadius: 16,
            }
          }}
            defaultScreenOptions={{
                headerShown: false
            }} 
         >
             <Tab.Screen name="HomeMenu" component={home_menu} 
                 options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image 
                                 source={require('../img/iconHome.png')}
                                style={{
                                    
                                }}
                            />
                        </View>
                    ),
                }}
            />

            <Tab.Screen name="Sleep Mode" component={setting} 
                 options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image 
                                source={require('../img/iconSetting.png')}
                                style={{
                                    
                                }}
                            />
                        </View>
                    ),
                }}
            />

        <Tab.Screen name="Time" component={time} 
                 options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image 
                                source={require('../img/iconSetting.png')}
                                style={{
                                    
                                }}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
        
    );
}

export default RootComponent = function() {
    const {userInfo} = useContext(AuthContext);
    return(
            <NavigationContainer>
                 {/* Rest of your app code */}
                 <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                    {userInfo.token ? ( 
                    <>
                        <Stack.Screen name="HomeTabs" component={Tabs} />
                        <Stack.Screen name="Room1" component={Room1} />
                        <Stack.Screen name="ControlAir" component={HomeScreen} />
                        <Stack.Screen name="setting" component={setting} />
                    </>
                    ):(
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
                    </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            
    )
}
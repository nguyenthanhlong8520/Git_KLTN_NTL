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
import ControlDetails from './ControlDetails'
import SignUpScreen from "./Signup";
import HomeScreen from "./HomeScreen";
import setting from "./setting";

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
              bottom: 23,
              right: 16,
              left: 16,
              borderRadius: 16,
            }
          }}
            defaultScreenOptions={{
                headerShown: false
            }} 
         >
            <Tab.Screen name = "Home Screen" component={HomeScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 7}}>
                            <Image 
                                source={require('../img/iconHome.png')}
                                style={{
                                    
                                }}
                            />
                        </View>
                    ),
                }}/>

            <Tab.Screen name="Control Details" component={ControlDetails} 
                 options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 7}}>
                            <Image 
                                source={require('../img/iconControl.png')}
                                style={{
                                    
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen name="Setting Schedule" component={setting} 
                 options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 7}}>
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
                        <Stack.Screen name="Home Screen" component={HomeScreen} />
                        <Stack.Screen name="Control Details" component={ControlDetails} />
                        <Stack.Screen name="Setting schedule" component={setting} />
                    </>
                    ):(
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
                        {/* <Stack.Screen name="HomeTabs" component={Tabs} /> */}
                    </>
                    )}


                </Stack.Navigator>
            </NavigationContainer>
    )
}
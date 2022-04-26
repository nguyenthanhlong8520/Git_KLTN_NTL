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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default Login = ({ navigation }) => {
    const [getPasswordVisible, setPasswordVisible] = useState(false);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {isLoading, login} = useContext(AuthContext);

    return (
        <ImageBackground style = {{height: '100%', width:'100%'}} source={require('../img/bgs.jpg')} resizeMode='stretch'>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={{flex:1}}>
                <View style={{height: '100%', width:'100%'}}>
                    <View style={{flexDirection: 'row', marginTop: 70}}>
                    <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark,  marginLeft: 10}}>
                        SMART
                    </Text>
                    <Text
                        style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary, marginLeft: 7}}>
                        HOME
                    </Text>
                    </View>
                    {/*Email & password*/}
                    <View style={{width:'100%', height:'20%', marginTop: 0.1 * windowHeight, alignItems: 'center', borderWidth:1, borderColor:'#a5a5a5'}}>
                        {/*Email*/}
                        <Spinner visible={isLoading}/>
                        <View style={{ width:'75%', height:20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop:30}}>
                            <Text style={{color: 'black'}}>Email</Text>
                            <TextInput 
                                style={{width:'70%', height:'65%', borderBottomColor: 'red', borderBottomWidth:1}}
                                value={email}
                                //placeholder="enter email"
                                onChangeText={text => setEmail(text)}
                            />
                        </View>
                        {/*Password*/}
                        <View style={{ width:'75%', height:30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15}}>
                            <Text style={{color: 'black'}}>Password</Text>
                            <TextInput 
                                style={{width:'70%', height:'65%', borderBottomColor: 'red', borderBottomWidth:1, paddingRight: 30}}
                                secureTextEntry={getPasswordVisible ? false:true}
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />
                            <TouchableOpacity style={{height: '100%', width:20, aspectRatio:1, position: 'absolute', right:0}} 
                                  onPress = {() => {
                                        setPasswordVisible(!getPasswordVisible);
                                  }}
                            >
                                {getPasswordVisible ?  
                                 <Image source={require('../img/eye.png')} style={{width: '100%', height: '30%'}} /> :
                                 <Image source={require('../img/eye_.png')} style={{width: '150%', height: '60%'}} /> 
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{height: '23%', width: '100%', marginTop: 0.01*windowHeight, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{height: '80%', width: '30%', marginTop: 7, alignItems: 'center', justifyContent: 'center', borderWidth:1}}
                                        onPress = {() => {
                                            login(email, password);
                                            //navigation.navigate('HomeTabs');
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin"}}>Login</Text>
                        </TouchableOpacity> 
                        </View>
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
                        <View style={STYLES.btnSecondary}>
                        <Text style={{fontWeight: 'bold', fontSize: 16,  fontFamily:"Cochin"}}>
                            Sign up with
                        </Text>
                        <Image
                            style={STYLES.btnImage}
                            source={require('../img/pb.png')}
                        />
                        </View>
                        <View style={{width: 10}}></View>
                       
                        <View style={STYLES.btnSecondary}>
                        <TouchableOpacity
                        onPress = {() => {
                            navigation.navigate('SignUpScreen');
                        }}
                        >
                        <Text style={{fontSize: 16,  fontFamily:"Cochin", fontWeight: 'bold'}}>New Account</Text>
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
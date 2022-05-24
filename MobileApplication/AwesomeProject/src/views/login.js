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

    const validate_field =  (email, password) => {
        if (email == null){
          alert("please fill username")
          return false
        } else if (password == null){
          alert("please fill password")
          return false
        }
        return true
    }

    return (
         <ImageBackground style = {{height: '100%', width:'100%'}} source={require('../img/bg1.jpg')} resizeMode='stretch'>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView>
                <View style={{height: '100%', width:'100%', color: 'blue'}}>
                    <View style={{width:'92.5%', height:'30%', marginBottom: 10, alignItems: 'center', 
                            borderWidth:0, borderColor:'#a5a5a5', flex:'column', 
                            right: 16,
                            left: 16,
                            borderRadius: 16,
                        }}>
                        <Image source={require('../img/smh.jpg')} style={{width: '109%', height: '100%', marginTop: -20}} />
                    </View>
                    <View style={{alignItems: 'center', 
                            borderWidth:0, borderColor:'#a5a5a5', flex:'column', 
                            right: 16,
                            left: 16,
                            borderRadius: 16,
                            
                        }}>
                    <Image source={require('../img/icon_login.png')} />
                    </View>
                    <View style={{width:'80%', height:'25%', marginTop: -0.03 * windowHeight, 
                                 alignItems: 'center', left:40, borderWidth:1, borderColor:'#a5a5a5',}}>
                        {/*Email*/}
                        {/* <Spinner visible={isLoading}/> */}
                        <View style={{ width:'95%', height:40, flexDirection: 'row', 
                                       alignItems: 'center', justifyContent: 'space-between', marginTop:30,
                                       borderWidth:1, borderRadius:10   
                                    }}>
                            {/* <Text style={{color: 'black'}}>Email</Text> */}
                            <Image source={require('../img/icon_lg.png')} />
                            <TextInput 
                                placeholder={"Phone number or email"}
                                style={{width:'80%', height:'65%'}}
                                value={email}
                                //placeholder="enter email"
                                onChangeText={text => setEmail(text)}
                            />
                        </View>
                        {/*Password*/}
                        <View style={{ width:'95%', height:40, flexDirection: 'row', alignItems: 'center', 
                                       justifyContent: 'space-between', marginTop: 15,
                                       borderWidth:1, borderRadius:10   
                                    }}>
                            {/* <Text style={{color: 'black'}}>Password</Text> */}
                            <Image source={require('../img/icon_pass.png')} />
                            <TextInput 
                                placeholder={"Password"}
                                style={{width:'80%', height:'65%', paddingRight: 30}}
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
                                 <Image source={require('../img/e1.png')} style={{width: '100%', height: '40%', marginTop: 10, right: 5}} /> :
                                 <Image source={require('../img/e2.png')} style={{width: '100%', height: '40%', marginTop: 10, right: 5}} /> 
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{height: '23%', width: '50%', marginTop: 0.01*windowHeight, justifyContent: 'center', alignItems: 'center', 
                                        backgroundColor: '#4267B2', borderWidth:1, borderRadius:10 }}>
                        <TouchableOpacity style={{height: '100%', width: '100%', marginTop: 0, alignItems: 'center', 
                                                  justifyContent: 'center'}}
                                        onPress = {() => {
                                            if (validate_field(email, password)){
                                                login(email, password);
                                            }
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', 
                                        fontSize: 16, fontFamily:"Cochin"}}>Login</Text>
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
                        <View style={{height: 50,
                                        borderWidth: 1,
                                        borderColor: '#a5a5a5',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        flex: 1,
                                        flexDirection: 'row',
                                        width:'80%',
                                        color: 'red'
                                    }}>
                        <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 16,  fontFamily:"Cochin"}}>
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
                        <Text style={{color: 'blue', fontSize: 16,  fontFamily:"Cochin", fontWeight: 'bold'}}>Create new account</Text>
                        </TouchableOpacity>
                        <Image
                            style={STYLES.btnImage}
                            source={require('../img/ng.png')}
                        />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
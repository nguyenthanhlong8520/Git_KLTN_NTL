import react, {Component, useState, useContext} from "react";
import COLORS from '../Style/Color';
import STYLES from '../Style/Style';

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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default SingUpScreen = ({ navigation }) => {
    const [getPasswordVisible, setPasswordVisible] = useState(false);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const {isLoading, register,changeStatus} = useContext(AuthContext);

    const validate_field =  (email, password, rePassword) => {
        const checklength = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
        if (email == null){
          alert("please fill username")
          return false
        } else if (password == null){
          alert("please fill password")
          return false
        }else if (rePassword == null){
          alert("please fill password")
          return false
        }else if (password.toStr < 10){
          alert("please fill password")
          return false
        }
        return true
    }

    const validate_field_length =  (something) => {
      const checklength = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
      return checklength.test(something)
  }
    
    return (
        <ImageBackground style = {{height: '100%', width:'100%'}} source={require('../img/bg1.jpg')} resizeMode='stretch'>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={{flex:1}}>
              <View style={{height: '100%', width:'100%'}}>
                <View style={{width:'92.5%', height:'30%', marginBottom: 40, alignItems: 'center', 
                            borderWidth:0, borderColor:'#a5a5a5', flex:'column', 
                            right: 16,
                            left: 16,
                            borderRadius: 16,
                        }}>
                        <Image source={require('../img/bgg.jpg')} style={{width: '109%', height: '100%', marginTop: -20}} />
                </View>
                <View>
                 {/* <Image source={require('../img/121.png')} style={{width: '70%', height: '50%'}} /> */}
                </View>
                    {/*Email & password*/}
                    <View style={{width:'80%', height:'32%', marginTop: -0.03 * windowHeight, 
                                 alignItems: 'center', left:40, borderWidth:1, borderColor:'#a5a5a5'}}>
                        {/*Email*/}
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
                                onChangeText={text=>setPassword(text)}
                                secureTextEntry={getPasswordVisible ? false:true}
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
                        {/*RePassword*/}
                        <View style={{ width:'95%', height:40, flexDirection: 'row', alignItems: 'center', 
                                       justifyContent: 'space-between', marginTop: 15,
                                       borderWidth:1, borderRadius:10   
                                    }}>
                            {/* <Text style={{color: 'black'}}>Password</Text> */}
                            <Image source={require('../img/icon_pass.png')} />
                            <TextInput 
                                placeholder={"RePassword"}
                                style={{width:'80%', height:'65%', paddingRight: 30}}
                                onChangeText={text=>setRePassword(text)}
                                secureTextEntry={getPasswordVisible ? false:true}
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
                      
                        <View style={{height: '15%', width: '50%', marginTop: 0.01*windowHeight, justifyContent: 'center', alignItems: 'center', 
                                        backgroundColor: '#4267B2', borderWidth:1, borderRadius:10 }}>
                        <TouchableOpacity style={{height: '100%', width: '100%', marginTop: 0, alignItems: 'center', 
                                                  justifyContent: 'center'}}
                                        onPress = {() => {
                                            if(validate_field(email, password, rePassword)){
                                              if (password == rePassword){
                                                  register(email, password, rePassword);
                                                  navigation.navigate('Login');
                                              }
                                            }
                                        }}
                                        >
                                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, fontFamily:"Cochin"}}>Sign Up</Text>
                        </TouchableOpacity> 
                        </View>

                    </View>
                     {/*Login & register*/}
                     <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginTop: 80,
                        marginBottom: 10,
                      }}>
                      <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
                        Already have an account ?
                      </Text>
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
                          Sign in
                        </Text>
                      </TouchableOpacity>
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
                      <Text style={{fontWeight: 'bold', fontSize: 16,  fontFamily:"Cochin"}}>
                        Sign up with
                      </Text>
                      <Image
                        style={STYLES.btnImage}
                        source={require('../img/inst.png')}
                      />
                    </View>
                  </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
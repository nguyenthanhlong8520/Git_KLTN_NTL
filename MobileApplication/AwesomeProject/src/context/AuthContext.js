import react, {createContext, useState} from "react";
import {BASE_URL} from '../config';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {
    const [userInfo, setUserInfo] = useState({});
    const [userName, setUserName] = useState("None");
    const [isLoading, setIsLoading] = useState(false);

    const register = (email, password) => {
        //setIsLoading(true);
        console.log(email + " " + password);
        axios
          .post(`${BASE_URL}/account/register`, {
            email,
            password,
          })
          .then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log(userInfo);
          })
          .catch(e => {
            console.log("Error cmnr");
            console.log(`register error ${e}`);
          });
      };

    const login = (email, password) => {
        console.log("Clicked !!!")
        axios
          .post(`${BASE_URL}/account/login`, {
            email,
            password,
          })
          .then(res => {
            let userInfo = res.data;
            setUserName(userInfo.result[0].email);
            // console.log(userInfo);
            console.log(userName);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          })
          .catch(e => {
            console.log(`login error ${e}`);
          });
      };

      const logout = () => {
        axios
          .post(
            `${BASE_URL}/account/logout`,
            {},
            {
              headers: {Authorization: `Bearer ${userInfo.token}`},
            },
          )
          .then(res => {
            console.log(res.data);
            AsyncStorage.removeItem('userInfo');
            setUserInfo({});
            //setIsLoading(false);
          })
          .catch(e => {
            console.log(`logout error ${e}`);
            //setIsLoading(false);
          });
      };

    return (
        <AuthContext.Provider value={{
          register, isLoading, userInfo, login, logout, userName}}
          
        >{children}  
        </AuthContext.Provider>
    );
};
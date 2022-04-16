import react, {createContext, useState} from "react";
import {BASE_URL} from '../config';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const changeStatus = () => {
      axios
      .post(`${BASE_URL}/status`)
      .then(res => {
        let dataResponse = res.data;
        console.log(dataResponse);
      })
      .catch(e => {
        console.log(`login error ${e}`);
      });
   
    };

    const register = (email, password) => {
        //setIsLoading(true);
        axios
          .post(`${BASE_URL}/data`, {
            email,
            password,
          })
          .then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            console.log(userInfo);
          })
          .catch(e => {
            console.log(`register error ${e}`);
          });
      };

    const login = (email, password) => {
        axios
          .post(`${BASE_URL}/login`, {
            email,
            password,
          })
          .then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          })
          .catch(e => {
            console.log(`login error ${e}`);
          });
      };

    //   const logout = () => {
    //     axios
    //       .post(
    //         `${BASE_URL}/logout`,
    //         {},
    //         {
    //           headers: {Authorization: `Bearer ${userInfo.status}`},
    //         },
    //       )
    //       .then(res => {
    //         console.log(res.data);
    //         AsyncStorage.removeItem('userInfo');
    //         setUserInfo({});
    //         setIsLoading(false);
    //       })
    //       .catch(e => {
    //         console.log(`logout error ${e}`);
    //         setIsLoading(false);
    //       });
    //   };

    return (
        <AuthContext.Provider value={{
          register, isLoading, userInfo, login, changeStatus}}
          
        >{children}  
        </AuthContext.Provider>
    );
};
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import RootComponent from '../AwesomeProject/src/views/index'
import { AuthProvider } from './src/context/AuthContext';
import SignUpScreen from './src/views/Signup';


export default function App() {
  return (
    <AuthProvider>
         <RootComponent/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

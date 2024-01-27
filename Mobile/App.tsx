import {View,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/routes';
import  {AuthProvider} from "./src/context/AuthContext"



export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
          <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false} />
          <Router/>
      </AuthProvider>
    </NavigationContainer>
  );
}



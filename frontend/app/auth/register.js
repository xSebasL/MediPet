import {View, Text} from 'react-native';
import { Register as RegisterScreen } from '../../src/screens/Register';
import { Stack } from 'expo-router';

export default function Login(){
  return <>
    <Stack.Screen options={{headerShown: false}}/>
    <RegisterScreen/>
  </>
}
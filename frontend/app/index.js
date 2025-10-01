import {View, Text} from 'react-native';
import { Welcome } from '../src/screens/Welcome';
import {Stack} from 'expo-router';

export default function Index(){
  return <>
    <Stack.Screen options={{headerShown: false}} />
    <Welcome/>
  </> 
}
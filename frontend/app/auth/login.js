import { Login as LoginScreen} from '../../src/screens/Login';
import { Stack } from 'expo-router';

export default function Login(){
  return <>
    <Stack.Screen options={{headerShown: false}}/>
    <LoginScreen/>
  </>
}
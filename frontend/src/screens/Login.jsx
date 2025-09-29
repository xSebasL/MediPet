import {Screen} from './_screen.jsx'
import {Link, useRouter} from 'expo-router'
import {StyleSheet, View, TextInput,Text} from 'react-native'
import { useState } from 'react'
import { authLogin } from '../services/api.js'
import {Button} from '../components/Button.jsx'

export function Login(){
  const [email, setEmail] = useState('daniel@email.com')
  const [password, setPassword] = useState('daniel1234')
  const router = useRouter()

  const handleLoginPress = async () => {
    try {
      const res = await authLogin(email, password);
      //console.log("Token:", res.token);
      router.replace("/main");
    } catch (err) {
      console.log("Error login:", err.response?.data || err.message);
    }
  };


  return <Screen>
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input}
        placeholder='email'
        placeholderTextColor='#fff7'
        value={email}
        onChangeText={setEmail}/>
      <Text style={styles.label}>Contraseña</Text>
      <TextInput 
        style={styles.input}
        secureTextEntry
        placeholder='password'
        placeholderTextColor='#fff7'
        value={password}
        onChangeText={setPassword}/>
      <Button onPress={handleLoginPress}>Entrar</Button>
    </View>
  </Screen>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#444',
    borderRadius: 20,
    padding: 20,
    gap: 12
  },
  label: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    width: "100%",
    color: '#fff'
  },
})
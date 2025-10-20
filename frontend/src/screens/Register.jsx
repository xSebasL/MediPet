import {Screen} from './_screen.jsx'
import {useState} from 'react'
import {useRouter} from 'expo-router'
import {StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native'
import {Button} from '../components/Button.jsx'
import { authRegister } from '../services/api.js'

export function Register(){

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('2') // 1: Propietario, 2: Fundación, 3: Veterinaria

  const router = useRouter() 

  const handleRegisterPress = async () => {
    try {
      // Llamar a la función de registro
      const res = await authRegister(nombre, email, password, rol);
      //console.log("Registro exitoso:", res);
      // Navegar a la pantalla principal o de login
      router.replace("/main");
    } catch (err) {
      console.log("Error registro:", err.response?.data || err.message);
    }
  }

  return <Screen>
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Text style={[styles.label,{ marginTop: 20, fontWeight: "bold" }]}>Selecciona tu rol:</Text>
      <View style={styles.rolContainer}>
      {[
        { id: "2", label: "Propietario" },
        { id: "3", label: "Fundación" },
        { id: "4", label: "Veterinaria" },
      ].map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.radioContainer}
          onPress={() => setRol(option.id)}
          >
          <View style={[styles.radioCircle, rol === option.id && styles.radioSelected]} />
          <Text style={styles.radioLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      </View>
      <Button onPress={handleRegisterPress}>Registrarse</Button>
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
  rolContainer: {
    width: '100%',
    backgroundColor: '#555',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  radioSelected: {
    backgroundColor: "#008",
  },
  radioLabel: {
    fontSize: 16,
    color: '#fff'
  },
  radioContainer: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
})
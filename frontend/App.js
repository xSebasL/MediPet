import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";

// ⚠️ Cambia por tu IP local (la de tu PC en la misma red WiFi que el celular con Expo Go)
const api = axios.create({ baseURL: "http://10.216.123.142:5297/api" });

// 👉 Botón sencillo reusable
const CustomButton = ({ title, onPress, secondary }) => (
  <Pressable
    style={({ pressed }) => [
      styles.btn,
      secondary ? styles.btnSecondary : styles.btnPrimary,
      pressed && { opacity: 0.7 },
    ]}
    onPress={onPress}
  >
    <Text style={secondary ? styles.textSecondary : styles.textPrimary}>
      {title}
    </Text>
  </Pressable>
);

// 👉 Pantallas
function Welcome({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Bienvenido a MediPet</Text>
      <CustomButton title="Iniciar Sesión" onPress={() => navigation.navigate("Login")} />
      <CustomButton title="Registrarse" secondary onPress={() => navigation.navigate("Register")} />
    </View>
  );
}

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/ApiAuth/login", { email, password });
      console.log("Token:", res.data.token);
      navigation.replace("Home");
    } catch (err) {
      console.log("Error login:", err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Contraseña</Text>
      <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <CustomButton title="Entrar" onPress={handleLogin} />
      <CustomButton title="Volver" secondary onPress={() => navigation.goBack()} />
    </View>
  );
}

function Register({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("1");

  const handleRegister = async () => {
    try {
      const res = await api.post("/ApiAuth/register", {
        nombre,
        email,
        password,
        userTypeId: parseInt(rol),
      });
      console.log("Usuario registrado:", res.data);
      navigation.replace("Home");
    } catch (err) {
      console.log("Error registro:", err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Contraseña</Text>
      <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Selecciona tu rol:</Text>
      {[
        { id: "1", label: "Propietario" },
        { id: "2", label: "Fundación" },
        { id: "3", label: "Veterinaria" },
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
      <CustomButton title="Registrar" onPress={handleRegister} />
      <CustomButton title="Volver" secondary onPress={() => navigation.goBack()} />
    </View>
  );
}

function Home() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Pantalla principal 🚀</Text>
    </View>
  );
}

// 👉 Configuración de navegación
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 👉 Estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    width: "100%",
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  btnPrimary: { backgroundColor: "#4CAF50" },
  btnSecondary: { backgroundColor: "#e0e0e0" },
  textPrimary: { color: "white", fontWeight: "bold", fontSize: 16 },
  textSecondary: { color: "#333", fontWeight: "bold", fontSize: 16 },
  radioSelected: {
    backgroundColor: "#444",
  },
  radioLabel: {
    fontSize: 16,
  },
  radioContainer: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});


/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
*/
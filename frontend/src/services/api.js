import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const API = "http://192.168.1.13:5000/api";

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  }
})


// Interceptor para agregar el token de autenticación a cada solicitud
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token"); // obtener el token del almacenamiento seguro
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // agregar el token al encabezado de autorización
  }
  return config; // retornar la configuración actualizada
});

// Función para iniciar sesión
export async function authLogin(email, password) {
  const response = await api.post("/auth/login", { email, password });
  const data = response.data;
  await SecureStore.setItemAsync("token", data.token);
  //console.log("Data: ",data)
  return data; // ya parseado, axios lo hace automático
}

// Función para registrar a un nuevo usuario
export async function authRegister(name, email, password, role) {
  const response = await api.post("/auth/register", { nombre: name, email, password, idRol:role });
  const data = response.data;
  //console.log("Data: ",data)
  await SecureStore.setItemAsync("token", data.token);
  return data;
}

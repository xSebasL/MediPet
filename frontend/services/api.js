import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const API = "http://192.168.1.13:5000/api";

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function authLogin(email, password) {
  const response = await api.post("/ApiAuth/login", { email, password });
  const data = response.data;
  await SecureStore.setItemAsync("token", data.token);
  //console.log("Data: ",data)
  return data; // ya parseado, axios lo hace automático
}

export async function authRegister(name, email, password, role) {
  const response = await api.post("/ApiAuth/register", { nombre: name, email, password, idRol:role });
  const data = response.data;
  //console.log("Data: ",data)
  await SecureStore.setItemAsync("token", data.token);
  return data;
}

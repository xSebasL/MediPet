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

export const getPets = async () => {
  const res = await api.get("/pets");
  return res.data;
};

export const createPet = async (payload) => {
  /* // payload: { nombre, especie, raza, edad, photoUrl }
  const res = await api.post("/pets", payload);
  return res.data; */
  // payload: { nombre, especie, raza, edad, imageUri }

  let imageUrl = null;

  // Si hay imagen, primero la subimos
  if (payload.imageUri) {
    imageUrl = await uploadImage(payload.imageUri);
  }

  // Luego creamos la mascota con la URL
  const res = await api.post("/pets", {
    nombre: payload.nombre,
    especie: payload.especie,
    raza: payload.raza,
    edad: payload.edad,
    imagenUrl: imageUrl, // guardas la URL que devuelve tu backend
  });

  return res.data;
};

export const updatePet = async (id, payload) => {
  const res = await api.put(`/pets/${id}`, payload);
  return res.data;
};

/*export const deletePet = async (id) => {
  const res = await api.delete(`/pets/${id}`);
  return res.status === 204;
};*/

export async function uploadImage(imageUri) {
  const formData = new FormData();

  formData.append("file", {
    uri: imageUri, // ruta local de la imagen
    type: "image/jpeg", // o image/png
    name: "photo.jpg", // nombre del archivo
  });

  const token = await SecureStore.getItemAsync("token");

  const response = await axios.post(`${API}/filestorage/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.url; // el backend devuelve { url: "https://..." }
}
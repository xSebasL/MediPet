import axios from "axios";

const API = "http://192.168.1.13:5000/api";

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  }
})

/*api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});*/

export async function authLogin(email, password) {
  const response = await api.post("/ApiAuth/login", { email, password });
  const data = response.data;
  //console.log("Data: ",data)
  return data; // ya parseado, axios lo hace automático
}

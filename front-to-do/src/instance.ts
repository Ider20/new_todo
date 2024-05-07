import axios from "axios";
const localBackEnd = "http://localhost:8080";
export const axiosInstance = axios.create({
  baseURL: localBackEnd,
  timeout: 8000,
});

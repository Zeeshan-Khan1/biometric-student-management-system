import axios from "axios"
import { API_URL } from "../config/api"

// Simple Axios instance without auth headers (login disabled for now)
const api = axios.create({
  baseURL: API_URL
})

export default api


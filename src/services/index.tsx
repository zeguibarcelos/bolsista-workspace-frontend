import axios from "axios";

const Api = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export default Api;

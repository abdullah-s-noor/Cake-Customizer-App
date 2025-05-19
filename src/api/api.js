import axios from 'axios';

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "https://bimicake.onrender.com", // you can customize this
  headers:{
    Authorization: `Bearer ${token}`,
  }
});
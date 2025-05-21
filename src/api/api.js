import axios from 'axios';

const token = localStorage.getItem("userToken");

export const api = axios.create({
  baseURL: "https://bimicake.onrender.com", // you can customize this
  headers:{
    Authorization: `${token}`,
  }
});
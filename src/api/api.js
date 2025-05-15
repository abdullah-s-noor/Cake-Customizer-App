import axios from 'axios';


export const api = axios.create({
  baseURL: "https://86f4c748-2a70-40d7-93b9-09c7aa25f5bb.mock.pstmn.io", // you can customize this
});
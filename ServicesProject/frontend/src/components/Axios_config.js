import axios from 'axios';

const instance = axios.create({
  baseURL:"https://teamservicesproject-backend.onrender.com" // adjust if your backend runs elsewhere
});

export default instance;

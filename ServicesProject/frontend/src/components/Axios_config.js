import axios from 'axios';

const instance = axios.create({
  baseURL:"https://team201services-1.onrender.com" // adjust if your backend runs elsewhere
});

export default instance;




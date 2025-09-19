import axios from 'axios';

const instance = axios.create({
  baseURL:"http://localhost:4000" // adjust if your backend runs elsewhere
});

export default instance;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://etec.jhonnatthan.dev/api/v1',
});

export default api;
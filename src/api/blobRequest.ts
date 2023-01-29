import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const blobRequest = axios.create({
  baseURL: '/api',
  timeout: 60000,
  responseType: "blob"
});

blobRequest.interceptors.request.use(async (config) =>{
  nprogress.start();
  return config;
});

blobRequest.interceptors.response.use((res)=>{
  nprogress.done();
  return res;
}, (err) =>{
  return Promise.reject(err);
});

export default blobRequest;



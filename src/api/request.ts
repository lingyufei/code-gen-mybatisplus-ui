import axios from 'axios'
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const requests = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

requests.interceptors.request.use(async (config) =>{
  nprogress.start();
  return config;
});

requests.interceptors.response.use( async (res)=>{
  nprogress.done();
  return res.data;
}, (err) =>{
  return Promise.reject(new Error("请求异常: " + err));
});

export default requests;



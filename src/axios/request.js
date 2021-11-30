import axios from 'axios'
import NProgress from "nprogress";
import router from "@/router";

NProgress.start();

const request = axios.create({
  baseURL:'/api' ,
  timeout: 5000
})

request.interceptors.request.use(config =>{
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  // config.headers['token'] = user.token;  // 设置请求头

  const userJson = sessionStorage.getItem("user")
  if(!userJson)
  {
    router.push("/login")
  }
  return config
}, error =>
{
  return Promise.reject(error)
});

request.interceptors.response.use(
  response =>
  {
    let res = response.data;
    if (response.config.responseType === 'blob')
    {
      return res
    }
    if (typeof res === 'string')
    {
      res = res ? JSON.parse(res) : res
    }
    return res;
  },
  error =>
  {
    console.log('err' + error)
    return Promise.reject(error)
  }
)
NProgress.done();
export default request


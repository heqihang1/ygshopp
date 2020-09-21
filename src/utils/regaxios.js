import axios from "axios"
import { Toast} from 'antd-mobile';
const instance = axios.create({
    baseURL: 'http://s.linweiqin.com/api/s/',
});
// 请求的拦截
instance.interceptors.request.use(function (config) {
    Toast.loading('Loading...', 0, null,true);
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应的拦截
instance.interceptors.response.use(function (response) {
    Toast.hide();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.message;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default instance
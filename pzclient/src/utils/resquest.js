import axios from 'axios'


const http = axios.create({
    // 通用请求的地址前缀
    // baseURL: 'https://wechatopen.mynatapp.cc/v3pz',
    baseURL: 'https:/v3pz.itndedu.com/v3pz',
    timeout: 10000, // 超时时间
    Headers: { "terminal": "h5" }
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 不需要添加token的api
    const whiteUrl = ['/login']
    const token = localStorage.getItem('h5_token')
    if (token && !whiteUrl.includes(config.url)) {
      config.headers['h-token'] = token
      
       //config.headers['auth'] = '13797053405'
    }
    return config;


  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对于接口返回异常的数据，给用户一点提示
    if (response.data.code === -1) {
      
    }
    if(response.data.code === -2){
      //localStorage.removeItem('h5_token')
      //localStorage.removeItem('h5_userInfo')
    }
    return response;

  }, function (error) {
    // 对响应错误做点什么
    ElMessage.error('网络异常，请检查！')
    return Promise.reject(error);
  });

export default http
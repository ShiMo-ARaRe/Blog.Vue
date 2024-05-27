import store from "../store";
import router from "../router";
// import applicationUserManager from "../Auth/applicationusermanager";
import axios from 'axios'; // 引用axios

// 配置API接口地址
// var root1 = "http://localhost:58427/api";//测试本地，用CORS跨域
var root = "/api/";//用proxy实现本地代理跨域（生产环境使用的是nginx）

// 用于自定义判断元素的类型
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}

// 过滤掉对象中的 null 值,并对字符串进行 trim() 操作
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}

// http request 拦截器
var storeTemp=store;//这里将 store 实例缓存到 storeTemp 变量中。这是为了在后续的拦截器回调函数中能够访问到 store 实例。

axios.interceptors.request.use(
  config => {
    console.log("此次请求的参数为:"+config.params)//首先打印出请求的参数 config.params。
    if (storeTemp.state.token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      // console.log(storeTemp.state.token)
      config.headers.Authorization ="Bearer "+ storeTemp.state.token;
    }
    return config;  //返回修改后的 config 对象,以便 Axios 使用这个配置发送请求。
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log("浏览器返回的数据为:", response);//浏览器返回的数据
    return response;
  },
  error => {
    if (error.response) {
      console.log("Received error response:", error.response); //打印错误信息
      switch (error.response.status) {  //检查 error.response 是否存在,这意味着服务器返回了一个实际的响应,而不是网络错误等。
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
            // store.commit("saveToken", "");
            
            //Id4的处理方式
            // window.localStorage.removeItem("USER_NAME");
            // applicationUserManager.login();
            
            //jwt的处理方式
            router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios(method, url, params, success, failure) {
  if (params) {
    //在发送请求之前,函数会调用 filterNull 函数来过滤掉参数对象中的空值。避免将无用的参数发送到服务器。
    params = filterNull(params);
  }
  axios({
    method: method, //请求方法,由函数参数传入
    url: url, //接口 URL,由函数参数传入
    data: method === "POST" || method === "PUT" ? params : null,  //如果请求方法是 "POST" 或 "PUT",则将参数对象设置为请求体
    params: method === "GET" || method === "DELETE" ? params : null, //如果请求方法是 "GET" 或 "DELETE",则将参数对象设置为查询参数
    baseURL: root,  //请求的基础 URL,在这里设置为 root 变量
    // `headers` 是即将被发送的自定义请求头
    withCredentials: false  //是否跨域携带 cookie,这里设置为 false
  })
    .then(function(res) { //如果请求成功,则调用 success 回调函数,并将服务器返回的数据 (res.data) 作为参数传入。
      console.log("服务器返回的数据为:", res.data);//打印服务器返回的数据
      success(res.data);
    })
    .catch(function(err) {  //如果请求失败,则调用 failure 回调函数,并在此之前弹出一个 alert 窗口,显示错误的 HTTP 状态码。
      let res = err.response;
      if (err) {
        window.alert("api error, HTTP CODE: " + res.status);
      }
    });
}

// 返回在vue模板中的调用接口
export default {
// 该对象包含了四个方法:get、post、put 和 delete。
// 每个方法都接受四个参数:
// url: 请求的 URL
// params: 请求参数
// success: 请求成功的回调函数
// failure: 请求失败的回调函数
  get: function(url, params, success, failure) {
    return apiAxios("GET", url, params, success, failure);
  },
  post: function(url, params, success, failure) {
    return apiAxios("POST", url, params, success, failure);
  },
  put: function(url, params, success, failure) {
    return apiAxios("PUT", url, params, success, failure);
  },
  delete: function(url, params, success, failure) {
    return apiAxios("DELETE", url, params, success, failure);
  }
};
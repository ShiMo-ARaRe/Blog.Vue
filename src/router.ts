import Router from "vue-router";
import store from "./store";
import Vue from "vue";
import Home from "./views/Home.vue";
import FormVuex from "./views/FormVuex.vue";
import Content from "./views/content.vue";
import Login from "./views/Login.vue";
import LoginCallbackView from "./views/LoginCallbackView.vue";
import Editor from "./views/Editor.vue";

// import applicationUserManager from "./Auth/applicationusermanager";

Vue.use(Router);  //注册 vue-router 插件,使 Vue 实例能够使用路由相关的功能。

//创建路由实例
const router = new Router({
  mode: "history",  //使用 HTML5 History API 管理路由,避免使用哈希 URL
  base: process.env.BASE_URL, //设置应用的基础 URL，其值来源于vue.config.js文件，为/
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/Editor",
      name: "Editor",
      component: Editor
    },
    {
      path: "/Vuex",
      name: "Vuex",
      component: FormVuex
    },
    {
      path: "/Content/:id",
      name: "Content",
      component: Content,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/callback",
      name: "LoginCallbackView",
      component: LoginCallbackView
    },
    {
      path: "/about",
      name: "about",
      /*  指定了当这个路由被匹配时,要渲染的组件。
          这里使用了动态导入(dynamic import)的方式,也就是说组件会在需要时才被加载,而不是在应用程序启动时就全部加载。*/
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Form.vue")
    },
    {
      path: "/home2",
      name: "home2",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home2.vue")
    }
  ]
});

//将 Vuex 的 store 实例赋值给了一个变量 storeTemp。这样做的目的是为了方便在后面的代码中使用 Vuex 的状态和mutations。
var storeTemp = store;
//这是 Vue 路由的一个钩子函数,在每次路由跳转之前都会执行这个函数。
// to: 即将要进入的目标路由对象
// from: 当前导航正要离开的路由对象
// next: 一个函数,用于控制路由跳转的流程
router.beforeEach((to, from, next) => {
  if (!storeTemp.state.token) {// 这里首先检查 Vuex 的 state.token 是否存在。
//如果 state.token 不存在,则尝试从 localStorage 中获取 Token 值,并提交 saveToken mutation 来保存到 Vuex 的 state 中。
    storeTemp.commit("saveToken", window.localStorage.Token);
  }
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (storeTemp.state.token) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      //这里使用Id4授权认证，用Jwt，请删之，并把下边的跳转login 打开；
      // applicationUserManager.login();

      //这里使用Jwt登录，如果不用Id4授权认证，这里打开它；
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;

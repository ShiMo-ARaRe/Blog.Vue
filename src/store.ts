import Vue from "vue";
import Vuex from "vuex";

//使用 Vue.use() 方法注册 Vuex 插件,这样 Vue 实例就能使用 Vuex 的功能了。
Vue.use(Vuex);

//创建一个 Vuex 的 store 实例,该实例将成为整个应用程序的状态管理中心。
const store = new Vuex.Store({
  // 初始化的数据
  state: {
    formDatas: null,  //用来存储表单数据的,初始值为 null。
    token: null //用来存储用户登录token的,初始值也为 null。
  },
  // 改变state里面的值得方法
  mutations: {
    //这个 mutation 用于更新 state.formDatas 的值,将 data 参数的值赋给 state.formDatas。
    getFormData(state, data) {
      state.formDatas = data;
    },
    //这个 mutation 用于更新 state.token 的值,将 data 参数的值赋给 state.token。并且还将该 token 值保存到浏览器的 localStorage 中。
    saveToken(state, data) {
      state.token = data;
      window.localStorage.setItem("Token", data);
    }
  }
});
// 输出模块
export default store;

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {}
// });

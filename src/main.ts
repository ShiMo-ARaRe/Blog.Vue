import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// import VueQuillEditor from "vue-quill-editor"
// Vue.use(VueQuillEditor);


import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);


// 引用API文件
import api from "@/api/http.ts"
// 将API方法绑定到全局
Vue.prototype.$api = api;

/*  控制 Vue.js 在浏览器控制台上打印的提示信息
    当 productionTip 设置为 true(默认值)时,当您在生产环境下使用 Vue.js 时,
    浏览器控制台会打印一些提示信息,提醒您 Vue.js 正在运行在生产环境中。
    这些提示信息可能会影响应用程序的性能,因为它们需要额外的计算资源。*/
Vue.config.productionTip = false; 


new Vue({
    store,  // 将Vuex 状态管理器注入到 Vue 实例中。
    router, //将路由实例注入到 Vue 实例中。
  render: h => h(App) //指定应用程序的根组件为 App.vue
}).$mount("#app");  //将创建的 Vue 实例挂载到 HTML 文档中 id 为 "app" 的元素上。


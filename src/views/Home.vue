<template>
    <div class="home">
        <article class="newhome" v-cloak >
            <!--lbox begin-->
            <div class="lbox" v-loading="pictLoading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="Loading..." >
                <div class="ad whitebg"></div>
                <template v-if="isShow" >
                    <div class="whitebg bloglist">
                        <h2 class="htitle">最新博文
                            <router-link :to="'/Editor'" class="prev" style="float:right;" rel="prev">
                                Add My Study
                            </router-link>
                        </h2>
                        <ul>
                            <div v-for="i in 6" :key="i" v-cloak>
                                <el-row :gutter="20">
                                    <el-col :span="7">
                                        <div class="grid-content bg-purple"></div>
                                    </el-col>

                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple"></div>
                                    </el-col>
                                </el-row>
                                <p class="bloginfo">
                                    <i  class="avatar"></i>
                                    <span>技术博文</span>
                                    <span>2019-01-01</span>
                                    <span>【<a  href="/">Author</a>】</span>
                                    <a href="/" class="viewmore-row">更多</a>
                                </p>
                            </div>
                        </ul>
                        <nav id="page-nav">
                            <router-link :to="'/?page=' + (page>1?page-1:1)" class="prev" rel="prev">{{(page>1? "pre": "")}}</router-link>
                            <router-link :to="'/?page=' + (page>=TotalCount? TotalCount: page+1)" class="next" rel="next">
                                {{(page>=TotalCount? "": "Next")}}
                            </router-link>
                        </nav>
                    </div>
                </template>
                <div v-else name="fade" mode="out-in"  class="whitebg bloglist">
                    <h2 class="htitle">最新博文
                        <router-link :to="'/Editor'" class="prev" style="float:right;" rel="prev">
                            Add My Study
                        </router-link>
                    </h2>
                    <ul>
                        <!--单图-->
                        <li v-for="i in list" :key="i.bID">
                            <h3 class="blogtitle">
                                <router-link :to="'/content/' + i.bID">
                                   <span  v-cloak>{{ i.btitle }}</span>
                                </router-link>
                            </h3>
                            <span class=""><i><a href="/"></a></i><a href="/" title=""></a></span>
                            <p class="blogtext" v-text="i.bRemark"></p>
                            <p class="bloginfo"><i class="avatar"></i>
                                <span  v-cloak>{{i.bcategory}}</span>
                                <span  v-cloak>{{formatCreateTime(i)}}</span>
                                <span  v-cloak>【<a href="/">{{i.bsubmitter}}</a>】</span>
                            </p>
                            <a href="/" class="viewmore">更多</a></li>

                    </ul>
                    <nav id="page-nav">
                        <router-link :to="'/?page=' + (page>1?page-1:1)" class="prev" rel="prev">
                            {{(page>1? "pre": "")}}
                        </router-link>
                        <router-link :to="'/?page=' + (page>=TotalCount? TotalCount: page+1)" class="next" rel="next">
                            {{(page>=TotalCount? "": "Next")}}
                        </router-link>
                    </nav>
                </div>
                <!--bloglist end-->
            </div>
            <div class="rbox">
                <div class="card">
                    <h2></h2>
                    <p>Nick：F Z J </p>
                    <p>Work：.net core & Vue</p>
                    <p>Add：Hubei Huangshi</p>
                    <p>Email：2366088044@qq.com</p>
                    <ul class="linkmore">
                        <li>
                            <a href="https://space.bilibili.com/500974396" target="_blank" class="iconfont icon-zhuye" title="B站地址"></a>
                        </li>
                        <li>
                            <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=2366088044@qq.com" target="_blank" class="iconfont icon-youxiang" title="我的邮箱"></a>
                        </li>
                        <li>
                            <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=2366088044&amp;site=qq&amp;menu=yes" target="_blank" class="iconfont icon---" title="QQ联系我"></a>
                        </li>
                        <li>
                            <a href="https://github.com/ShiMo-ARaRe" target="_blank" class="iconfont icon-weixin" title="github"></a>
                        </li>
                    </ul>
                    <p style="float: left;">过期时间：{{expDate}}</p>
                </div>
                <div class="whitebg notice">
                    <h2 class="htitle">网站公告</h2>
                    <img src="../assets/QQGroup.png"/>
                    <ul>
                        <li></li>
                        <li><a target="_blank"
                               href="http://120.76.99.240/">项目一：.netcore+vue
                            前后端分离!</a></li>
                        <li><a target="_blank"
                               href="http://120.76.99.240:8080/">项目二：微服务架构</a>
                        </li>
                        <!-- <li><a target="_blank"
                               href="https://www.cnblogs.com/laozhang-is-phi/p/10236645.html#autoid-2-1-0">系列教程三：Nuxt
                            TiBug系统</a></li>
                        <li><a target="_blank"
                               href="https://www.cnblogs.com/laozhang-is-phi/p/10438122.html#autoid-2-0-0">系列教程四：VueAdmin
                            后台管理系统</a></li>
                        <li><a target="_blank"
                               href="https://www.cnblogs.com/laozhang-is-phi/p/10483922.html#autoid-3-0-0">系列教程五：IdentityServer4
                            授权服务器</a></li> -->
                    </ul>
                </div>

            </div>
        </article>
        <footer>
            <div class="box">

                <div class="endnav">
                   <div id="footer" style="text-align: center;">
                      Copyright © 2018-2020 老张的哲学
                      <br><span id="poweredby">Powered by VUE 2.6.10 on Docker &amp; CentOS 7.6 By Jenkins</span>
                  </div>
                </div>
            </div>
        </footer>

    </div>
</template>

<script>
// @ is an alias to /src
import util from "../../util/date"; //引入了 util 工具类,用于格式化日期

export default {
  name: "home",
  components: {},
  data() {
    return {
      page: 1,  //当前页码,初始值为 1。
      TotalCount: 1,  //博客总数,初始值为 1。
      pictLoading: true,  //是否显示加载中的样式,初始值为 true。
      isShow: true, //是否显示加载中的内容,初始值为 true。
      list: [], //博客列表数据。
      // expDate: "" //用户登录过期时间,从 localStorage 中获取。
    };
  },
  created() {
    // this.expDate = window.localStorage.getItem("USER_EXP") || ""; //在组件创建时,从 localStorage 中获取用户登录过期时间。
  },
  mounted() {
    //在组件挂载完成时,调用 getData() 方法获取博客列表数据,同时从 localStorage 中获取用户登录过期时间。
    this.getData();
    // this.expDate = window.localStorage.getItem("USER_EXP") || "";
  },
  methods: {
    //格式化博客的创建时间,使用 util.formatDate.format() 方法将时间格式化为 "yyyy-MM-dd"。
    formatCreateTime: function(row) {
      return !row.bCreateTime || row.bCreateTime == ""
        ? ""
        : util.formatDate.format(new Date(row.bCreateTime), "yyyy-MM-dd");
    },
    /*  获取博客列表数据,根据当前页码 page 发送 GET 请求到后端接口 Blog/?page=xxx。
        请求成功后,更新 list、page、TotalCount 和 isShow、pictLoading 状态。*/
    getData() {
      var that = this;  //将当前组件实例的 this 引用保存在 that 变量中。这是为了在回调函数中能够访问组件实例的属性和方法。
      // 获取 URL 中 page 参数的值,并将其赋值给 that.page 变量。这样可以在页面刷新或通过链接访问时,保持当前的分页状态。
      var urlPage = that.$route.query.page; 
      if (urlPage) {
        that.page = urlPage;
      }
      this.$api.get("Blog/?page=" + that.page, { test: 33 }, r => {
        //第二个参数 { test: 33 } 是请求的查询参数,在这里是一个测试参数。
        /*第三个参数是请求成功后的回调函数 r => { ... }。
          在回调函数中,先将服务器返回的数据赋值给 this.list。
          然后将响应中的 page 和 pageCount 属性分别赋值给 this.page 和 this.TotalCount。这些数据用于分页控制。
          最后将 this.isShow 和 this.pictLoading 设置为 false,表示数据已经加载完成,可以隐藏相关的加载状态指示。*/
        this.list = r.response.data;  //博客列表数据
        this.page = r.response.page;  //当前页码
        this.TotalCount = r.response.pageCount; //博客总数

        //将 this.isShow 和 this.pictLoading 设置为 false,表示数据已经加载完成,可以隐藏相关的加载状态指示。
        this.isShow = false;  //不显示加载中的内容
        this.pictLoading = false; //不显示加载中的样式
      });
    }
  },
  watch: {
    //监听 URL 路由的变化,如果页码发生变化,则清空 list、设置 isShow 为 true,并重新调用 getData() 方法获取数据。
    $route(to) {
      this.list = [];
      this.isShow = true;
      this.page = to.query.page;
      this.getData();
    }
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.viewmore-row {
  float: right;
  background: #12b7de;
  color: #fff;
  border-radius: 3px;
  padding: 0px 10px;
  height: 30px;
}
.bg-purple {
  background: #eaeaea;
  -webkit-animation: loading 1s ease-in-out infinite;
  animation: loading 1s ease-in-out infinite;
}
@keyframes loading {
  0% {
    width: 90%;
  }
  50% {
    width: 100%;
  }
  to {
    width: 90%;
  }
}
[v-cloak] {
  display: none !important;
}
</style>

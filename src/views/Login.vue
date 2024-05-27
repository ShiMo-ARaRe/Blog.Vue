<template>
    <el-row type="flex" justify="center">
        <el-card v-if="isLogin">
            欢迎：admins
            <br>
            <br>
            <el-button type="primary" icon="el-icon-upload" @click="loginOut">退出登录</el-button>
        </el-card>
        <el-form v-else ref="loginForm" :model="user" :rules="rules" status-icon label-width="50px">
            <el-form-item label="账号" prop="name">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="user.pass" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
export default {
  methods: {
    login: function() {
      let that = this;  // 保存当前组件实例的引用,以便在回调函数中使用。
        that.$store.commit("saveToken", "");  //在开始登录前,先将 Vuex 中的 token 清空。
        //使用 validate 方法验证表单是否合法,如果合法则继续执行登录逻辑。
        this.$refs.loginForm.validate(valid => {
            if (valid) {
          this.$api.get(  //调用后端的登录 API,传入用户名和密码作为参数。
            "Login/JWTToken3.0",
            { name: that.user.name, pass: that.user.pass },
            r => {  //这是一个回调函数,当 API 请求完成后会被调用,并将服务器响应作为参数 r 传递进来。
              if (r.success) {  //查服务器响应中的 success 字段,如果为 true，则表示登录成功。
                var token = r.response.token;  //从服务器响应中获取 token 值,并将其保存到一个变量 token 中。
                //使用 Vuex 的 commit 方法,将获取的 token 值保存到 Vuex 的状态中。这样其他组件就可以访问到这个 token 值。
                that.$store.commit("saveToken", token);
                this.$notify({  //使用 Element UI 的 $notify 方法,弹出一个成功提示,欢迎用户登录。
                  type: "success",
                  message: "欢迎你," + this.user.name + "!",
                  duration: 3000
                });

                window.localStorage.setItem("USER_NAME", this.user.name);

                  console.log("用户Token为："+r.response.token);//在控制台打印当前保存在 Vuex 中的 token 值。
                  console.log("路由跳转参数为："+that.$route.query.redirect);//在控制台打印从路由查询参数中获取的 redirect 值。
                 //根据路由查询参数中的 redirect 值进行页面跳转,如果没有 redirect 值则跳转到根路径 /。
                 this.$router.replace(that.$route.query.redirect? that.$route.query.redirect:"/");
              } else {  //如果服务器响应的 success 字段为 false，则表示登录失败
                this.$message({
                  type: "error",
                  message: "用户名或密码错误",
                  showClose: true
                });
              }
            }
          );
        } else {
          return false;
        }
      });
    },
      loginOut(){
          this.isLogin=false; //将组件的 isLogin 状态设置为 false,表示用户已经退出登录。
          this.$store.commit("saveToken", "");  //清空token

      }
  },
  data() {
    return {
        isLogin:false,  //用于标记当前用户是否处于登录状态
      user: { //定义了一个默认的用户名和密码。
          name:"",
          pass:"",
      },
      rules: {  // 定义了表单验证规则,要求用户名和密码不能为空。
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        pass: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
    created() { //在组件创建时执行
      var that=this;  //保存当前组件实例的引用
      //检查 Vuex 中是否存在有效的 token,如果存在则将 isLogin 状态设置为 true,表示用户已经登录。
        if (that.$store.state.token&&that.$store.state.token.length>=128){
            this.isLogin=true;
        }
    }

};
</script>

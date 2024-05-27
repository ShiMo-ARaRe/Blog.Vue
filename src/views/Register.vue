<template>
  <el-row type="flex" justify="center">
    <el-form
      ref="registerForm"
      :model="userInfo"
      :rules="rules"
      status-icon
      label-width="100px"
    >
      <el-form-item label="登录名" prop="uLoginName">
        <el-input v-model="userInfo.uLoginName"></el-input>

      </el-form-item>
      <el-form-item label="密码" prop="uLoginPWD">
        <el-input v-model="userInfo.uLoginPWD" type="password"></el-input>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input-number
          v-model.number="userInfo.age"
          :min="0"
          placeholder="请输入年龄"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="userInfo.sex">
          <el-option label="女" :value="0"></el-option>
          <el-option label="男" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="真实姓名" prop="uRealName">
        <el-input v-model="userInfo.uRealName"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="DepartmentId">
        <el-select v-model="userInfo.DepartmentId" placeholder="选择部门">
          <el-option
            v-for="item in departments"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="uRemark">
        <el-input v-model="userInfo.uRemark"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-upload" @click="register"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import router from "../router";

export default {
  data() {
    return {
      userInfo: {
        uLoginName: "",
        uLoginPWD: "",
        age: null, // 设置为 null 表示非必填
        sex: null // 设置为 null 表示非必填
        // uRealName: "",
        // DepartmentId: null,
        // uRemark: "",
      },
      // departments: [], // 部门列表
      rules: {
        uLoginName: [
          { required: true, message: "登录名不能为空", trigger: "blur" },
        ],
        uLoginPWD: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur",
          },
        ],
        // uRealName: [
        //   { required: true, message: "真实姓名不能为空", trigger: "blur" },
        // ],
        // DepartmentId: [
        //   { required: true, message: "请选择所属部门", trigger: "change" },
        // ],
      },
    };
  },
  created() {
    // this.fetchDepartments();
  },
  methods: {
    register() {
      //提交
      //this.$refs.infoForm 是一个对表单元素的引用,通过这个引用可以访问表单的相关方法和属性。
      //this.$refs.infoForm.validate，这里使用了 Vue.js 的表单验证机制
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.submitRegistration();
        } else {
          return false;
        }
      });
    },
    submitRegistration() {
      this.$api.post("/User/Post", this.userInfo, r => {
          console.log("注册账号 - r.response为："+r.response);  //测试用
          if (r.success) {
            this.$notify({  //使用 Element UI 的 $notify 方法,弹出一个成功提示,欢迎用户注册。
                  type: "success",
                  message: "注册成功",
                  duration: 3000
                });
            this.resetForm();// 重置表单数据
            router.replace({
            path: "/login",
            query: { redirect: "/" }
          });
          } else {
            var errorMsg = r.msg;
              this.$message({
                type: "error",
                message: errorMsg,
                showClose: true //显示一个关闭按钮。用户可以点击这个按钮来关闭消息框。
              });
          }
        })
    },
    resetForm() {
      this.$refs.registerForm.resetFields();  //重置表单中的所有字段为初始值。
    },
    // fetchDepartments() {  //获取所有部门
    //   this.$api.get("/api/departments").then((response) => {
    //     this.departments = response.data;
    //   });
    // },
  },
};
</script>
<template>
  <div>
    <el-row class="warp">
      <!--
            Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
      -->
      <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="btitle">
            <el-input v-model="infoForm.btitle"></el-input>
          </el-form-item>

          <el-form-item label="分类">
            <el-select v-model="infoForm.bcategory" placeholder="请选择文章分类">
              <el-option label="技术博文" value="技术博文"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="作者" prop="bsubmitter">
            <el-input v-model="infoForm.bsubmitter"></el-input>
          </el-form-item>
          <!--使用编辑器
          -->
          <el-form-item label="详细" prop="bcontent">
            <div class="edit_container">
              <quill-editor
                v-model="infoForm.bcontent"
                ref="myQuillEditor"
                class="editer"
                :options="editorOption"
                @ready="onEditorReady($event)"
              ></quill-editor>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import { quillRedefine } from "vue-quill-editor-upload"; // 上传图片

// require styles
// Quill 编辑器的样式文件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      infoForm: {
        btitle: "", //博文的标题
        bsubmitter: "", //提交人
        bcategory: "技术博文",  //分类
        bcontent: ""  //内容
      },
      editorOption: {}, //用于配置富文本编辑器的参数,比如图片上传的设置等
      //表单验证
      rules: {  //定义了表单验证的规则，这些验证规则将在表单提交时起作用,确保用户输入了必要的信息。
        //规定了标题字段是必填的,并在验证未通过时显示错误提示
        btitle: [{ required: true, message: "请输入标题", trigger: "blur" }], 
        //规定了内容字段是必填的,并在验证未通过时显示错误提示。
        bcontent: [
          { required: true, message: "请输入详细内容", trigger: "blur" }
        ]
      }
    };
  },
  computed: { //计算属性
    editor() {
      var quill=this.$refs.myQuillEditor.quill;//获取到了 Quill 富文本编辑器的实例
      var toolbar = quill.getModule('toolbar');//然后通过 getModule 方法获取到了工具栏模块
      /*  在 Quill 富文本编辑器中,当用户点击"图片"按钮时,
          编辑器会调用 toolbar.addHandler('image', imageUpload) 指定的 imageUpload 函数来处理上传图片的逻辑。
          如果您的前端代码中没有定义 imageUpload 函数,那么就会导致无法正确处理图片上传的请求,进而出现 400 Bad Request 错误。*/
      toolbar.addHandler('image', imageUpload);//它给工具栏的 image 按钮添加了一个自定义的处理函数 imageUpload
      return this.$refs.myQuillEditor.quill;//最后,这个计算属性返回了 Quill 编辑器的实例
    }
  },
  created() { //在组件创建时被调用
    this.editorOption = quillRedefine({ //调用了 quillRedefine 函数来对 editorOption 对象进行配置
      // 图片上传的设置
      uploadConfig: {
        action: "/images/Upload/Pic", // 必填参数 图片上传地址
        // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
        // 你必须把返回的数据中所包含的图片地址 return 回去
        res: respnse => {
        
          console.log(respnse.response);
          return "/"+respnse.response;
        },
        methods: "POST", // 可选参数 图片上传方式  默认为post
        name: "img", // 可选参数 文件的参数名 默认为img
        size: 500, // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
        accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon", // 可选参数 可上传的图片格式
        header: (xhr, formData) => {  //用于在上传请求头中添加 Authorization 头,它可能会用于身份验证。
              xhr.setRequestHeader('Authorization',"Bearer "+localStorage.Token);
              // formData: 表单对象
              // formData.append('Name', "laozhang")
        },
        start: () => {}, // 可选参数 接收一个函数 开始上传数据时会触发
        end: () => {}, // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
        success: () => {}, // 可选参数 接收一个函数 上传数据成功时会触发
        error: () => {} // 可选参数 接收一个函数 上传数据中断时会触发
      }
    });
  },
  mounted() {
    //初始化
  },
  methods: {
    onEditorReady(editor) {}, //这个方法在富文本编辑器准备就绪时被调用。
    onSubmit() {  //这个方法在用户提交表单时被调用。
      //提交
      //this.$refs.infoForm 是一个对表单元素的引用,通过这个引用可以访问表单的相关方法和属性。
      //this.$refs.infoForm.validate，这里使用了 Vue.js 的表单验证机制
      this.$refs.infoForm.validate(valid => {
        if (valid) {  //如果 valid 为 true，则表示表单验证通过。
          console.log(this.infoForm);
          var postPara = this.infoForm; //this.infoForm 是一个包含了表单数据的对象。
          this.$api.post("Blog", postPara, r => { //使用 this.$api.post 方法向服务器发送一个 POST 请求,将 postPara 作为请求参数。
            //r代表服务器的响应数据
            if (r.success) {  //如果响应成功
              var id = r.response;
              this.$notify({  //显示一个成功提示
                type: "success",
                message: "添加成功，感谢技术分享!",
                duration: 3000
              });
              this.$router.replace(`/content/${id}`);//导航到新添加博文的详情页面
            } else {  //如果响应失败,它会显示一个错误提示,并将错误信息存储在 errorMsg 变量中。
              var errorMsg = r.msg;
              this.$message({
                type: "error",
                message: errorMsg,
                showClose: true
              });
            }
            //它会更新一些组件状态,包括 list、page、TotalCount 和 isShow。这些状态可能用于分页、列表展示等功能。
            this.list = r.data; //博客列表数据
            this.page = r.page; //页码
            this.TotalCount = r.pageCount; //博客总数
            this.isShow = false;
          });
        }
      });
    }
  },
  components: { //定义了这个组件所使用的其他子组件
    //使用编辑器
    quillEditor,
    quillRedefine
  }
};
</script>

<style>
.warp {
  background: #fff;
  padding-top: 20px;
  width: 75%;
  margin: 0 auto;
}
.ql-container.ql-snow,
.ql-editor.ql-blank {
  min-height: 300px !important;
}
.el-form {
  padding-right: 80px !important;
}
</style>

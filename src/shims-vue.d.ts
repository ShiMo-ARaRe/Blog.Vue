// 这段代码也是一个 TypeScript 声明文件,用于支持在 TypeScript 项目中导入 .vue 文件。

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

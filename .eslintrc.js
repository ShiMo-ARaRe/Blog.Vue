// .eslintrc.js 是 ESLint 的配置文件,用于定义项目中的代码风格和质量规则。

module.exports = {
  root: true,
  env: {  // 定义代码运行的环境,如 browser、node 等,这会影响哪些全局变量可用
    node: true  
  },
  extends: ["plugin:vue/essential", "@vue/prettier"], //继承其他配置文件,如 eslint:recommended、plugin:vue/essential 等。
  rules: {  //定义具体的代码检查规则,可以启用、禁用或自定义规则
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {  //指定 ESLint 的解析器选项,如 ECMAScript 版本、源文件类型等。
    parser: "babel-eslint"
  }
};

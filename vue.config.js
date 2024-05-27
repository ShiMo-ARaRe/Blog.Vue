module.exports = {
  // 基本路径
  baseUrl: "/",
  // 输出文件目录
  outputDir: "dist",

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true, // 设置是否在保存文件时运行 ESLint 检查。

  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {}, //chainWebpack 是一个函数，你可以在其中链式调用 webpack 配置。
  configureWebpack: () => {}, //configureWebpack 是一个对象，你可以直接修改 webpack 配置。

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,

  // css相关配置
  css: {
    /*  这个选项决定是否使用 CSS 分离插件（ExtractTextPlugin）。
        如果设置为 true，CSS 将会被提取到单独的文件中，而不是内联到 JavaScript 文件中。
        这样可以优化页面加载性能，因为浏览器可以并行加载多个文件。*/
    extract: true,
    /*  sourceMap: 这个选项控制是否开启 CSS 的 source maps。
        Source maps 是一种映射文件，可以将编译后的 CSS 代码映射回原始的源代码，方便调试。
        如果你在开发环境中需要调试 CSS，可以将这个选项设置为 true。*/
    sourceMap: false,
    // 这里可以配置一些 CSS 预设器的选项。例如，如果你使用了 Sass 或 Less，你可以在这里设置一些预设器的配置。
    loaderOptions: {},
    /*  这个选项用于启用 CSS modules。CSS modules 是一种将 CSS 样式作用域限定在组件内部的技术，可以避免全局样式冲突。
        如果设置为 true，则会为所有 CSS 或预处理器文件启用 CSS modules。*/
    modules: false
  },

  /*  这个选项用于在生产构建时是否使用 thread-loader 来加速 Babel 和 TypeScript 的处理。
      如果你的机器有多个核心（CPU 多核心），并且设置为 true，则会启用 thread-loader。这可以提高构建性能。 */
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  /*  是一个 PWA 插件的相关配置。PWA（Progressive Web Apps）是一种 Web 应用程序的开发方法，旨在提供类似于原生应用的体验。
      在这里，你可以配置一些 PWA 的选项，例如应用的名称、图标、缓存策略等。 */
  pwa: {},

  // webpack-dev-server 相关配置
  devServer: {
    open: true, //配置自动启动浏览器
    host: "localhost", //指定开发服务器的主机名
    port: 6688, // 当前vue项目的端口号
    https: false, //控制是否启用 HTTPS
    hotOnly: false, // https:{type:Boolean} //控制是否启用热模块替换（HMR）
    // proxy: null, // 设置代理
    // proxy: 'http://123.206.33.109:9291',          // 配置跨域处理,只有一个代理
    proxy: {
      // 配置多个代理
      "/api": {
        target: "http://localhost:9291",//这里改成你自己的后端api端口地址，记得每次修改，都需要重新build
        //target: "http://localhost:58427",
        //target: "http://api.douban.com",
        ws: true, //表示启用 WebSocket 支持
        changeOrigin: true, //表示允许跨域请求时修改请求头中的 Origin 字段
        pathRewrite: {
          /*  路径重写配置，用于替换请求路径。
              在这里，"^/apb" 表示匹配以 /apb 开头的请求路径，并将其替换为空字符串，从而实现路径重写。*/
          "^/apb": "" // 替换target中的请求地址
        }
      },
      "/images": {
        target: "http://localhost:9291",
      }
    },
    before: app => {} //用于在开发服务器启动之前执行一些自定义操作
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};

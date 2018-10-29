
const glob = require('glob')
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {},
    basename, tmp, pathname, appname;

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    // console.log(entry)
    tmp = entry.split('/').splice(-3);
    console.log(tmp)
    pathname = basename; // 正确输出js和html的路径

    // console.log(pathname)
    entries[pathname] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
      title:  tmp[2],
      filename: tmp[2]
    };
  });
  return entries;
}

let pages = getEntry('./src/pages/**?/*.html');

module.exports = {
  lintOnSave: false, //禁用eslint
  baseUrl:process.env.NODE_ENV === "production"?'./':'/',
  outputDir:'dist',
  css: {
    loaderOptions: {
      stylus: {
        import: ['~@/common/style/util']
      }
      // modules: true,
      // 给 sass-loader 传递选项
      // sass: {
      //     // @/ 是 src/ 的别名
      //     // 所以这里假设你有 `src/variables.scss` 这个文件
      //     data: `@import "@/variables.scss";`
      // }
    }
  },
  productionSourceMap: false,
  pages,
  devServer: {
    index: 'demo.html', //默认启动serve 打开page1页面
    open: process.platform === 'darwin',
    host: '',
    port: 8888,
    https: false,
    hotOnly: false,
    before: app => {}
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('cube-ui','cube-ui/lib')
  },
  configureWebpack: {
    plugins: [
      new TransformModulesPlugin()
    ]
  }
}

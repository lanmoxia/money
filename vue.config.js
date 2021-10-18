const path = require('path')
module.exports = {
  lintOnSave: false,
  chainWebpack: config =>{
    // dir 目录的路径
    const dir = path.resolve(__dirname, 'src/assets/icons')

    config.module //Vue 把 webpack 封装暴露出一个 对象 config
      .rule('svg-sprite') // 添加规则 规则名字
      .test(/\.svg$/) //规则特点 能匹配这里的正则就能使用
        .include.add(dir).end() // 只需要 dir 这个目录走这个规则
        // 配置 loader
        .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()

        // 配置 svgo-loader 删除 svg 默认颜色
        //这个配置现在好像会坑人，可以手动删除svg的fill属性，或者改成fill="currentColor"
        //.use('svgo-loader').loader('svgo-loader')
        //.tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()

      // 配置插件
      config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
      config.module.rule('svg').exclude.add(dir) // 其他 SVG loader 排除 icons 目录
  }
}

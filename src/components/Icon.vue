<template>
    <svg class="icon">
      <use v-bind:xlink:href= "'#'+ name"/>
    </svg>
</template>

<script lang="ts">
//下边代码可实现将任意目录后缀的文件统一全部引入到当前文件
//定义一个 importAll 的方法
// 接受一个对象，调用它的 keys 然后遍历
// 因为这里是 ts 所以要告诉 ts 这个对象的类型
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
//单元测试的时候可能会报错，这里 try 一下 不要中断我的代码
try {
  // 这样就可以使用 importAll  然后指定去哪个目录
  importAll(require.context('../assets/icons', true, /\.svg$/))
}catch(error){
  error.log(error)
}
export default {
  props: ['name'],
  name: 'Icon'
};
</script>

<style lang="scss" scoped>

</style>
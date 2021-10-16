<template>
<div>
  你访问的网址不存在，请重新输入网址
  <div>
<!--    下边是两种返回首页用法-->
    <router-link to="/">返回首页</router-link>
    <a href="#/">返回首页</a>
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'NotFount'
};
</script>

<style lang="scss" scoped>

</style>
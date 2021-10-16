<template>
  <div class="nav-wrapper">
    <div class="content">
     <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.nav-wrapper{
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  // 最小宽度不行 就固定宽度
  height: 100vh;
}
.content{
  overflow: auto;
  border: 1px solid red;
  flex-grow: 1;
}
</style>
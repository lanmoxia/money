<template>
  <Layout class-prefix="layout">
    <NumberPad @update: value="onUpdateAmount"/>
    <!--    收入支出只能选一个 这里就不用加 s 了-->
    <Types @update: value="onUpdateType"/>
    <Notes @update: value="onUpdateNotes"/>
    <!--    触发 @update:value 事件 执行 onUpdateTags 函数-->
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts"> // 改成 TS 组件
import Vue from 'vue';
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component} from 'vue-property-decorator';

@Component({components: {Tags, Notes, Types, NumberPad}})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];

  onUpdateTags(value: string[]) { // 这里的参数名随便取
    // Vue 会把 Tags 组件中 value 标签选中取消状态作为第一个参数传到 onUpdateTags 函数
    console.log(value);
  }

  onUpdateNotes(value: string) {
    console.log(value);
  }

  onUpdateType(value: string) {
    console.log(value);
  }

  onUpdateAmount(value: string) { // 用户输入了 1. 还是一个字符串 所以这里类型不能是 number 只能是 string
    console.log(value);
  }
};
</script>
<style lang="scss">
  .layout-wrapper{
    //border: 10px solid red;
  }
  .layout-content{
    //border: 8px solid blue;
    display: flex;
    flex-direction: column-reverse;
  }
</style>

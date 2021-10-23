<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"/>
    <!--    收入支出只能选一个 这里就不用加 s 了-->
    <!--    :value="record.type"：把默认的 type 传过去 Types 组件内就不需要定义 type 了-->
    <!--    <Types :value="record.type" @update:value="onUpdateType"/>-->
    <!--    这里又出现了 :x update:x 可以使用 .sync 修饰符了 下边的 onUpdateType 函数就不需要了-->
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <!--    触发 @update:value 事件 执行 onUpdateTags 函数-->
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{ record }}
  </Layout>
</template>

<script lang="ts"> // 改成 TS 组件
import Vue from 'vue';
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component} from 'vue-property-decorator';

// 把监听的所有数据放到一个对象中
// 先在 TS 中定义对象 必须写类型 不用给值
type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
}

@Component({components: {Tags, Notes, Types, NumberPad}})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  // 然后初始化这个对象
  record: Record = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) { // 这里的参数名随便取
    // Vue 会把 Tags 组件中 value 标签选中取消状态作为第一个参数传到 onUpdateTags 函数
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  // onUpdateType(value: string) {
  //   this.record.type = value;
  // }

  onUpdateAmount(value: string) { // 用户输入了 1. 还是一个字符串 所以这里类型不能是 number 只能是 string
    this.record.amount = parseFloat(value);
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

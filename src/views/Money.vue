<template>
  <Layout class-prefix="layout">
    <!--    <NumberPad @update:value="onUpdateAmount"/>-->
    <!--    给NumberPad 一个默认值 这里又可以更改为 .sync -->
    <!--    <NumberPad :value="record.amount" @update:value="onUpdateAmount"/>-->
    <NumberPad :value.sync="record.amount"/>
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
    // 优化成 .sync 修饰符 我们需求更改了只需要修改这里的默认值就可以了 不用再修改其他小组件
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

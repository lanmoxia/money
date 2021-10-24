<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';

// 方法1：引入model.js：JS中使用 export default model; 导出
// const model = require('@/model.js').default;
// 方法2：引入model.js：JS中使用 export {model}; 导出
// const model = require('@/model.js').model;
// 析构赋值简写为
const {model} = require('@/model.js');

const recordList: Record[] = model.fetch(); // 这里使用

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number // 数据类型
  createdAt?: Date // TS 中出了基本类型 还可以写类 类是类型下的分支  => 相当于 JS 中的构造函数
}

@Component({components: {Tags, Notes, Types, NumberPad}})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];

  recordList: Record[] = recordList;
  record: Record = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
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

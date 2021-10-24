<template>
  <Layout class-prefix="layout">
    <!--    <NumberPad @update:value="onUpdateAmount"/>-->
    <!--    给NumberPad 一个默认值 这里又可以更改为 .sync -->
    <!--    <NumberPad :value="record.amount" @update:value="onUpdateAmount"/>-->
    <!--    @submit="saveRecord" ：监听 submit 事件-->
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <!--    触发 @update:value 事件 执行 onUpdateTags 函数-->
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts"> // 改成 TS 组件
import Vue from 'vue';
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';

//数 据 库 迁 移，多版本使用版本复用的方法
// 这里只是两个版本，如果多个版本，比如有三个版本，正确做法是：1-2;2-3 而不是 1-3;2-3

// 获取版本
const version = window.localStorage.getItem('version') || '0';
//拿到数据库
const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
// 升级数据库/数据库迁移
if (version === '0.0.1') {
  // 这里不能保证之前版本的数据具体保存时间，这里随便加一个确保结构是正确的
  // 遍历 record
  recordList.forEach(record => {
    record.createdAt = new Date(2020, 0, 1);
  });
  // 先保存数据 再把数据库版本变成 '0.0.2'
  window.localStorage.setItem('recordList', JSON.stringify(recordList));
}
// 更改数据库版本到 '0.0.2'
window.localStorage.setItem('version', '0.0.2');

// 把监听的所有数据放到一个对象中
// 先在 TS 中定义对象 必须写类型 不用给值
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
  // 定义 recordList 存放 record 存了 Record 的地址 没次刷新页面 recordList 都是空的
  // recordList: Record[] = [];
  // 每次刷新自动在 localStorage 读取
  // 获取的 recordList 是字符串 没办法放到数组 需要 parse 一下
  // 后边保底 '[]' 意思是有可能为空 空的话怎么可以 parse 给个保底字符串
  recordList: Record[] = recordList;//JSON.parse(window.localStorage.getItem('recordList') || '[]');
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

  saveRecord() {
    // 每次 push 之前深拷贝这样 localStorage 中就不会覆盖了
    // 相当于每次值保存了副本
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date(); // 数据保存的时候记录下时间
    this.recordList.push(record2);
    console.log(this.recordList);
    // 这种方法可以保存 缺点是如果在其他页面修改 其他页面也要重新保存 可以使用 watch 根据变化保存
    // localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }

  // 解决办法使用 watch 监听 哪里改变了保存哪里
  @Watch('recordList')
  onRecordListChange() {
    // 第一次用户点击1保存 得到 record：{amount:1}
    // recordList.push(this.record) 内存图中存的不是 amount 而是一个地址 101
    // record.amount = 2 用户点击了 2保存 第一次 push 的没变化还是那个地址 amount 变成了2
    // 第三次 list.push(record) 内存图中 0和1两个都是101 里边的 amount 都是2
    // 所以我们在 localString 每次保存后边的会覆盖前边的 解决办法就是 push 之前深拷贝
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }

  // onUpdateType(value: string) {
  //   this.record.type = value;
  // }

  // onUpdateAmount(value: string) { // 用户输入了 1. 还是一个字符串 所以这里类型不能是 number 只能是 string
  //   this.record.amount = parseFloat(value);
  // }
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

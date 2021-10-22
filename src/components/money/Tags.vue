<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <!--      :class="selectedTags.indexOf(tag) >= 0 && 'selected'"-->
      <!--      可以优化为一个对象：:class="{selected: selectedTags.indexOf(tag)>=0}"-->
      <li v-for="tag in dataSource" :key="tag"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click=" toggle(tag)">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  // 这里的 dataSource 是外部传进来 尽量不修改 使用 undefined 表示有可能没给值
  // string[] 这是表示字符串数组
  // 这里的 @Prop 修饰器在这个类里边 即使没有参数也需要加括号 外部 @Component 不用加
  @Prop() dataSource: string[] | undefined;// 默认标签数据
  selectedTags: string[] = [];// 选中的标签
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }

  create() {
    const name = window.prompt('请输入标签名');
    console.log(name);
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (this.dataSource) { // 这里 else 和 if 中间什么也没有 可以合并成 else if
      // Vue 不推荐修改外部数据
      // 使用 TS 阻止 @Prop() readonly dataSource: string[] | undefined; 只读
      // 如果是只读我们就不能添加了 显然这种方法不行
      //this.dataSource.push(name!);
      // 使用触发一个 $emit 事件来添加标签 事件中把 dataSource 更新请求告诉外部数据
      // 外部数据使用 .sync 修饰符，如果触发了 'update: dataSource' 事件 就把更新的数据复值给 <Tags :data-source.sync="tags"/>>
      // $emit(event: 告诉外部数据数据变化，[... 表示展开数据，添加新的 name])
      this.$emit('update:dataSource', [...this.dataSource, name]);

    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #d9d9d9;
      background: #cac9ce;
      $h: 24px;
      height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: $h/2;
      color: #1e1b1c;
      //確定裡邊只有一行字用 line-height
      //不能確定是一行字 每個 li flex 上下居中
      line-height: 24px;

      &.selected {
        background: darken($bg, 50%);
      }
    }
  }
  > .new{
    padding-top:16px;
    button{
      background: transparent;
      border: none;
      color: #1e1b1c;
      border-bottom: 1px solid;
      // 下邊線幣上邊的文字長 加 padding
      padding: 0 3px;
    }
  }
}
</style>
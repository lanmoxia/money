<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <!--      :class="selectedTags.indexOf(tag) >= 0 && 'selected'"-->
      <!--      可以优化为一个对象方式：:class="{selected: selectedTags.indexOf(tag)>=0}"-->
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
  @Prop() dataSource: string[] | undefined;// 默认标签数据
  selectedTags: string[] = [];// 选中的标签
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    // 用户选中或取消 触发 update:selected 事件，把 selectedTags 传出去
    // 外部监听 update:selected 事件调用函数 onUpdateTags 函数
    this.$emit('update:value', this.selectedTags);

  }

  create() {
    const name = window.prompt('请输入标签名');
    console.log(name);
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (this.dataSource) { // 这里 else 和 if 中间什么也没有 可以合并成 else if
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
  background: white;

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
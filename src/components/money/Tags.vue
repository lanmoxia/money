<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
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
      //$h: 24px;
      height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
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
<template>
  <div>
    {{ xxx }}
    <ul class="types">
      <li :class="type === '-' && 'selected'"
          @click="selectType('-')">支出
      </li>
      <li :class="type === '+' && 'selected'"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';


@Component
export default class Types extends Vue {
  // 这里前边没写 @Prop 就是 data
  type = '-';
  // 1. 编译后报错：
  // Vue 看到括号内的大写 Number 会指定传参的类型
  // Money.vue 组件中的 <Types xxx="Hi"/> 传的是字符串 控制台会看到报错
  // 正确写法是 <Types :xxx="666"> 前边使用冒号表示后边是JS代码 后边的双引号只是 HTML 的符号
  // 2. 编译时报错
  // 后边的 number 是编译时会提示报错 在终端可以看到报错
  // 这里的 xxx 前边有 @Prop 不是data
  @Prop(Number) xxx: number | undefined;

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.type = type;
  }

  mounted() {
    // 编译后的代码示例
    console.log(this.xxx);
    // 编译时的代码示例
    //console.log(this.xxx.yyy) 2个提示 xxx 是 undefined 不能在 undefined 后边 yyy
    // 解决提示
    if (this.xxx === undefined) {
      // 解决提示1;
      console.log('undefined');
    } else {
      //第二个提示不能在 number 后边 yyy
      //console.log(this.xxx.yyy);
      //解决提示2
      console.log(this.xxx.toString());
    }
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #c6c6ca;
  display: flex;
  text-align: center;
  color: #1e1b1c;
  font-size: 24px;

  > li {
    width: 50%;
    //這裡如果使用 line-height 垂直居中會因為 border 有問
    //使用 flex 居中比較好
    justify-content: center;
    align-items: center;
    position: relative;
    // 這裡的 & 表示同級當前的 li 不是子代
    &.selected::after {
      // 这里使用伪元素+绝对定位添加选中态 使用 border 会影响高度
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #848283;
    }
  }
}
</style>
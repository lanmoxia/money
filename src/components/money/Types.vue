<template>
  <div>
    <ul class="types">
      <li :class="value === '-' && 'selected'"
          @click="selectType('-')">支出
      </li>
      <li :class="value === '+' && 'selected'"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';


@Component
export default class Types extends Vue {
  //外部传入 就不需要 type 了
  // type = '-';
  @Prop() readonly value!: string; // 初始值 type, ！为了忽略提示初始值复值问题

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type);
    // this.type = type;

    // 只要进入到 selectType 函数，不管 +/- 都会触发事件
    // 这样比较浪费事件，使用 watch 监听只有变化的情况下才会触发事件
    //this.$emit('update:value', this.type);
    // console.log(type);
  }

// 这里也不需要 watch 了
// 使用 Watch 监听，只有 value 变化才会更新 比较适合
//   @Watch('type')
//   onTypeChange(value: string) {
//     this.$emit('update:value', value);
//   }
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
    padding: 10px 0;
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
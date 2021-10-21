<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button>删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button>清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  output: string = '';
  // 上边 button 点击以后执行函数 inputContent()
  // Vue 会自动把参数传给这个函数 inputContent(event){}
  // 参数包括事件所有信息包装成一个对象 event
  // 我们知道 event 是一个对象 是一个什么类型的对象？属什么类？
  // 当我们点击这个 button 触发点击事件 实际没有点击事件 只有鼠标、键盘、UL、用户事件等
  // MouseEvent 是 DOM 内置的一个类
  inputContent(event: MouseEvent) {// 这里加 MouseEvent 就是指定是鼠标事件 不加会报错
    // if (event.target) {
    //   console.log((event.target as HTMLButtonElement).textContent);
    // }
    //简化成下边两句代码
    // const button = (event.target as HTMLButtonElement);
    // console.log(button.textContent);

    // target 有可能是空需要做下判断；
    // textContent 有可能没有内容 需要强制指定类型 括号括起来
    // as HTMLButtonElement 强制指定类型 是一个 button
    // 按钮是一定是有内容的 是有 textContent
    // 造成这样的原因是 TS 和 Vue 结合不够好
    const button = (event.target as HTMLButtonElement);
    console.log(button.textContent);
    this.output += button.textContent;
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/help.scss";
.numberPad{
  .output {
    @extend %clearfix;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    //box-shadow: inset 0 -5px 5px -5px fade_out(black, 0.6),
    //inset 0 5px 5px -5px fade_out(black, 0.6);
    @extend %innerShadow;
    height: 72px;
  }
  .buttons{
  @extend %clearfix;
    > button{
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok{
        height: 64*2px;
        float: right;
      }
      &.zero{
        width: 25*2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1){
        background: $bg;
      }
      &:nth-child(2),&:nth-child(5){
        background: darken($bg, 4%);
      }
      &:nth-child(3),&:nth-child(6),&:nth-child(9){
        background: darken($bg, 4*2%);
      }
      &:nth-child(4),&:nth-child(7),&:nth-child(10){
        background: darken($bg, 4*3%);
      }
      &:nth-child(8),&:nth-child(11),&:nth-child(13){
        background: darken($bg, 4*4%);
      }
      &:nth-child(14){
        background: darken($bg, 4*5%);
      }
      &:nth-child(12){
        background: darken($bg, 4*6%);
      }
    }
  }
}
</style>
<template>
  <div>
    {{ value }}
    <label class="notes">
      <span class="name">备注</span>
      <!--      这一版：不用在 TS 定义的 Vue 组件内写 onInput 函数 -->
      <!--      <input type="text" :value="value"-->
      <!--             @input="value = $event.target.value"-->
      <!--             placeholder="请填写备注信息">-->

      <!--      这二版：这里需要在 TS 定义的 Vue 组件内写 onInput 函数 -->
      <!--      <input type="text" :value="value"-->
      <!--             @input="onInput"-->
      <!--             placeholder="请填写备注信息">-->

      <!--      第三版：使用 v-model: "value"，不需要 onInput 函数，也不需要 @input="value = $event.target.value"-->
      <input type="text"
             v-model="value"
             placeholder="请填写备注信息">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';

  // 因为上边 v-model:'value' 绑定了 value，这里可以使用 @Watch 监听 value 的变化更新 value
  @Watch('value')
  onNoteChange(value: string) {
    this.$emit('update:value', value);
  }

// 配合 template 中 input 的第二版
//   onInput(event: KeyboardEvent) {
//     const input = event.target as HTMLInputElement;
//     this.value = input.value;
//   }

};
</script>

<style lang="scss" scoped>
.notes{
  background: #f2f3f5;
  font-size: 14px;
  padding-left:16px;
  display: flex;
  align-items: center;
  .name{
    padding-right: 16px;
    color: #1e1b1c;
  }
  input{
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>
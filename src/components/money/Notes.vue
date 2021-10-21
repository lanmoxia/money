<template>
  <div>
    {{ value }}
    <label class="notes">
      <span class="name">备注</span>
      <!--      <input type="text"-->
      <!--             :value="value"-->
      <!--             @input="value = $event.target.value"-->
      <!--             可以简称成 v-model-->
      <!--             v-model="value"-->
      <!--             placeholder="请填写备注信息">-->
      <input type="text"
             v-model="value"
             placeholder="请填写备注信息">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';

  onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

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
<template>
  <div>
    <label class="fromItem">
      <span class="name">{{ fieldName }}</span>
      <input type="text"
             v-model="value"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FromItem extends Vue {
  value = '';

  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;// 问号是有可能不存在

  @Watch('value')
  onNoteChange(value: string) {
    this.$emit('update:value', value);
  }
};
</script>

<style lang="scss" scoped>
.fromItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
    color: #1e1b1c;
  }

  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>
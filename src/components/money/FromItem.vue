<template>
  <div>
    <label class="fromItem">
      <span class="name">{{ fieldName }}</span>
      <!--      由于下边的 value 改成了 @Prop 是不能赋值的 -->
      <!--      这里的 v-model: :value="value" @change="value = $event.target.value" 相当于赋值了-->
      <!--      <input type="text"-->
      <!--             v-model="value"-->
      <!--             :placeholder="this.placeholder">-->

      <!--      改成下边这样就不是赋值了 通知外部要变更 value-->
      <!--      onNoteChange函数通过回传到这个组件-->
      <!--      @input 事件触发得到函数回传更新的 value-->
      <input type="text"
             :value="value"
             @input="onNoteChange($event.target.value)"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FromItem extends Vue {
  @Prop({default: ''}) readonly value!: string; //这里把 value 变成 @Prop 外部传入

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
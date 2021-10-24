<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';
import model from '@/model';

const recordList = model.fetch(); // 这里知道 fetch 的返回值类型了 前边的 recordList 就不需要明确类型了

@Component({components: {Tags, Notes, Types, NumberPad}})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];

  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const record2: RecordItem = model.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordListChange() {
    model.save(this.recordList);
  }
};
</script>
<style lang="scss">
  .layout-wrapper{
    //border: 10px solid red;
  }
  .layout-content{
    //border: 8px solid blue;
    display: flex;
    flex-direction: column-reverse;
  }
</style>

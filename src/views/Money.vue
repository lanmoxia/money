<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="remark-wrapper">
      <FromItem field-name="备注" placeholder="请输入备注信息" @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/money/Tags.vue';
import FromItem from '@/components/money/FromItem.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModels';

const recordList = recordListModel.fetch(); // 这里知道 fetch 的返回值类型了 前边的 recordList 就不需要明确类型了
const tagList = tagListModel.fetch();

@Component({components: {Tags, FromItem, Types, NumberPad}})
export default class Money extends Vue {
  tags = tagList;

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
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordListChange() { //这个函数名随便取
    recordListModel.save(this.recordList);
  }
};
</script>
<style lang="scss">
.layout-wrapper {
  //border: 10px solid red;
  background: #f2f2f2;
}

.layout-content {
  //border: 8px solid blue;
  display: flex;
  flex-direction: column-reverse;
}

.remark-wrapper {
  padding: 12px 0;
}
</style>

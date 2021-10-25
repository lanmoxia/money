<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag"><span>{{ tag }}</span>
        <Icon name="right"/>
      </li>
    </ol>
    <div class="createTags-wrapper">
      <button class="createTags" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModels';

tagListModel.fetch(); // 这句必须放到 tags 之前才可以
@Component
export default class labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 1) {
        window.alert('标签名重复了');
      }
    }
  }


};
</script>


<style lang="scss" scoped>
.tags {
  font-size: 16px;
  padding-left: 16px;

  > li {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      color: #666;
      margin-right: 16px;
    }
  }
}

.createTags {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
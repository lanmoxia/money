<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTags-wrapper">
      <!--      這裡的點擊事件只是大 Button 的 Button 組件中小 button 點擊沒用 小 button 也要監聽 click 事件-->
      <!--      Vue 提供了一個 .native:意思是這個大 Button 對應的小 button 有點擊事件-->
      <!--      Button 这个组件对应的元素有 click 事件-->
      <Button class="createTags" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModels';
import Button from '@/components/Button.vue';

@Component({
  components: {Button}
})
export default class labels extends Vue {
  tags = window.tagList; // 这里也是同样到 window 获取

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      window.createTag(name); // 直接使用绑定在window上的属性
    }
  }
}

</script>


<style lang="scss" scoped>
.tags {
  font-size: 16px;
  padding-left: 16px;
  background: white;

  > .tag {
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
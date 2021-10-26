<template>
  <!--  使用 layout 标签自动就引入 nav 导航-->
  <layout>
    <div class="navBar">
      <Icon class="backIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="placeholder"></span>
    </div>
    <div class="from-wrapper">
      <FromItem field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModels';
import FromItem from '@/components/money/FromItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FromItem}
})
export default class EditLabel extends Vue {
  // 使用钩子函数方便使用 this
  created() {
    // 这里的 this.$route 是我们引入 Vue 的时候自带的 里边有 $route 和 $router 两个都声明了类型 这里不会报错
    // 获取 id
    const id = this.$route.params.id; // route 是获取路由信息的
    // 获取标签
    tagListModel.fetch();
    const tags = tagListModel.data;
    // 遍历 tags 第0项是filter返回的是一个数组 要获取单个标签
    const tag = tags.filter(t => t.id === id)[0];
    //如果编辑的标签存在
    if (tag) {
      console.log(tag);
    } else {
      // 这里使用 replace 代替 push 是为了防止用户进入错误页面退不回去
      this.$router.replace('/404'); // router 是路由器
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
    //border: 1px solid red;
  }

  > .backIcon {
    //border: 1px solid red;
    width: 24px;
    height: 24px;
  }


  > .placeholder {
    //border: 1px solid red;
    width: 24px;
    height: 24px;
  }
}

.from-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>
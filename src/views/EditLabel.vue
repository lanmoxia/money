<template>
  <!--  使用 layout 标签自动就引入 nav 导航-->
  <layout>
    <div class="navBar">
      <Icon class="backIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="placeholder"></span>
    </div>
    <div class="from-wrapper">
      <!--      如果用户想修改 监听 @update:value="updateTag" 事件更新 tag-->
      <!--      updateTag 变成什么呢 Vue 会帮你传 $event 这里不用传参-->
      <FromItem :value="tag.name"
                @update:value="update"
                field-name="标签名"
                placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
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
  // template 里边要绑定 tag.name 这里初始化 tag 默认为空需要加?
  // tag 赋值为 undefined 类型是 字符串
  // 下边就是 created 先获取URL里的id
  // 然后通过tags找到tag 复制到这里的tag
  tag?: { id: string, name: string } = undefined;

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
      this.tag = tag; // 把找到的 tag 放到上边定义的 tag
    } else {
      // 这里使用 replace 代替 push 是为了防止用户进入错误页面退不回去
      this.$router.replace('/404'); // router 是路由器
    }
  }

  // 编辑标签的更新功能
// updateTag 方法执行 id 就是当前 tag 的 id name 变成这个 name
  update(name: string) {
    // tag 有可能为空 需要判断下
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
  }

  // 删除功能
  // 同样需要 tagListModel 提供 remove 接口
  // 直接通过 id 删除
  remove() {
    if (this.tag) {
      tagListModel.remove(this.tag.id);
    }
  }

// 返回标签
  goBack() {
    // 使用 Vue.router 实现返回 复制另一个窗口返回会回到谷歌首页 有 BUG
    this.$router.back();
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
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModels';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

// 这里定义全局的 tagList 供 Money 和 EditLabel 两个页面使用
window.tagList = tagListModel.fetch();
// 创建 tag
window.createTag = (name: string) => {
  const message = tagListModel.create(name);
  if (message === 'duplicated') {
    window.alert('标签名重复了');
  } else if (message === 'success') {
    window.alert('添加成功');
  }
};


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

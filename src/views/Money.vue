<template>
  <Layout class-prefix="layout" >
    <NumberPad/>
    <Types/>
    <Notes/>
    <Tags :data-source.sync="tags"/>
  </Layout>
</template>

<script> // 这里暂时使用 JS 定义组件
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';

export default {
  name: 'Money',
  components: {Tags, Notes, Types, NumberPad},
  data() {
    return {
      tags: ['衣', '食', '住', '行']
    };
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

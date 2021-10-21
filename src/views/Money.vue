<template>
  <Layout class-prefix="layout" >
    <NumberPad/>
    <Types :xxx="333"/>
    <Notes/>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
export default {
  name: 'Money',
  components: {NumberPad, Notes, Types, Nots: Notes, Tags},
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

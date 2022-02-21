<template>
  <nav class="nav-list">
    <header-item query-param="hot" active-color="#007fff" color="#909090">
      <template #title> 最热 </template>
    </header-item>
    <header-item query-param="new" active-color="#007fff" color="#909090">
      <template #title> 最新 </template>
    </header-item>
  </nav>
</template>

<script>
import HeaderItem from './HeaderItem.vue';
export default {
  name: 'ListHeader',
  components: { HeaderItem }
};
</script>

<style scoped>
.nav-list {
  padding: 1.3rem 1rem;
  border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
  display: flex;
  background-color: #fff;
}
</style>

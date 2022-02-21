<template>
  <div id="home" class="container">
    <transition name="fade">
      <header-bar :flag="isHeaderFixed" />
    </transition>
    <main class="container main-container">
      <router-view
        :key="$route.fullPath"
        @tab-fixed="changeHeaderBar"
      ></router-view>
    </main>
  </div>
</template>

<script>
import HeaderBar from '../../components/headerbar/HeaderBar.vue';
import Scroll from '../../components/scroll/Scroll.vue';
import { onActivated, onDeactivated, ref } from 'vue';
export default {
  name: 'Home',
  components: { Scroll, HeaderBar },
  setup() {
    let isHeaderFixed = ref(false);
    let scroll = ref(null);
    let saveY = 0;
    onActivated(() => {
      scroll.value.scrollTo(0, saveY, 0);
      scroll.value.refresh();
    });
    onDeactivated(() => {
      saveY = scroll.value.getScrollY();
    });
    function changeHeaderBar(val) {
      isHeaderFixed.value = val;
    }

    return {
      scroll,
      isHeaderFixed,
      changeHeaderBar
    };
  }
};
</script>
<style scoped>
.fade-leave-active {
}

.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  display: block;
}
</style>

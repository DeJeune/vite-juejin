<template>
  <div class="tab-bar" :style="{ backgroundColor: backgroundColor }">
    <div
      class="tab-bar-item"
      v-for="item in navList"
      :key="item.path.path || item.path"
    >
      <router-link :to="item.path"
        ><span class="text" :style="{ color: getTitleColor(item.path) }">{{
          item.title
        }}</span></router-link
      >
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  name: 'TabBar',
  props: {
    navList: {
      type: Array,
      default: []
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: ''
    },
    activeTitleColor: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    let { titleColor, activeTitleColor } = toRefs(props);
    function getTitleColor(path) {
      return route.path.indexOf(path) !== -1
        ? activeTitleColor.value
        : titleColor.value;
    }

    return {
      getTitleColor
    };
  }
};
</script>

<style scoped>
.tab-bar {
  left: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.833rem;
  z-index: 100;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  transform: translateZ(0);
}
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 1.16rem;
  color: #71777c;
}
</style>

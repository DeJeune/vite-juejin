<template>
  <div
    class="nav-item"
    @click="itemClick"
    :style="{ color: getTitleColor(queryParam) }"
  >
    <slot name="title"></slot>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, toRefs } from 'vue';

export default {
  name: 'HeaderItem',
  props: {
    activeColor: {
      type: String,
      default: ''
    },
    color: {
      type: String
    },
    queryParam: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const { queryParam, activeColor, color } = toRefs(props);
    function itemClick() {
      router.push({
        path: route.path,
        query: {
          sort: queryParam.value
        }
      });
    }
    function getTitleColor(value) {
      if (value === 'hot' && Object.keys(route.query).length === 0) {
        return activeColor.value;
      }
      return route.query['sort'] === value ? activeColor.value : color.value;
    }
    return {
      itemClick,
      getTitleColor
    };
  }
};
</script>

<style scoped>
.nav-item {
  font-size: 1.17rem;
  padding: 0 1.2rem;
  border-right: 1px solid hsla(0, 0%, 59.2%, 0.2);
}
</style>

<template>
  <div v-for="item in tagList">
    <router-link
      :to="`${item.name}${
        item.category_name === '全部' ? '' : '/' + item.category_name
      }`"
      @click="click(item.category_id)"
    >
      <div
        class="tag-item"
        :style="{
          color: getTitleColor(item.category_name),
          backgroundColor: getBackgroundColor(item.category_name)
        }"
      >
        {{ item.category_name }}
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'Tag',
  props: {
    tagList: {
      type: Array,
      default: []
    },
    color: {
      type: String
    },
    activeColor: {
      type: String
    }
  },
  emits: ['refresh'],
  setup(props, context) {
    const route = useRoute();
    const { color, activeColor } = toRefs(props);
    function getTitleColor(name) {
      if (name === '全部') {
        // 如果处于激活状态：route.meta === {}:字色为白字:color
        return !route.meta.hasOwnProperty('categoryId')
          ? color.value
          : activeColor.value;
      }
      return route.path.indexOf(name) !== -1 ? color.value : activeColor.value;
    }
    function getBackgroundColor(name) {
      if (name === '全部') {
        return !route.meta.hasOwnProperty('categoryId')
          ? activeColor.value
          : color.value;
      }
      return route.path.indexOf(name) !== -1 ? activeColor.value : color.value;
    }
    function click(value) {
      context.emit('refresh', value);
    }
    return {
      getTitleColor,
      getBackgroundColor,
      click
    };
  }
};
</script>

<style scoped>
.tag-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  background-color: #fff;
  border-radius: 1rem;
  font-size: 1.1rem;
  color: #8a9aa9;
  padding: 0 0.83rem;
  margin-right: 0.83rem;
  margin-bottom: 0.75rem;
}
</style>

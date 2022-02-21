<template>
  <svg :class="svgClass" v-bind="$attrs">
    <use :xlink:href="iconName" :fill="color" :stroke="color" />
  </svg>
</template>
<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  }
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`;
  }
  return 'svg-icon';
});
</script>

<style scoped></style>

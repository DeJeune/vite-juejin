<template>
  <div ref="wrap">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import PullUp from '@better-scroll/pull-up';
import ScrollBar from '@better-scroll/scroll-bar';
import {
  nextTick,
  onDeactivated,
  onMounted,
  onUpdated,
  ref,
  toRefs
} from 'vue';
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  emits: ['scroll', 'pullingUp'],
  setup(props, context) {
    BScroll.use(PullUp);
    BScroll.use(ScrollBar);
    let scroll = null;
    let wrap = ref(null);
    const { probeType, pullUpLoad } = toRefs(props);
    onMounted(() => {
      initScroll();
    });
    onUpdated(() => {
      nextTick(() => {
        refresh();
      });
    });
    onDeactivated(() => {
      scroll.destroy();
    });
    function initScroll() {
      scroll = new BScroll(wrap.value, {
        click: true,
        scrollY: true,
        scrollbar: true,
        useTransition: true,
        disableMouse: false,
        disableTouch: false,
        probeType: probeType.value,
        pullUpLoad: pullUpLoad.value
      });
      scroll.on('scroll', (position) => {
        context.emit('scroll', position);
      });
      // 监听上拉事件
      if (pullUpLoad.value) {
        scroll.on('pullingUp', () => {
          context.emit('pullingUp');
        });
        finishPullUp();
      }
    }
    function scrollTo(x, y, time = 300) {
      scroll && scroll.scrollTo(x, y, time);
    }
    function scrollToElement(el, time = 500, x = true, y) {
      scroll && scroll.scrollToElement(el, time, x, y);
    }
    function finishPullUp() {
      scroll && scroll.finishPullUp();
    }
    function refresh() {
      scroll && scroll.refresh();
    }
    function getScrollY() {
      return scroll ? scroll.y : 0;
    }
    function getDir() {
      return scroll.movingDirectionY;
    }
    return {
      scrollTo,
      finishPullUp,
      refresh,
      getScrollY,
      getDir,
      scrollToElement,
      wrap
    };
  }
};
</script>

<style scoped></style>

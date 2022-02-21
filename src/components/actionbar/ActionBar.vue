<template>
  <div class="action-bar">
    <div class="praise-action action">
      <div class="action-box">
        <img :src="praiseUrl" alt="点赞" />
        <span class="action-title">{{ articleInfo.praiseCount }}</span>
      </div>
    </div>
    <div @click="itemClick" class="comment-action action">
      <div class="action-box">
        <img :src="commentUrl" alt="评论" />
        <span class="action-title">{{ articleInfo.commentCount }}</span>
      </div>
    </div>
    <div class="collect-action action">
      <div class="action-box">
        <img :src="collectionUrl" alt="收藏" />
        <span class="action-title">{{ articleInfo.collectCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ActionBar',
  props: {
    articleInfo: {
      type: Object
    }
  },
  emits: ['itemClick'],
  setup(props, context) {
    const store = useStore();
    const praiseUrl = computed(() => store.state.praiseUrl);
    const commentUrl = computed(() => store.state.commentUrl);
    const collectionUrl = computed(() => store.state.collectionUrl);
    const url = reactive({
      praiseUrl,
      commentUrl,
      collectionUrl
    });
    function itemClick() {
      context.emit('itemClick');
    }
    return {
      ...toRefs(url),
      itemClick
    };
  }
};
</script>

<style scoped>
.action-bar {
  display: flex;
  z-index: 1;
  width: 100%;
  height: 3.92rem;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  background: #fff;
  position: fixed;
  bottom: 0;
}
.action {
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  cursor: pointer;
}
.action-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.action-title {
  margin-left: 0.3em;
  font-size: 13px;
  font-weight: 500;
  color: #8a93a0;
}
</style>

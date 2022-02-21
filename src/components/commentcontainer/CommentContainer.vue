<template>
  <div class="comment-form">
    <div class="header">
      <span class="header-title">评论</span>
    </div>
    <div class="content">
      <div class="input-form">
        <div
          contenteditable="true"
          spellcheck="false"
          placeholder="输入评论（Enter换行，Ctrl + Enter发送）"
          class="rich-input empty"
        ></div>
      </div>
    </div>
  </div>
  <div class="comment-list-wrapper">
    <div class="title">全部评论 {{ commentsInfo.total }}</div>
    <div class="comment-list">
      <div v-for="comment in commentsInfo.comments">
        <comment-item :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from '../commentItem/CommentItem.vue';

export default {
  name: 'CommentContainer',
  components: { CommentItem },
  props: {
    commentsInfo: Object
  }
};
</script>

<style scoped>
.comment-form {
  display: flex;
  padding-top: 2rem;
  flex-direction: column;
  border-radius: 2px;
}
.header {
  margin-bottom: 2rem;
}
.header-title {
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
  color: #252933;
}
.content {
  display: flex;
  align-items: flex-start;
}
.input-form {
  flex: 1 1 auto;
  font-size: 0;
  transition: all 0.3s;
  background: #f2f3f5;
  border: 1px solid #f2f3f5;
  border-radius: 4px;
}
.rich-input {
  padding: 8px 12px;
  color: #252933;
  outline: none;
  min-height: 64px;
  box-sizing: border-box;
  line-height: 22px;
  font-size: 14px;
  resize: both;
}
.rich-input:empty::before {
  content: attr(placeholder);
}
.comment-list-wrapper {
  padding: 40px 0 16px;
}
.title {
  display: flex;
  align-items: center;
  position: relative;
  line-height: 30px;
  font-weight: 600;
  font-size: 18px;
  color: #252933;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 8px;
}
</style>

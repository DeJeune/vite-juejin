<template>
  <div class="comment">
    <div class="comment-avatar">
      <img
        class="avatar"
        :src="defaultAvatar"
        v-img="comment.user_info.avatar_large"
        alt="评论头像"
      />
    </div>
    <div class="content-box">
      <div class="comment-main">
        <div class="user-box">
          <div class="username">
            <span class="name">{{
              comment.user_info.user_name || '用户19641894498'
            }}</span>
          </div>
          <span class="position">{{
            comment.user_info.job_title || '暂无'
          }}</span>
          <time class="time" datetime="1636968133000">3月前</time>
        </div>
        <div class="content">{{ content }}</div>
        <div class="action-box">
          <div class="item">
            <svg-icon name="dig" color="#8a919f" />
            {{ digg_count === 0 ? '点赞' : digg_count }}
          </div>
          <div class="item">
            <svg-icon name="comment" color="#8a919f" />
            {{ reply_count === 0 ? '回复' : reply_count }}
          </div>
        </div>
      </div>
      <div
        v-show="comment.reply_infos.length !== 0"
        class="sub-comment-list"
        v-for="item in comment.reply_infos"
      >
        <comment-item
          :is-reply="true"
          :comment="item"
          class="sub-comment-item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../../components/svgIcon/SvgIcon.vue';
import { useStore } from 'vuex';
import { computed, reactive, toRefs } from 'vue';
export default {
  name: 'CommentItem',
  components: { SvgIcon },
  props: {
    comment: Object,
    isReply: Boolean
  },
  directives: {
    img: {
      mounted: async (el, binding) => {
        let imageIsExist = function (url) {
          return new Promise((resolve) => {
            let img = new Image();
            img.onload = function () {
              if (this.complete === true) {
                resolve(true);
                img = null;
              }
            };
            img.onerror = function () {
              resolve(false);
              img = null;
            };
            img.src = url;
          });
        };
        const imgUrl = binding.value;
        if (imgUrl) {
          const exist = await imageIsExist(imgUrl);
          if (exist) {
            el.setAttribute('src', imgUrl);
          }
        }
      }
    }
  },
  setup(props) {
    const store = useStore();
    const { comment, isReply } = toRefs(props);
    const commentInfo = reactive({
      content: {},
      digg_count: 0,
      reply_count: 0
    });
    const reply = comment.value.reply_info;
    const _comment = comment.value.comment_info;
    commentInfo.content = isReply.value
      ? reply.reply_content
      : _comment.comment_content;
    commentInfo.digg_count = isReply.value
      ? reply.digg_count
      : _comment.digg_count;
    commentInfo.reply_count = isReply.value ? 0 : _comment.reply_count;
    const defaultAvatar = computed(() => store.state.defaultAvatar);
    return {
      defaultAvatar,
      ...toRefs(commentInfo)
    };
  }
};
</script>

<style scoped>
.comment {
  display: flex;
  padding: 16px 0;
}
.comment-avatar {
  height: 33px;
  display: inline;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.content-box {
  flex: 1 1 auto;
  margin-left: 16px;
}
.user-box {
  display: flex;
  align-items: center;
}
.username {
  display: inline;
}
.name {
  font-weight: 500;
  font-size: 15px;
  color: #252933;
  max-width: 90px;
  line-height: 26px;
}
.position {
  font-size: 14px;
  color: #8a919f;
  line-height: 22px;
  margin-left: 13px;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.time {
  margin-left: auto;
  font-size: 14px;
  color: #8a919f;
  line-height: 22px;
}
.content {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  font-weight: 400;
  font-size: 14px;
  line-height: 2rem;
  color: #515767;
  margin-top: 8px;
  -webkit-line-clamp: 6;
}
.action-box {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.icon-comment {
  width: 16px;
  height: 16px;
}
.icon-dig {
  width: 16px;
  height: 16px;
}
.item {
  margin-right: 16px;
  line-height: 22px;
  font-size: 14px;
  cursor: pointer;
  color: #8a919f;
  display: flex;
  align-items: center;
}
.sub-comment-list:first-child {
  margin-top: 16px;
}
.sub-comment-list {
  padding: 16px;
  background: rgba(247, 248, 250, 0.7);
  border-radius: 4px;
}
.sub-comment-item {
  display: flex;
}
</style>

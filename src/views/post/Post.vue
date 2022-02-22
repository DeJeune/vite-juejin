<template>
  <scroll
    ref="scroll"
    class="wrapper"
    :probe-type="3"
    :pull-up-load="true"
    @scroll="contentScroll"
    @pullingUp="loadMore"
  >
    <div class="article-area">
      <article class="article-body">
        <h1 class="article-title">{{ title }}</h1>
        <user-info :user-info="userArticleInfo" />
        <div v-html="content" />
      </article>
    </div>
    <div class="comment-container">
      <comment-container ref="comment" :comments-info="commentsInfo" />
    </div>
  </scroll>
  <action-bar @itemClick="click" :article-info="articleInfo" />
</template>

<script>
import { useRoute } from 'vue-router';
import { getArticleById, getCommentsByArticleId } from '../../api';
import {
  nextTick,
  reactive,
  ref,
  toRefs
} from 'vue';
import UserInfo from '../../components/userinfo/UserInfo.vue';
import ActionBar from '../../components/actionbar/ActionBar.vue';
import Scroll from '../../components/scroll/Scroll.vue';
import CommentContainer from '../../components/commentcontainer/CommentContainer.vue';
export default {
  name: 'Post',
  components: { CommentContainer, Scroll, ActionBar, UserInfo },
  setup(props, context) {
    const route = useRoute();
    let info = reactive({
      content: '',
      title: '',
      userArticleInfo: {
        avatar: '',
        name: '',
        time: '',
        viewCount: 0
      }
    });
    let articleInfo = reactive({
      praiseCount: 0,
      collectCount: 0,
      commentCount: 0
    });
    let commentsInfo = reactive({
      total: 0,
      comments: []
    });
    let content = ref('');

    let scroll = ref(null);
    let comment = ref(null);

    let page = ref(0);

    init();

    function init() {
      const postId = route.params.id;
      getArticleByArticleId(postId);
      _getCommentsByArticleId(postId).then((res) =>
        commentsInfo.comments.push(...res)
      );
      nextTick(() => {
        scroll.value.refresh();
      });
    }
    async function query() {
      const postId = route.params.id;
      const data = await _getCommentsByArticleId(postId);
      commentsInfo.comments.push(...data);
    }
    async function _getCommentsByArticleId(postId) {
      const data = await getCommentsByArticleId(postId, page.value);
      page.value += 10;
      let list = [];
      if (data.has_more) {
        commentsInfo.total = data.total;
        list.push(...data.data.comments);
      }
      return list;
    }
    async function getArticleByArticleId(postId) {
      const data = await getArticleById(postId);
      const article = data.data.article;
      content.value = article.article_content;
      info.content = article.article_content;
      info.title = article.article_info['title'];
      info.userArticleInfo.avatar = article.author_user_info['avatar_large'];
      info.userArticleInfo.name = article.author_user_info['user_name'];
      info.userArticleInfo.time = article.article_info['ctime'];
      info.userArticleInfo.viewCount = article.article_info['view_count'];
      articleInfo.praiseCount = article.article_info['digg_count'];
      articleInfo.commentCount = article.article_info['comment_count'];
      articleInfo.collectCount = article.article_info['collect_count'];
    }
    function contentScroll(position) {
      let isTabFixed = -position.y > 200;
      if (scroll.value.getDir() === -1) {
        isTabFixed = false;
      }
      context.emit('tabFixed', isTabFixed);
    }
    async function loadMore() {
      await query();
      scroll.value.finishPullUp();
      scroll.value.refresh();
    }
    function click() {
      nextTick(() => {
        scroll.value.scrollToElement('.comment-container', 500, undefined, 0);
      });
    }
    return {
      ...toRefs(info),
      articleInfo,
      commentsInfo,
      click,
      contentScroll,
      loadMore,
      scroll,
      comment
    };
  }
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 4.333rem - 3.92rem);
}
.article-area {
  margin-top: 1.74rem;
  background-color: white;
}
.article-body {
  padding: 2.667rem 2rem 3.3rem;
}
.article-title {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1.667rem;
}
.comment-container {
  margin-top: 1.67rem;
  border-radius: 4px;
  padding-right: 2.67rem;
  padding-left: 2.67rem;
  background-color: #ffffff;
}
</style>

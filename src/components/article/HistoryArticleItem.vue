<template>
  <div class="article-wrapper">
    <div class="article">
      <router-link :to="`/post/${article.article_id}`" class="title">
        <h2 class="title-art">
          <div class="title-article" style="float: left">文章</div>
          <span>{{ article.article_info.title }}</span>
        </h2>
      </router-link>
      <div class="bottom-box">
        <div class="userinfo-abstract">
          <div class="abstract">
            {{ article.article_info.brief_content }}
          </div>
          <div class="user-info">
            <div class="user-name">
              {{ article.author_user_info.user_name }}
            </div>
            <div class="separator"></div>
            <div class="active-info">
              <div class="read">{{ str }}阅读</div>
              <div class="dot">·</div>
              <div class="comment">
                {{ article.article_info.comment_count }}评论
              </div>
            </div>
          </div>
        </div>
        <div v-show="article.article_info.cover_image !== ''" class="img-wrap">
          <img class="cover" :src="article.article_info.cover_image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue';

export default {
  name: 'HistoryArticleItem',
  props: {
    article: Object
  },
  setup(props) {
    const { article } = toRefs(props);
    const str = computed(() => {
      let cnt = article.value.article_info.view_count;
      switch (cacDigit(cnt)) {
        case 0:
        case 1:
        case 2:
        case 3:
          return String(cnt);
        case 4:
          return Math.floor(cnt / 10 ** 3) + 'k+';
        case 5:
          return Math.floor(cnt / 10 ** 4) + 'w+';
      }

      function cacDigit(num) {
        let ans = 0;
        while (num !== 0) {
          num = Math.floor(num / 10);
          ans++;
        }
        return ans;
      }
    });
    return {
      str
    };
  }
};
</script>

<style scoped>
h2 {
  margin: 0;
}
.article {
  border-top: 1px solid #e4e6eb;
  padding: 2.133vw 0;
}
.title {
  color: #252933;
}
.title-art {
  font-size: 4.267vw;
  font-weight: 600;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.title-article {
  background-color: #eaf2ff;
  color: #1e80ff;
  margin-right: 2.133vw;
  min-width: 10.667vw;
  height: 5.867vw;
  border-radius: 1.067vw;
  font-size: 3.2vw;
  text-align: center;
  line-height: 5.867vw;
}
.bottom-box {
  display: flex;
}
.abstract {
  margin-top: 1.6vw;
  line-height: 5.867vw;
  font-size: 3.467vw;
  color: #9398a3;
  font-style: normal;
  font-weight: 400;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.user-info {
  display: flex;
  margin-top: 3.2vw;
}
.user-name {
  margin-right: 2.133vw;
  max-width: 13.867vw;
  height: 5.33vw;
  font-style: normal;
  font-weight: 400;
  font-size: 3.467vw;
  line-height: 5.33vw;
  color: #515767;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.separator {
  width: 0;
  height: 3.2vw;
  border: 0.5px solid #e4e6eb;
  margin-right: 2.133vw;
  margin-top: 0.8vw;
}
.active-info {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 3.467vw;
  line-height: 5.33vw;
  height: 5.33vw;
  color: #819a9f;
}
.active-info div {
  padding: 0 2.5px;
}
.dot {
  color: #819a9f;
}
.img-wrap {
  width: 24.53vw;
  min-width: 24.53vw;
  min-height: 18.67vw;
  max-height: 18.67vw;
  margin-left: 2.133vw;
  margin-top: 1.6vw;
}
.cover {
  width: 100%;
  height: 100%;
}
</style>

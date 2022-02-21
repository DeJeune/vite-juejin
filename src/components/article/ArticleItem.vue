<template>
  <div class="article-item">
    <div class="meta-container">
      <div class="user-message">{{ article.author_user_info.user_name }}</div>
      <div class="dividing"></div>
      <div class="date">{{ date }}前</div>
    </div>
    <div class="tag-list">
      <div class="tag">前端</div>
      <div class="tag">年终总结</div>
    </div>
    <div class="title-row">
      <span>{{ article.article_info.title }}</span>
    </div>
    <div class="main-row">
      <div class="main-box">
        <div class="abstract">
          {{ article.article_info.brief_content }}
        </div>
        <div class="action-list">
          <div class="action-list-item">
            <i class="icon-like" />
            <span class="count"> 86 </span>
          </div>
          <div class="action-list-item">
            <i class="icon-comment" />
            <span class="count">{{ article.article_info.comment_count }}</span>
          </div>
        </div>
      </div>
      <img
        v-if="article.article_info.cover_image !== ''"
        class="pic"
        :src="article.article_info.cover_image"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, toRefs } from 'vue';

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    let { article } = toRefs(props);
    let date = ref('');
    onMounted(() => {
      let time = article.value.article_info.ctime * 1000;
      let str = new Date(time).toLocaleDateString();
      let curStr = new Date().toLocaleDateString();
      let arr = str.split('/');
      arr = arr.map((item) => Number(item));
      let curArr = curStr.split('/');
      curArr = curArr.map((item) => Number(item));
      date.value =
        curArr[0] - arr[0] !== 0
          ? `${curArr[0] - arr[0]}年`
          : curArr[1] - curArr[1] !== 0
          ? `${curArr[1] - arr[1]}月`
          : curArr[2] - arr[2] !== 0
          ? `${curArr[2] - arr[2]}天`
          : '刚刚';
    });
    return {
      date
    };
  }
};
</script>

<style scoped>
.article-item {
  position: relative;
  background-color: #fff;
  padding: 16px 16px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.meta-container {
  display: flex;
  align-items: center;
}
.user-message {
  max-width: 162px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  font-size: 14px;
  line-height: 22px;
  color: #4e5969;
}
.dividing {
  width: 1px;
  height: 14px;
  background: #e5e6eb;
  margin: 0 8px;
}
.date {
  line-height: 14px;
  font-size: 14px;
  color: #86909c;
}
.tag-list {
  display: flex;
  height: 22px;
  overflow: hidden;
  position: absolute;
  top: auto;
  right: 20px;
  bottom: 16px;
}
.tag {
  height: 24px;
  flex-shrink: 0;
  margin-left: 8px;
  padding: 0 8px;
  background: #fafafa;
  border-radius: 2px;
  font-size: 14px;
  line-height: 22px;
  color: #4e5969;
  display: none;
}
.title-row {
  margin: 8px 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #1d2129;
  word-break: break-all;
}
.main-row {
  width: 100%;
  padding-bottom: 16px;
  display: flex;
  border-bottom: 1px solid #e5e6eb;
}
.main-box {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.abstract {
  margin-bottom: 14px;
  font-size: 14px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #4e5969;
}
.pic {
  margin-left: 8px;
  width: 120px;
  height: 88px;
}
.action-list {
  display: flex;
  align-items: center;
}
.action-list-item {
  margin-right: 26px;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  color: #86909c;
  display: flex;
  align-items: center;
}
.icon-like {
  background-image: url('../../assets/good.png');
}
.icon-comment {
  background-image: url('../../assets/comments.png');
}
.count {
  margin-left: 4px;
}
i {
  display: block;
  width: 16px;
  height: 16px;
  background-size: 100%;
}
</style>

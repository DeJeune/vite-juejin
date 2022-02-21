<template>
  <scroll ref="scroll" class="wrapper" :probe-type="2" @scroll="contentScroll">
    <div class="foot-mark-list">
      <div class="search-input">
        <div class="title">浏览记录</div>
        <search class="search-ipt" title="搜索关键词" />
      </div>
      <div class="description-list">
        <div class="item-list" v-for="item in articleList">
          <div class="time-show">
            <img :src="itemUrl" alt="图片" class="date-img" />
            <span class="date">{{ item['time'] }}</span>
          </div>
          <div v-for="article in item['articles']">
            <history-article-item :article="article" />
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import { useStore } from 'vuex';
import Search from '../../components/search/Search.vue';
import HistoryArticleItem from '../../components/article/HistoryArticleItem.vue';
import { getArticles } from '../../api';
import { onMounted, reactive, ref, toRefs } from "vue";
import Scroll from "../../components/scroll/Scroll.vue";
export default {
  name: 'History',
  components: { Scroll, HistoryArticleItem, Search },
  emits: ['tabFixed'],
  setup(props, context) {
    const store = useStore();
    const commonTools = store.getters.commonTools;
    const itemUrl = store.state.item;
    let articles = reactive({
      articleList: [],
      itemUrl
    });
    let scroll = ref(null)
    onMounted(async () => {
      const data = await getAllArticles();
      function classify(arr, key) {
        let kind = [];
        let newArr = [];
        arr.map((item) => {
          // 2022-01-01
          let str = item[key].toString().slice(0, 10);
          if (!kind.includes(str)) {
            kind.push(str);
            newArr.push({
              [key]: str,
              articles: []
            });
          }
          let index = kind.indexOf(str);
          // /post/..../
          let str2 = item['router'].path.slice(6, item.length);
          newArr[index].articles.push(
            data.find((item) => item['article_id'] === str2)
          );
        });
        return newArr;
      }
      articles.articleList.push(...classify(commonTools, 'time'));
    });
    async function getAllArticles() {
      let page = 0;
      let list = [];
      let data = await getArticles(undefined, undefined, page++);
      list.push(...data.data.articles);
      while (data.has_more) {
        data = await getArticles(undefined, undefined, page++);
        list.push(...data.data.articles);
      }
      return list;
    }
    function contentScroll(position) {
      let isTabFixed = -position.y > 300;
      if (scroll.value.getDir() === -1) {
        isTabFixed = false;
      }
      context.emit('tabFixed', isTabFixed);
    }
    return {
      ...toRefs(articles),
      contentScroll,
      scroll
    };
  }
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 4.333rem);
}
.foot-mark-list {
  width: 100%;
  background-color: #fff;
}
.search-input {
  padding: 4.267vw 5.333vw 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-style: normal;
}
.title {
  height: 8vw;
  line-height: 8vw;
  text-align: center;
  color: #252933;
  font-size: 4.8vw;
  font-weight: 600;
}
.search-ipt {
  width: 53.33vw;
  height: 9.6vw;
}
.description-list {
  margin-top: 22px;
  margin-bottom: 40px;
}
.item-list {
  padding: 0 6.4vw;
  margin: 0 0 8.533vw 0.5px;
}
.time-show {
  display: flex;
  align-items: center;
  height: 6.4vw;
}
.date-img {
  height: 2.933vw;
  width: 2.933vw;
  margin-right: 2.267vw;
}
.date {
  height: 6.4vw;
  font-size: 3.733vw;
  font-weight: 500;
  line-height: 6.4vw;
  text-align: center;
}
</style>

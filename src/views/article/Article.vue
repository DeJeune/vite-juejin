<template>
  <div class="timeline-index-view">
    <div class="tab-bar-con" :class="{ top: isTrans }">
      <tab-bar
        :nav-list="routeList"
        title-color="#71777c"
        active-title-color="#007fff"
      />
    </div>
    <scroll
      ref="scroll"
      class="wrapper"
      :probe-type="2"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <div class="article-container">
        <div class="tag-list">
          <tag
            :tag-list="articles.tags"
            color="#ffffff"
            active-color="#007fff"
            @refresh="refresh2"
          />
        </div>
        <list-header />
        <transition-group name="list">
          <div
            class="article-list"
            v-for="article in articles.articleList"
            :key="article.article_id"
          >
            <router-link
              :to="`/post/${article.article_id}`"
              custom
              v-slot="{ href }"
            >
              <a :href="href" target="_blank">
                <article-item :article="article" />
              </a>
            </router-link>
          </div>
        </transition-group>
      </div>
    </scroll>
  </div>
</template>
<script>
import ArticleItem from '../../components/article/ArticleItem.vue';
import ListHeader from '../../components/header/ListHeader.vue';
import TabBar from '../../components/tabbar/TabBar.vue';
import Tag from '../../components/tag/Tag.vue';
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  toRefs
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getArticles, getCategories } from '../../api';
import { useStore } from 'vuex';
import Scroll from '../../components/scroll/Scroll.vue';
export default {
  name: 'Article',
  components: {
    Scroll,
    TabBar,
    ListHeader,
    ArticleItem,
    Tag
  },
  props: {
    categoryId: Number
  },
  emits: ['tabFixed'],
  setup(props, context) {
    const store = useStore();
    const routeList = computed(() => store.state.homeRoutes);
    const route = useRoute();
    const routesIndex = computed(() => store.state.routesIndex);
    let { categoryId } = toRefs(props);
    let articles = reactive({
      articleList: [],
      tagId: 0,
      tags: [],
      refreshing: true
    });

    let scroll = ref(null);

    let page = ref(0);
    let isTrans = ref(false);

    queryTag();
    async function refresh() {
      articles.refreshing = true;
      await query(true);
      articles.refreshing = false;
    }
    async function query(isRefresh) {
      let res = await requestData();
      if (isRefresh) {
        articles.articleList = [];
        page.value = 0;
      }
      articles.articleList.push(...res);
    }
    async function queryTag() {
      let data = await getCategories();
      let requestTag = data.data.categories[categoryId.value].children;
      let name = routesIndex.value[categoryId.value];
      let _tags = [
        {
          name,
          category_id: 0,
          category_name: '全部'
        }
      ];
      for (let tag of requestTag) {
        _tags.push({
          name,
          ...tag
        });
      }
      articles.tags = _tags;
      articles.tagId = !route.meta.hasOwnProperty('categoryId')
        ? _tags[0].category_id
        : route.meta.categoryId;
      await query();
    }
    async function requestData() {
      let tmp = assembleQueryData();
      let list = [];
      let data = await getArticles(
        tmp.categoryId,
        tmp.sort === '' ? tmp.sort : 'hot',
        page.value
      );
      page.value += 10;
      list.push(...data.data.articles);
      return list;
    }
    function assembleQueryData() {
      const data = {
        categoryId: 0,
        sort: ''
      };
      if (articles.tagId !== 0) {
        data.categoryId = articles.tagId;
      } else {
        data.categoryId = categoryId.value;
      }
      if (Object.keys(route.query).length !== 0) {
        data.sort = route.query.sort;
      }
      return data;
    }
    function refresh2(value) {
      nextTick(() => {
        articles.tagId = value;
      });
      refresh();
    }
    function contentScroll(position) {
      let isTabFixed = -position.y > 300;
      if (scroll.value.getDir() === -1) {
        isTabFixed = false;
      }
      isTrans.value = isTabFixed;
      context.emit('tabFixed', isTabFixed);
    }
    async function loadMore() {
      await query(false);
      scroll.value.finishPullUp();
      scroll.value.refresh();
    }
    return {
      articles,
      refresh2,
      routeList,
      contentScroll,
      loadMore,
      scroll,
      isTrans
    };
  }
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 4.333rem - 3.833rem);
}
.article-container {
  margin-top: 0.5rem;
  position: relative;
  color: #71777c;
}
.tag-list {
  padding-left: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
}
.timeline-index-view {
  margin-top: 4.7rem;
}
.tab-bar-con {
  position: fixed;
  top: 4.333rem;
  width: 100%;
  height: 3.833rem;
  z-index: 100;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}
.top {
  transform: translate3d(0, -4.333rem, 0);
}
.article-list {
  transition: all 0.3s ease-in;
}
</style>

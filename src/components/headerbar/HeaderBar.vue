<template>
  <div class="header-box">
    <div class="main-header header" :class="{ visible: !flag }">
      <div class="container">
        <div class="pic">
          <a href="/">
            <img class="logo" :src="$store.state.logo" alt="图标" />
          </a>
        </div>
        <div class="main-nav">
          <div class="nav-list">
            <div class="nav-menu">
              <div class="font">
                <router-link to="/">
                  <span>首页</span>
                </router-link>
              </div>
            </div>
            <div class="right-nav">
              <div class="search-add">
                <div class="search-add-ul">
                  <div class="search-container nav-item">
                    <search title="探索稀土掘金" />
                  </div>
                </div>
              </div>
              <div class="notification nav-item">
                <svg-icon name="notice" color="#8a919f" />
              </div>
              <div class="menu nav-item">
                <img
                  class="user-avatar"
                  @click="click($event)"
                  :src="defaultAvatar"
                  alt="我的头像"
                />
                <drop-down v-show="isClick" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropDown from '../dropdown/DropDown.vue';
import Search from '../search/Search.vue';
import SvgIcon from '../svgIcon/SvgIcon.vue';
import { useStore } from 'vuex';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
export default {
  name: 'HeaderBar',
  components: {
    DropDown,
    Search,
    SvgIcon
  },
  props: {
    flag: {
      type: Boolean
    }
  },
  setup() {
    const { appContext } = getCurrentInstance();
    const store = useStore();
    const defaultAvatar = computed(() => store.state.defaultAvatar);
    let isClick = ref(false);
    function click(e) {
      isClick.value = !isClick.value;
    }
    onMounted(() => {
      appContext.config.globalProperties.$globalClick(moreSetupMenuRemove);
    });
    function moreSetupMenuRemove(e) {
      let flag = e.target.contains(
        document.getElementsByClassName('user-avatar')[0]
      );
      if (!flag) {
        isClick.value = false;
      }
    }
    return {
      defaultAvatar,
      isClick,
      click
    };
  }
};
</script>

<style scoped>
.header-box {
  position: relative;
  height: 4.333rem;
}
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4.333rem;
  transition: all 0.2s;
  transform: translate3d(0, -100%, 0);
}
.visible {
  transform: translateZ(0);
}
.header {
  display: block;

  background: #ffffff;
  border-bottom: 1px solid #f1f1f1;
  z-index: 250;
}
.container {
  margin: 0 0.917rem 0 1.333rem !important;
  display: flex;
  align-items: center;
  height: 100%;
  width: 97%;
}
.pic {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.logo {
  height: 28px;
  width: 31px;
}
.main-nav {
  height: 100%;
  flex: 1 0 auto;
}
.nav-list {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  justify-content: flex-end;
  margin: 0;
}
.nav-menu {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 1;
}
.font {
  height: 4.333rem;
  font-size: 1.33rem;
  padding: 0;
  width: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
span {
  color: #1e80ff;
  margin-right: 0.333rem;
}
.right-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 322px;
  height: 100%;
  margin: 0;
  order: 0;
}
.icon-notice {
  width: 24px;
  height: 24px;
}
.search-add {
  flex: 1 1 auto;
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  width: 200px;
  margin-left: 0;
  margin-right: 0.292rem;
}
.search-add-ul {
  display: flex;
  width: 220px;
  justify-content: flex-start;
}
.nav-item {
  padding: 0 1.667rem 0 0.667rem;
  color: #86909c;
  font-size: 1.33rem;
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.search-container {
  padding-left: 7rem;
}

.notification {
  position: relative;
  background-color: #fff;
}

.menu {
  position: relative;
  padding-left: 0;
  padding-right: 0;
  background-color: #fff;
}

.user-avatar {
  width: 2.667rem;
  height: 2.667rem;
  position: relative;
  margin-right: 1.333rem;
  border-radius: 50%;
}
</style>

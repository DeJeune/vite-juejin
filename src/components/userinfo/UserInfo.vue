<template>
  <div class="user-info">
    <img
      class="avatar"
      :src="defaultAvatar"
      v-img="userInfo.avatar"
      alt="头像"
    />
    <div class="author-info-box">
      <div class="author-name">{{ userInfo.name }}</div>
      <div class="meta-box">
        <time class="time">{{ dateFormat }}</time>
        <span class="views-count"
          >·&nbsp;&nbsp;阅读{{ userInfo.viewCount }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUpdated,
  ref,
  toRefs
} from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'UserInfo',
  props: {
    userInfo: {
      type: Object
    }
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
    const { userInfo } = toRefs(props);
    const store = useStore();
    let dateFormat = ref('');
    const defaultAvatar = computed(() => store.state.defaultAvatar);
    onUpdated(() => {
      function formatDate(date) {
        const YY = date.getFullYear() + '年';
        const MM =
          (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '月';
        const DD =
          (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';
        const hh =
          (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
          ':';
        const mm =
          date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return YY + MM + DD + ' ' + hh + mm;
      }
      const time = userInfo.value['time'];
      const number = Number(time) * 1000;
      const date = new Date(number);
      dateFormat.value = formatDate(date);
    });
    return {
      dateFormat,
      defaultAvatar
    };
  }
};
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1.667rem;
}
.avatar {
  flex: 0 0 auto;
  margin-right: 1rem;
  width: 3.333rem;
  height: 3.333rem;
  border-radius: 50%;
}
.author-info-box {
  min-width: 0;
  flex: 1;
  min-height: 43px;
}
.author-name {
  height: 2rem;
  font-size: 1.33rem;
}
.meta-box {
  font-size: 1rem;
  line-height: 1.417rem;
  color: #8a919f;
  margin-top: 2px;
}
.time {
  letter-spacing: 1px;
}
</style>

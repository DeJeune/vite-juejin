<template>
  <form class="search-form">
    <input
      class="search-input"
      type="search"
      maxlength="32"
      :placeholder="title"
    />
    <img
      class="search-icon"
      src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6401156ae5d55b2253b3d2351231f02c.svg"
      alt="搜索"
    />
  </form>
</template>

<script>
export default {
  name: 'Search',
  props: {
    title: String
  }
};
</script>

<style scoped>
.search-form {
  margin-top: 0;
  background-color: #f2f3f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  position: relative;
  height: 2.667rem;
  width: 11rem;
}
.search-input {
  border: none;
  width: 8.67rem;
  height: 32px;
  padding: 0.6rem 0 0.6rem 1rem;
  box-shadow: none;
  outline: none;
  font-size: 1.1rem;
  color: #666;
  background-color: transparent;
  transition: width 0.3s;
}
.search-icon {
  border-style: none;
  display: block;
  width: 1.33rem;
  padding: 0 0.8333rem 0 0;
  cursor: pointer;
}
</style>

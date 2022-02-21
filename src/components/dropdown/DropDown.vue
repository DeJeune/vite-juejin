<template>
  <div class="drop-down">
    <div class="item-group">
      <div class="drop-down-item">
        <router-link class="tmp" to="/footmark">
          <svg-icon name="record" class="record" />
          <span>浏览记录</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../svgIcon/SvgIcon.vue';
export default {
  name: 'DropDown',
  components: { SvgIcon }
};
</script>

<style scoped>
.drop-down {
  width: fit-content;
  min-width: 12.5rem;
  right: 0;
  left: auto;
  transform: translateX(0);
  z-index: 999;
  position: absolute;
  top: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(177, 180, 185, 0.45);
  border-radius: 4px;
  font-size: 1.2rem;
}
.item-group {
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.drop-down-item {
  font-size: 1.2rem;
  cursor: pointer;
  white-space: nowrap;
}
.tmp {
  height: 34px;
  display: flex;
  align-items: center;
  position: relative;
  color: #4e5969;
}
.icon-record {
  width: 16px;
  height: 16px;
}
.record {
  width: 16px;
  height: 16px;
  margin-left: 12px;
  margin-right: 10px;
}
</style>

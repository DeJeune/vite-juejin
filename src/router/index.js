import { createRouter, createWebHistory } from 'vue-router';

import { homeRoutes } from './home.js';
import store from '../store/index.js';
const routes = [
  {
    path: '/',
    redirect: '/backend'
  },
  ...homeRoutes,
  {
    path: '/post/:id',
    component: () => import('../views/post/Post.vue'),
    meta: {
      memoryRouter: true
    }
  },
  {
    path: '/footmark',
    component: () => import('../views/history/History.vue'),
    meta: {
      memoryRouter: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 记忆最近访问过的常用功能====================
  const commonTools = localStorage.getItem('commonTools')
    ? JSON.parse(localStorage.getItem('commonTools'))
    : [];
  const routerData = {};
  routerData.router = {};
  routerData.router.path = to.path;
  routerData.time = new Date();
  if (to.meta.memoryRouter) {
    if (
      commonTools.find((item) => item.router.path === routerData.router.path)
    ) {
      commonTools.splice(
        commonTools.indexOf(
          commonTools.find(
            (item) => item.router.path === routerData.router.path
          )
        ),
        1
      );
    }
    commonTools.splice(0, 0, routerData);
  }
  store.commit('common_tools', commonTools);
  next();
});

export default router;

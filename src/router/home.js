import { homeRoutes as _routes } from '../common/config.js';
import Article from '../views/article/Article.vue';
const routeMap = {
  '/backend': {
    path: '/backend',
    name: '后端',
    component: Article,
    props: {
      categoryId: 1
    },
    meta: {
      memoryRouter: false
    },
    children: [
      {
        path: 'Java',
        component: Article,
        meta: {
          categoryId: 11,
          memoryRouter: false
        }
      },
      {
        path: 'Python',
        component: Article,
        meta: {
          categoryId: 12,
          memoryRouter: false
        }
      },
      {
        path: 'Go',
        component: Article,
        meta: {
          categoryId: 13,
          memoryRouter: false
        }
      }
    ]
  },
  '/frontend': {
    path: '/frontend',
    name: '前端',
    component: Article,
    props: {
      categoryId: 2
    },
    meta: {
      memoryRouter: false
    },
    children: [
      {
        path: 'Javascript',
        component: Article,
        meta: {
          categoryId: 21,
          memoryRouter: false
        }
      },
      {
        path: 'Vue.js',
        component: Article,
        meta: {
          categoryId: 22,
          memoryRouter: false
        }
      },
      {
        path: 'React.js',
        component: Article,
        meta: {
          categoryId: 13,
          memoryRouter: false
        }
      }
    ]
  },
  '/android': {
    path: '/android',
    name: 'Android',
    component: Article,
    props: {
      categoryId: 3
    },
    meta: {
      memoryRouter: false
    },
    children: [
      {
        path: 'Flutter',
        component: Article,
        meta: {
          categoryId: 31,
          memoryRouter: false
        }
      },
      {
        path: 'Java',
        component: Article,
        meta: {
          categoryId: 32,
          memoryRouter: false
        }
      },
      {
        path: 'Kotlin',
        component: Article,
        meta: {
          categoryId: 33,
          memoryRouter: false
        }
      }
    ]
  },
  '/ios': {
    path: '/ios',
    name: 'IOS',
    component: Article,
    props: {
      categoryId: 4
    },
    meta: {
      memoryRouter: false
    },
    children: [
      {
        path: 'Swift',
        component: Article,
        meta: {
          categoryId: 41,
          memoryRouter: false
        }
      },
      {
        path: 'Objective-C',
        component: Article,
        meta: {
          categoryId: 42,
          memoryRouter: false
        }
      },
      {
        path: 'Flutter',
        component: Article,
        meta: {
          categoryId: 43,
          memoryRouter: false
        }
      }
    ]
  }
};

export let homeRoutes = [];

for (let item of _routes) {
  homeRoutes.push(routeMap[item.path]);
}

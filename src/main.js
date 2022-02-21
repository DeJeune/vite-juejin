import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import './assets/css/normalize.css';

import SvgIcon from './components/svgIcon/SvgIcon.vue';

createApp({}).component('svg-icon', SvgIcon);
const app = createApp(App);
app.config.globalProperties.$globalClick = function (callback) {
  document.getElementById('home').addEventListener('click', function (e) {
    callback(e);
  });
};
app.use(router).use(store).mount('#app');

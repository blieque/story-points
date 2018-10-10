import Vue from 'vue';

import '@/styles/main';
import config from '@/config';
import App from '@/App';

new Vue({
  el: '#app',
  render: h => h(App),
});

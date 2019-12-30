import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Autocomplete from "v-autocomplete";

Vue.config.productionTip = false

export const EventBus = new Vue();

Vue.use(Autocomplete);

window._Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
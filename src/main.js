import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import VueJWT from 'vuejs-jwt'
import Autocomplete from "v-autocomplete";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';

import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;

export const EventBus = new Vue();
Vue.use(VueJWT);
Vue.use(Autocomplete);
Vue.use(VueToast);
Vue.use(Vuelidate)

window._Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
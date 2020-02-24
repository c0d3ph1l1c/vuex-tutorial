import Vue from 'vue';
import App from '../shopping-cart/components/App.vue';
import store from '../shopping-cart/store';
import { currency } from '../shopping-cart/currency';

Vue.filter('currency', currency);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
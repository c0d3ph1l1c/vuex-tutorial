import Vue from 'vue';
import Vuex from 'vuex';
import  { createPlugin, myModule } from '../plugins/myplugin';

Vue.use(Vuex);

const myPlugin = createPlugin({
  namespace: 'foo/bar'
});

const store = new Vuex.Store({
  modules: {
    foo: {
      namespaced: true,
      modules: {
        bar: {
          namespaced: true,
          modules: { myModule }
        }
      }
    }
  },
  plugins: [myPlugin]
});

new Vue({
  el: '#app',
  store
});
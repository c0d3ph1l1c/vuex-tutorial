import Vue from 'vue';
import Vuex, { mapActions } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions: {
    someOtherAction({ dispatch }) {
      dispatch('someAction');
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          // -> 'someAction'
          handler(namespacedContext, payload) {
            alert('This is some action');
          }
        }
      }
    }
  }
});

new Vue({
  el: '#app',
  store,
  methods: mapActions([
    'someAction', 
    'someOtherAction'
  ]),
  template: `
    <div id="app">
      <button @click="someAction">Some Action</button>
      <button @click="someOtherAction">Some Other Action</button>
    </div>
  `
});
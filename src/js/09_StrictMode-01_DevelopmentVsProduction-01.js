import Vue from 'vue';
import Vuex, { mapState, mapActions } from 'vuex';

Vue.use(Vuex);

// In strict mode, whenever Vuex state is mutated outside of mutation handlers, an error will be thrown. This ensures that all state mutations can be explicitly tracked by debugging tools.

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 0
  },
  actions: {
    incrementCount({ state }) {
      state.count++;
    }
  }
});

new Vue({
  store,
  computed: mapState([
    'count'
  ]),
  methods: mapActions([
    'incrementCount'
  ]),
  template: `
    <div id="app">
      <h3>With Errors</h3>
      {{ count }}<br>
      <button @click="incrementCount">+</button>
    </div>
  `
}).$mount('#app');


const store2 = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 0
  },
  mutations: {
    incrementCount(state) {
      state.count++;
    }
  },
  actions: {
    incrementCount({ commit }) {
      commit('incrementCount');
    }
  }
});

new Vue({
  store: store2,
  computed: mapState([
    'count'
  ]),
  methods: mapActions([
    'incrementCount'
  ]),
  template: `
    <div id="app">
      <h3>With No Error</h3>
      {{ count }}<br>
      <button @click="incrementCount">+</button>
    </div>
  `
}).$mount('#app2');

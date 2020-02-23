import Vue from 'vue';
import Vuex, { mapState, mapActions } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({});

store.registerModule('a', {
  state: {
    count: 10
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

// It may be likely that you want to preserve the previous state when registering a new module, such as preserving state from a Server Side Rendered app. You can achieve this with preserveState option: store.registerModule('a', module, { preserveState: true })

// When you set preserveState: true, the module is registered, actions, mutations and getters are added to the store, but the state is not. It's assumed that your store state already contains state for that module and you don't want to overwrite it.

store.registerModule('a', {
  state: {
    count: 100
  },
  mutations: {
    doubleCount(state) {
      state.count *= 2;
    }
  },
  actions: {
    doubleCount({ commit }) {
      commit('doubleCount');
    }
  }
}, { preserveState: true });

const vm = new Vue({
  store,
  computed: mapState({
    count: state => state.a.count
  }),
  methods: {
    ...mapActions([
      'incrementCount',
      'doubleCount'
    ])
  },
  template: `
    <div id="app">
      Count: {{ count }}<br>
      <button @click="incrementCount">Increment Count</button>
      <button @click="doubleCount">Double Count</button>
    </div>
  `
}).$mount('#app');

console.log(vm);
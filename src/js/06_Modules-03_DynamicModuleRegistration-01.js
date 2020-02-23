import Vue from 'vue';
import Vuex, { mapState, mapActions } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({});

// register a module `myModule`
store.registerModule('myModule', {
  namespaced: true,
  state: {
    countA: 0
  },
  mutations: {
    incrementCountA(state) {
      state.countA++;
    }
  },
  actions: {
    incrementCountA({ commit }) {
      commit('incrementCountA');
    }
  }
});

// register a nested module `nested/myModule`
store.registerModule('nested', {
  namespaced: true
});

store.registerModule(['nested', 'myModule'], {
  namespaced: true,
  state: {
    countB: 1
  },
  mutations: {
    incrementCountB(state) {
      state.countB++;
    }
  },
  actions: {
    incrementCountB({ commit }) {
      commit('incrementCountB');
    }
  }
});

new Vue({
  store,
  computed: {
    ...mapState('myModule', {
      countA: state => state.countA
    }),
    ...mapState('nested/myModule', {
      countB: state => state.countB
    })
  },
  methods: {
    ...mapActions('myModule', [
      'incrementCountA'
    ]),
    ...mapActions('nested/myModule', [
      'incrementCountB'
    ])
  },
  template: `
    <div id="app">
      Count A: {{ countA }}<br>
      <button @click="incrementCountA">Increment Count A</button><br><br>
      Count B: {{ countB }}<br>
      <button @click="incrementCountB">Increment Count B</button>
    </div>
  `
}).$mount('#app');

// You can also remove a dynamically registered module with store.unregisterModule(moduleName).Note you cannot remove static modules(declared at store creation) with this method.
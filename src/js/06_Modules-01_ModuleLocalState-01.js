import Vue from 'vue';
import Vuex, { mapState, mapGetters, mapActions } from 'vuex';

Vue.use(Vuex);

const moduleA = {
  state: { count: 0 },
  mutations: {
    increment(state) {
      // `state` is the local module state
      state.count++;
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count;
    }
  },
  actions: {
    incrementIfOddOnRootSum({ state, commit, rootState }) {
      // context = { state, getters, rootState, rootGetters, commit, dispatch }
      if((state.count + rootState.count) % 2 === 1) {
        commit('increment');
      }
    }
  }
};

const store = new Vuex.Store({
  modules: {
    a: moduleA
  },
  state: {
    count: 100
  },
  mutations: {
    incrementRoot(state) {
      state.count++;
    }
  },
  actions: {
    incrementRoot({ commit }) {
      commit('incrementRoot');
    }
  }
});

new Vue({
  el: '#app',
  store,
  computed: {
    ...mapState({
      countA: state => state.a.count,
      rootCount: state => state.count
    }),
    ...mapGetters([
      'doubleCount',
      'sumWithRootCount'
    ])
  },
  methods: mapActions([
    'incrementIfOddOnRootSum',
    'incrementRoot'
  ]),
  template: `
    <div id="app">
      Count A: {{ countA }}<br>
      <button @click="incrementIfOddOnRootSum">Increment If Odd On Root Sum</button>
      <br><br>
      Root Count: {{ rootCount }}<br>
      <button @click="incrementRoot">Increment Root</button>
    </div>
  `
});
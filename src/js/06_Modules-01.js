import Vue from 'vue';
import Vuex, { mapState, mapGetters, mapActions } from 'vuex';

Vue.use(Vuex);

const moduleA = {
  state: {
    countA: 1,
  },
  getters: {
    doubleCountA(state) {
      return state.countA * 2;
    }
  },
  mutations: {
    incrementCountA(state) {
      state.countA++;
    }
  },
  actions: {
    incrementCountA(context) {
      context.commit('incrementCountA');
    }
  }
};

const moduleB = {
  state: {
    countB: 1,
  },
  getters: {
    doubleCountB(state) {
      return state.countB * 2;
    }
  },
  mutations: {
    incrementCountB(state) {
      state.countB++;
    }
  },
  actions: {
    incrementCountB(context) {
      context.commit('incrementCountB');
    }
  }
};

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
});

const vm = new Vue({
  el: '#app',
  store,
  computed: {
    ...mapState({
      countA: state => state.a.countA,
      countB: state => state.b.countB
    }),
    ...mapGetters([
      'doubleCountA',
      'doubleCountB'
    ])
  },
  methods: mapActions([
    'incrementCountA',
    'incrementCountB'
  ]),
  template: `
    <div id="app">
      Count A: {{ countA }}<br>
      Double Count A: {{ doubleCountA }}<br>
      <button @click="incrementCountA">Increment Count A</button><br><br>
      Count B: {{ countB }}<br>
      Double Count B: {{ doubleCountB }}<br>
      <button @click="incrementCountB">Increment Count B</button>
    </div>
  `
});

console.log(vm.$store);
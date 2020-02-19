import Vue from 'vue';
import Vuex, { mapState, mapActions } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    incrementBy(state, payload) {
      state.count += payload.amount;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
    incrementBy({ commit }, payload) {
      commit('incrementBy', payload);
    },
    incrementAsyncBy({ commit }, payload) {
      setTimeout(() => {
        commit('incrementBy', payload);
      }, 1000);
    }
  }
});

new Vue({
  el: '#app',
  store,
  data: {
    number: 0
  },
  computed: mapState(['count']),
  methods: {
    ...mapActions([
      // map `this.increment()` to `this.$store.dispatch('increment')`
      'increment', 

      'incrementAsync',

      // `mapActions` also supports payloads:
      // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
      'incrementBy'
    ]),
    ...mapActions({
      // map `this.addAsyncBy()` to `this.$store.dispatch('incrementAsyncBy')`
      addAsyncBy: 'incrementAsyncBy' 
    })
  },
  template: `
    <div id="app">
      {{ count }}<br>
      <button @click="increment()">Add</button>
      <button @click="incrementAsync()">Add Async</button><br><br>
      <input type="number" v-model.number="number"><br>
      <button @click="incrementBy({amount: number})">Add By</button>
      <button @click="addAsyncBy({amount: number})">Add Async By</button>
    </div>
  `
});

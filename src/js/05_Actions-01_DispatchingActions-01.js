import Vue from 'vue';
import Vuex, { mapState } from 'vuex';

Vue.use(Vuex);

// Actions are triggered with the store.dispatch method. This may look silly at first sight: if we want to increment the count, why don't we just call store.commit('increment') directly? Remember that mutations have to be synchronous. Actions don't. We can perform asynchronous operations inside an action

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
    add() {
      this.$store.dispatch('increment');
    },
    addAsync() {
      this.$store.dispatch('incrementAsync');
    },
    addBy() {
      this.$store.dispatch('incrementBy', {
        amount: this.number
      });
    },
    addAsyncBy() {
      this.$store.dispatch({
        type: 'incrementAsyncBy',
        amount: this.number
      });
    }
  },
  template: `
    <div id="app">
      {{ count }}<br>
      <button @click="add()">Add</button>
      <button @click="addAsync()">Add Async</button><br><br>
      <input type="number" v-model.number="number"><br>
      <button @click="addBy()">Add By</button>
      <button @click="addAsyncBy()">Add Async By</button>
    </div>
  `
});

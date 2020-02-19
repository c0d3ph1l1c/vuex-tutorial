import Vue from 'vue';
import Vuex from 'vuex';
import { mapState } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    count2: 0
  },
  mutations: {
    increment(state, n) {
      state.count += n;
    },
    increment2(state, payload) {
      state.count2 += payload.amount;
    }
  }
});

new Vue({
  el: '#app',
  store,
  data: {
    value: 0,
  },
  computed: mapState(['count']),
  methods: {
    add() {
      // You can pass an additional argument to store.commit, which is called the payload for the mutation
      this.$store.commit('increment', this.value);
    }
  },
  template: `
    <div id="app">
      {{ count }}<br>
      <input type="number" v-model.number="value">
      <button @click="add()">+</button>
    </div>
  `
});

new Vue({
  el: '#app2',
  store,
  data: {
    value: 0,
  },
  computed: mapState(['count2']),
  methods: {
    add() {
      // In most cases, the payload should be an object so that it can contain multiple fields, and the recorded mutation will also be more descriptive
      this.$store.commit(
        'increment2', 
        { 
          amount: this.value
        }
      );
    }
  },
  template: `
    <div id="app">
      {{ count2 }}<br>
      <input type="number" v-model.number="value">
      <button @click="add()">+</button>
    </div>
  `
});


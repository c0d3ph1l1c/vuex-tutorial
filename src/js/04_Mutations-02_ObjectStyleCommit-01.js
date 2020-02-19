import Vue from 'vue';
import Vuex from 'vuex';
import { mapState } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, payload) {
      state.count += payload.amount;
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
    // An alternative way to commit a mutation is by directly using an object that has a type property
    add() {
      this.$store.commit(
        { 
          type: 'increment', 
          amount: this.value
        }
      );
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
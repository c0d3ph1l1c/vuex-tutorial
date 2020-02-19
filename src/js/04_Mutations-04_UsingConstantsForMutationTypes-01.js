import Vue from 'vue';
import Vuex, { mapState } from 'vuex';
import { SOME_MUTATION } from '../others/mutation-type.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // we can use the ES2015 computed property name feature to use a constant as the function name
    [SOME_MUTATION](state, payload) {
      state.count += payload;
    }
  }
});

new Vue({
  el: '#app',
  store,
  computed: mapState({
    count: state => state.count
  }),
  data: {
    number: 0
  },
  methods: {
    add() {
      this.$store.commit('SOME_MUTATION', this.number);
    }
  },
  template: `
    <div id="app">
      {{ count }}<br>
      <input type="number" v-model.number="number">
      <button @click="add()">+</button>
    </div>
  `
});
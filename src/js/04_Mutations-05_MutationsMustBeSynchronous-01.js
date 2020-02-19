import Vue from 'vue';
import Vuex from 'vuex';
import { mapState } from 'vuex';

Vue.use(Vuex);

// One important rule to remember is that mutation handler functions must be synchronous.

// Now imagine we are debugging the app and looking at the devtool's mutation logs. For every mutation logged, the devtool will need to capture a "before" and "after" snapshots of the state. However, the asynchronous callback inside the example mutation above makes that impossible: the callback is not called yet when the mutation is committed, and there's no way for the devtool to know when the callback will actually be called - any state mutation performed in the callback is essentially un-trackable!

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state, n) {
      setTimeout(() => {
        state.count += n
      }, 1000);
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
import Vue from 'vue';
import Vuex, { mapState } from 'vuex';

Vue.use(Vuex);

// Action handlers receive a context object which exposes the same set of methods/properties on the store instance, so you can call context.commit to commit a mutation, or access the state and getters via context.state and context.getters. We can even call other actions with context.dispatch. 

// We will see why this context object is not the store instance itself when we introduce Modules later.

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    increment2({ commit }) {
      commit('increment');
    }
  }
});

new Vue({
  el: '#app',
  store,
  computed: mapState(['count']),
  methods: {
    add() {
      this.$store.dispatch('increment');
    },
    add2() {
      this.$store.dispatch('increment2');
    }
  },
  template: `
    <div id="app">
      {{ count }}<br>
      <button @click="add()">+</button>
      <button @click="add2()">+</button>
    </div>
  `
});

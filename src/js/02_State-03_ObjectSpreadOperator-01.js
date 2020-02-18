import Vue from 'vue';
import Vuex from 'vuex';
import { mapState } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  }
});

new Vue({
  store,
  data() {
    return {
      message: 'object spread operator'
    }
  },
  computed: {
    heading() {
      return this.message.replace(/\b(\w)(\w+)\b/g, (match, p1, p2) => p1.toUpperCase() + p2);
    },
    ...mapState([
      'count'
    ])
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    }
  },
  template: `
    <div>
      <h1>{{ heading }}</h1>
      {{ count }}<br>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
  `
}).$mount('#app');
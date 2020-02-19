import Vue from 'vue';
import Vuex, { mapState, mapMutations } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    incrementBy(state, amount) {
      state.count += amount;
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
    ...mapMutations([
      // map `this.increment()` to `this.$store.commit('increment')`
      'increment', 

      // `mapMutations` also supports payloads:
      // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
      'incrementBy' 
    ]),
    ...mapMutations({
      // map `this.add()` to `this.$store.commit('increment')`
      add: 'increment'  
    })
  },
  template: `
    <div id="app">
      {{ count }}<br>
      <button @click="increment">Increment</button>
      <button @click="add">+</button><br>
      <input type="number" v-model.number="number">
      <button @click="incrementBy(number)">IncrementBy</button>
    </div>
  `
});
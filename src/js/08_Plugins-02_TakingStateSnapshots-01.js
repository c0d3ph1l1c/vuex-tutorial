import Vue from 'vue';
import Vuex, { mapState, mapActions } from 'vuex';

const _ = {
  cloneDeep(obj) {
    return (function cloneDeepAux(obj, cache = []) {
      if(obj === null || typeof obj != 'object') {
        return obj;
      }

      for(const layer in cache) {
        if(layer.original === obj) {
          return layer.clone;
        }
      }

      const layer = {
        original: obj,
        clone: {}
      };
      cache.push(layer);
      for(const key in obj) {
        layer.clone[key] = cloneDeepAux(obj[key], cache);
      }
      
      return layer.clone;
    })(obj); 
  }
};

const myPluginWithSnapshot = store => {
  let prevState = _.cloneDeep(store.state);
  store.subscribe((mutation, state) => {
    let nextState = _.cloneDeep(state);

    console.groupCollapsed(`state-change:@${new Date()}`);
      console.log('Next State:');
      console.log(nextState);
      console.log('Prev State:');
      console.log(prevState);
    console.groupEnd();

    // compare `prevState` and `nextState`...

    // save state for next mutation
    prevState = nextState
  });
};

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
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
    decrement({ commit }) {
      commit('decrement');
    }
  },
  plugins: [ myPluginWithSnapshot ]
});

new Vue({
  store,
  computed: mapState([
    'count'
  ]),
  methods: mapActions([
    'increment',
    'decrement'
  ]),
  template: `
    <div id="app">
      {{ count }}<br>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
    </div>
  `
}).$mount('#app');
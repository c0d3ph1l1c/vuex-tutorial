import Vue from 'vue';
import Vuex, { mapState, mapActions } from 'vuex';

Vue.use(Vuex);

const Foo = {
  namespaced: true,
  state: {
    count: 1
  },
  getters: {
    // `getters` is localized to this module's getters
    // you can use rootGetters via 4th argument of getters
    someGetter(state, getters, rootState, rootGetters) {
      // -> 'foo/someOtherGetter'
      const a = getters.someOtherGetter;  
      // -> 'someOtherGetter'
      const b = rootGetters.someOtherGetter;  
      return a + b;
    },
    someOtherGetter: state => {
      return state.count;
    }
  },
  mutations: {
    someMutation(state) {
      state.count++;
    }
  },
  // dispatch and commit are also localized for this module
  // they will accept `root` option for the root dispatch/commit
  actions: {
    someAction({ dispatch, commit, getters, rootGetters }) {
      console.log('foo/someAction');

      // -> 'foo/someGetter'
      const a = getters.someGetter;
      // -> 'someGetter'
      const b = rootGetters.someGetter;
      alert('foo/someGetter: ' + a + '\nsomeGetter: ' + b);

      // -> 'foo/someOtherAction'
      dispatch('someOtherAction');
      // -> 'someOtherAction'
      dispatch('someOtherAction', null, { root: true });

      // -> 'foo/someMutation'
      commit('someMutation');
      // -> 'someMutation'
      commit('someMutation', null, { root: true });
    },
    someOtherAction(ctx, payload) {
      console.log('foo/someOtherAction');
    }
  }
};

const store = new Vuex.Store({
  modules: {
    foo: Foo
  },
  state: {
    count: 100
  },
  getters: {
    someGetter(state, getters) {
      // -> 'someOtherGetter'
      const a = getters.someOtherGetter;
      return a + 1;
    },
    someOtherGetter: state => {
      return state.count;
    }
  },
  mutations: {
    someMutation(state) {
      state.count++;
    }
  },
  actions: {
    someOtherAction(ctx, payload) {
      console.log('someOtherAction');
    }
  }
});

new Vue({
  el: '#app',
  store,
  computed: {
    ...mapState('foo', { fooCount: 'count' }),
    ...mapState(['count'])
  },
  methods: mapActions('foo', ['someAction']),
  template: `
    <div id="app">
      Foo Count: {{ fooCount }}<br>
      Count: {{ count }}<br>
      <button @click="someAction">Some Action</button>
    </div>
  `
});
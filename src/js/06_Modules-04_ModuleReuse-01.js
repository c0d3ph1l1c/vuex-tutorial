import Vue from 'vue';
import Vuex, { mapState, mapActions } from 'vuex';

Vue.use(Vuex);

const MyReusableModule = {
  state() {
    return {
      foo: 'bar'
    }
  },
  mutations: {
    capitalize(state) {
      state.foo = state.foo.charAt(0).toUpperCase() + state.foo.substring(1);
    },
    reverse(state) {
      state.foo = state.foo.split('').reverse().join('');
    }
  },
  actions: {
    capitalize({ commit }) {  
      commit('capitalize');
    },
    reverse({ commit }) {      
      commit('reverse');
    }
  }
};

const store = new Vuex.Store({
  modules: {
    module1: {
      namespaced: true,
      modules: {
        reusableModule: MyReusableModule
      }
    },
    module2: {
      namespaced: true,
      modules: {
        reusableModule: MyReusableModule
      }
    }
  }
});

const vm = new Vue({
  el: '#app',
  store,
  computed: {
    ...mapState('module1', {
      foo1: state => state.reusableModule.foo
    }),
    ...mapState('module2', {
      foo2: state => state.reusableModule.foo
    })
  },
  methods: {
    ...mapActions('module1', {
      capitalize1: 'capitalize',
      reverse1: 'reverse'
    }),
    ...mapActions('module2', {
      capitalize2: 'capitalize',
      reverse2: 'reverse'
    })
  },
  template: `
    <div id="app">
      $store.state.module1.reusableModule.foo: {{ foo1 }}<br>
      <button @click="capitalize1">Capitalize</button>
      <button @click="reverse1">Reverse</button><br><br>

      $store.state.module2.reusableModule.foo: {{ foo2 }}<br>
      <button @click="capitalize2">Capitalize</button>
      <button @click="reverse2">Reverse</button>
    </div>
  `
});

console.log(vm);
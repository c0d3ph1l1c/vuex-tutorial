import Vue from 'vue';
import Vuex, { createNamespacedHelpers } from 'vuex';
const { mapState: mapState, mapActions } = createNamespacedHelpers('some/nested/module');

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    some: {
      namespaced: true,
      modules: {
        nested: {
          namespaced: true,
          modules: {
            module: {
              namespaced: true,
              state: {
                a: 1,
                b: 2
              },
              mutations: {
                incrementA(state) {
                  state.a++;
                },
                incrementB(state) {
                  state.b++;
                }
              },
              actions: {
                foo({ commit }) {
                  commit('incrementA');
                },
                bar({ commit }) {
                  commit('incrementB');
                }
              }
            }
          }
        }
      }
    }
  }
});

new Vue({
  el: '#app',
  store,
  computed: {
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    ...mapActions([
      'foo',
      'bar',
    ])
  },
  template: `
    <div id="app">
      A: {{ a }}<br>
      <button @click="foo">Increment A</button><br><br>
      
      B: {{ b }}<br>
      <button @click="bar">Increment B</button>
    </div>
  `
});
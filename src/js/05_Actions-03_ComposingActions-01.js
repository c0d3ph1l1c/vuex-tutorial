import Vue from 'vue';
import Vuex, { mapState, mapMutations, mapActions } from 'vuex';

Vue.use(Vuex);

async function getData() {
  return await new Promise((resolve, reject) => {
    setTimeout(() => 
      resolve({
        text: 'Data 1'
      }), 1000);
  });
}

async function getOtherData() {
  return await new Promise((resolve, reject) => {
    setTimeout(() => 
      resolve({
        text: 'Data 2'
      }), 1000);
  });
}

const store = new Vuex.Store({
  state: {
    data: 'No Mutation Yet'
  },
  mutations: {
    someMutation(state) {
      state.data = 'someMutation';
      console.log('someMutation');
    },
    someOtherMutation(state) {
      state.data = 'someOtherMutation';
      console.log('someOtherMutation');
    },
    gotData(state, payload) {
      state.data = payload.text;
      console.log('gotData');
    },
    gotOtherData(state, payload) {
      state.data = payload.text;
      console.log('gotOtherData');
    }
  },
  actions: {
    actionA({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation');
          resolve();
        }, 1000);
      });
    },
    actionB({ dispatch, commit }) {
      return dispatch('actionA').then(() => {
        commit('someOtherMutation');
      });
    },
    async actionC({ commit }) {
      commit('gotData', await getData());
    },
    async actionD({ dispatch, commit }) {
      // wait for `actionC` to finish
      dispatch('actionC');
      commit('gotOtherData', await getOtherData());  
    }
  }
});

new Vue({
  el: '#app',
  store,
  computed: mapState(['data']),
  methods: {
    ...mapActions([
      'actionA',
      'actionB',
      'actionC',
      'actionD'
    ]),
    doneActionA() {
      this.actionA().then(() => {
        console.log('Action A done!');
      });
    }
  },  
  template: `
    <div id="app">
      {{ data }}<br>
      <button @click="doneActionA()">Action A</button>
      <button @click="actionB()">Action B</button>
      <button @click="actionC()">Action C</button>
      <button @click="actionD()">Action D</button>
    </div>
  `
});

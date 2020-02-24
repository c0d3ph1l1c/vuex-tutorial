import Vue from 'vue';
import Vuex from 'vuex';
import createWebSocketPlugin from '../plugins/create-websocket-plugin';

let socket = io.connect('ws://localhost:8080/');
const plugin = createWebSocketPlugin(socket);

const store = new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    receiveData(state, payload) {
      state.tasks = payload;
    },
    UPDATE_DATA(state, payload) {
      
    } 
  },
  plugins: [ plugin ],
  actions: {

  }
});


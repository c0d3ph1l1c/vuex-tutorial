import Vue from 'vue';
import Vuex, { mapState, mapActions } from 'vuex';
import createWebSocketPlugin from '../plugins/create-websocket-plugin';

let socket = io.connect('ws://localhost:3000/');
const plugin = createWebSocketPlugin(socket);

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [],
    id: -1
  },
  mutations: {
    receiveData(state, payload) {
      state.tasks = payload;
      state.tasks.forEach(task => { 
        if(task.id > state.id) {
          state.id = task.id;
        }
      });
      state.id++;
    },
    UPDATE_DATA(state, payload) {
      for(let i = 0; i < state.tasks.length; i++) {
        if(payload.id == state.tasks[i].id) {
          state.tasks[i].name = payload.name;
          state.tasks[i].checked = payload.checked;
          return;
        }
      }
      state.tasks.push(payload);
      state.id = payload.id + 1;
    } 
  },
  plugins: [ plugin ],
  actions: {
    update({ commit }, payload) {
      commit('UPDATE_DATA', payload);
    }
  }
});

new Vue({
  el: '#app',
  store,
  data: {
    task: ''
  },
  computed: {
    ...mapState([
      'tasks',
      'id'
    ]),
    newTask() {
      return {
        id: this.id,
        name: this.task,
        checked: false
      };
    }
  },
  methods: {
    ...mapActions([
      'update'
    ]),
    add() {
      this.update(this.newTask);
      this.task = '';
    }
  },
  template: `
    <div id="app">
      <label for="task">Task: </label>
      <input id="task" v-model="task">
      <button @click="add(newTask)">Add</button>
      <ul>
        <li
          v-for="task in tasks"
          :key="task.id"
          :style="{ 
            textDecoration: task.checked
              ? 'line-through' 
              : 'none' 
          }"
        >{{ task.name }}</li>
      </ul>
    </div>
  `
});


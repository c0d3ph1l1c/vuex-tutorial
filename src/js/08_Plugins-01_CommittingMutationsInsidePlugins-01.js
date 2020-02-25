import Vue from 'vue';
import Vuex, { mapState, mapActions } from 'vuex';
import createWebSocketPlugin from '../plugins/create-websocket-plugin';

let socket = io.connect('ws://localhost:3000/');
const plugin = createWebSocketPlugin(socket);

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [],
    id: 0
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
    addData(state, payload) {
      state.tasks.push(payload);
    },
    updateData(state, payload) {
      for(let i = 0; i < state.tasks.length; i++) {
        if(state.tasks[i] === payload.task) {
          for(const key in payload.update) {
            Vue.set(state.tasks[i], 
              key, payload.update[key]);
          }       
          break;
        }
      }    
    },
    removeData(state, payload) {
      for(let i = 0; i < this.state.tasks.length; i++) {
        if(state.tasks[i].id == payload) {
          state.tasks.splice(i, 1);
          break;
        }
      }
    },
    incrementId(state) {
      state.id++;
    } 
  },
  plugins: [ plugin ],
  actions: {
    addData({ commit }, payload) {
      commit('addData', payload);
    },
    updateData({ commit }, payload) {
      commit('updateData', payload);
    },
    removeData({ commit }, payload) {
      commit('removeData', payload);
    },
    incrementId({ commit }) {
      commit('incrementId');
    }
  }
});

new Vue({
  el: '#app',
  store,
  data: {
    newTaskName: '',
    taskNameInEdit: '',
    isEdit: false
  },
  computed: mapState([
    'tasks',
    'id'
  ]),
  methods: {
    ...mapActions([
      'addData',
      'updateData',
      'removeData',
      'incrementId'
    ]),
    addTask() {
      if(this.task != '') {
        this.addData({
          id: this.id,
          name: this.newTaskName,
          isEdit: false
        });
        this.incrementId();
        this.newTaskName = '';
      }    
    },
    enterEditState(task) {
      if(!this.isEdit) {
        this.updateData({
          task,
          update: {
            isEdit: true
          }
        });
        this.taskNameInEdit = task.name;
        this.isEdit = true;
      }
    },
    exitEditState(task) {
      const update = { 
        isEdit: false 
      };
      this.taskNameInEdit != '' && 
        (update.name = this.taskNameInEdit);
      this.updateData({
        task,
        update
      });
      this.isEdit = false;
    },
    removeTask(id) {
      this.removeData(id);
      this.isEdit = false;
    }
  },
  template: `
    <div id="app">
      <h1>To-Do List</h1>
      <input 
        class="taskInput"
        v-model="newTaskName" 
        :disabled="isEdit"
        placeholder="Enter New Task"
      >
      <button 
        class="addBtn"
        @click="addTask"
        :disabled="isEdit"
      >Add</button>
      <transition-group name="task" tag="ul" class="tasks">
        <li
          class="task"
          v-for="task in tasks"
          :key="task.id"
        >
          <div 
            class="taskName" 
            v-if="!task.isEdit"
          >
            {{ task.name }}
          </div>
          <input 
            class="editTaskName" 
            v-else 
            v-model="taskNameInEdit"
          >
          <i 
            class="fas fa-pencil-alt" 
            v-if="!task.isEdit" 
            @click="enterEditState(task)"
          ></i>
          <i 
            class="fas fa-check" 
            v-else 
            @click="exitEditState(task)"
          ></i>
          <i 
            class="far fa-trash-alt"
            @click="removeTask(task.id)"
          ></i>
        </li>
      </transition-group>
    </div>
  `
});

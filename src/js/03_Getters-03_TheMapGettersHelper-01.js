import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  state: {
    todos: [
      { id: 0, text: 'Design a prototype', done: true },
      { id: 1, text: 'Meeting', done: false },
      { id: 2, text: 'Launch website', done: true }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id == id);
    }
  }
});

const TodoList = {
  computed: {
    ...mapState(['todos']),
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'doneTodosCount',
      'getTodoById'
    ])
  },
  data() {
    return {
      id: null,
      task: null
    }
  },
  watch: {
    id() {
      this.task = this.getTodoById(this.id);
    }
  },
  template: `
    <div>
      <ul>
        <li v-for="todo in todos">
          <span v-if="todo.done">&#10004 </span>{{ todo.id }}: {{ todo.text }}
        </li>
      </ul>
      Task completed: {{ doneTodosCount }}<br><br>
      <label for="id">Search Task Id: </label>
      <input id="id" type="number" v-model.number="id">
      <div v-if="task" class="result">
        <span v-if="task && task.done">&#10004 </span>{{ task && task.id }}: {{ task && task.text }}
      </div>
    </div>
  `
};

const DoneTodoList = {
  computed: {
    ...mapState(['todos']),
    ...mapGetters({
      doneTodos: 'doneTodos',
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    })
  },
  template: `
    <div>
      <ul>
        <li v-for="doneTodo in doneTodos">
          <span v-if="doneTodo.done">&#10004 </span>{{ doneTodo.id }}: {{ doneTodo.text }}
        </li>
      </ul>
      Task completed: {{ doneCount }}
    </div>
  `
};

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/all'
    },
    {
      path: '/all',
      component: TodoList
    },
    {
      path: '/done',
      component: DoneTodoList
    }
  ]
});

new Vue({
  el: '#app',
  store,
  router,
  template: `
    <div id="todo">
      <h1>Todo List</h1>
      <ul>
        <li><router-link to="/all">/all</router-link></li>
        <li><router-link to="/done">/done</router-link></li>
      </ul>
      <router-view></router-view>
    </div>
  `
});

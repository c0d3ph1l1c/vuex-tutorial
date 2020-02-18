import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';

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
    }
  }
});

const TodoList = {
  props: ['todos'],
  template: `
    <ul>
      <li v-for="todo in todos">
        <span v-if="todo.done">&#10004 </span>{{ todo.id }}: {{ todo.text }}
      </li>
    </ul>
  `
};

const DoneTodoList = {
  props: ['todos', 'doneTodos', 'doneTodosCount'],
  template: `
    <div>
      <ul>
        <li v-for="doneTodo in doneTodos">
          <span v-if="doneTodo.done">&#10004 </span>{{ doneTodo.id }}: {{ doneTodo.text }}
        </li>
      </ul>
      Task completed: {{ doneTodosCount }}
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
  computed: {
    ...mapState(['todos']),
    doneTodos() {
      return this.$store.getters.doneTodos;
    },
    doneTodosCount(){
      return this.$store.getters.doneTodosCount;
    } 
  },
  template: `
    <div id="todo">
      <h1>Todo List</h1>
      <ul>
        <li><router-link to="/all">/all</router-link></li>
        <li><router-link to="/done">/done</router-link></li>
      </ul>
      <router-view
        :todos="todos"
        :doneTodos="doneTodos"
        :doneTodosCount="doneTodosCount"
      ></router-view>
    </div>
  `
});

import Vue from 'vue';
import Vuex, { mapGetters, mapActions } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // module assets 
      // module state is already nested and not affected by namespace option
      state: {
        isLogin: false
      },
      getters: {
        // -> getters['account/isAdmin']
        isAdmin(state) {
          return state.isLogin;
        }
      },
      actions: {
        // -> dispatch('account/login')
        login({ commit }) {
          commit('login');
        }
      },
      mutations: {
        // -> commit('account/login')
        login(state) {
          state.isLogin = true;
        }
      },

      // nested modules
      modules: {
        // inherits the namespace from parent module
        myPage: {
          state: {
            name: 'John Doe',
            age: 18,
            gender: 'Male'
          },
          getters: {
            // -> getters['account/profile']
            // myPage is not namespaced
            profile(state) {
              return {
                name: state.name,
                age: state.age,
                gender: state.gender
              }
            }
          }
        },

        // further nest the namespace
        posts: {
          namespaced: true,
          state: {
            post: 'This is my most popular post.'
          },
          // -> getters['account/posts/popular']
          getters: {
            popular(state) {
              return state.post;
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
    ...mapGetters(
      'account', [
      'isAdmin',
      'profile'   
    ]),
    ...mapGetters(
      'account/posts', [
      'popular'
    ])
  },
  methods: mapActions('account', [
    'login'
  ]),
  template: `
    <div id="app">
      <button 
        v-if="!isAdmin"
        @click="login"
      >Login</button>
      <template v-if="isAdmin">
        <h1>Admin</h1>
        <ul>
          <li
            v-for="(value, key) in profile"
            :key="key"
          >{{ key.charAt(0).toUpperCase() + key.substring(1) }}: {{ value }}</li>
        </ul>
        <h2>Posts</h2>
        <p>{{ popular }}</p>
      </template>
    </div>
  `
});
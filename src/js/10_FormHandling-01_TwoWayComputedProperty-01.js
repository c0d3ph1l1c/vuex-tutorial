import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    obj: {
      message: ''
    }
  },
  mutations: {
    updateMessage(state, message) {
      state.obj.message = message;
    }
  }
});

new Vue({
  el: '#app',
  store,
  computed: {
    message: {
      get() {
        return this.$store.state.obj.message;
      },
      set(value) {
        this.$store.commit('updateMessage', value);
      }
    },
    capitalizeMessage() {
      // console.log(this.message);
      // return this.message;
      return this.message.replace(/\b(\w)(\w*)\b/g, (match, p1, p2) => {
        return p1.toUpperCase() + p2;
      });
    }
  }, 
  template: `
    <div id="app">
      <input v-model="message" placeholder="Message to be capitalized">
      <br>
      {{ capitalizeMessage }}
    </div>
  `
})
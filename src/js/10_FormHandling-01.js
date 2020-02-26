import Vue from 'vue';
import Vuex, { mapState} from 'vuex';

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
    ...mapState({
      message: state => state.obj.message
    }),
    capitalizeMessage() {
      // console.log(this.message);
      // return this.message;
      return this.message.replace(/\b(\w)(\w*)\b/g, (match, p1, p2) => {
        return p1.toUpperCase() + p2;
      });
    }
  }, 
  methods: {
    updateMessage(e) {
      this.$store.commit('updateMessage', e.target.value);
    }
  },
  template: `
    <div id="app">
      <input :value="message" @input="updateMessage" placeholder="Message to be capitalized">
      <br>
      {{ capitalizeMessage }}
    </div>
  `
})
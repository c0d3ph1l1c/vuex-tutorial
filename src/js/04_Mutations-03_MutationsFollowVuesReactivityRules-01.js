import Vue from 'vue';
import Vuex, { mapState } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    detail: {
      name: 'John',
      age: 18
    }
  },
  mutations: {
    addProp(state, payload) {
      for(let key in payload) {
        // Vue.set(state.detail, key, payload[key]);
        state.detail = { ...state.detail, [key]: payload[key] }
      }
    }
  }
});

new Vue({
  el: '#app',
  store,
  data: {
    prop: null,
    val: null
  },
  computed: mapState(['detail']), 
  methods: {
    addProp() {
      const payload = {};
      payload[this.prop.toLowerCase()] = this.val.toLowerCase();
      this.$store.commit('addProp', payload);
      this.prop = '';
      this.val = '';
    },
    capitalize(str) {
      return typeof str == 'string'? 
        str.replace(
          /\b(\w)(\w+)\b/g, 
          (match, p1, p2) => p1.toUpperCase() + p2) : str;
    }
  },
  template: `
    <div id="app">
      <ul>
        <li
          v-for="(val, key) in detail"
          :key="key"
        >{{ capitalize(key) }}: {{ capitalize(val) }}</li>
      </ul>
      <input v-model="prop" placeholder="prop">: 
      <input v-model="val" placeholder="value">
      <button @click="addProp">Add Prop</button>
    </div>
  `
});
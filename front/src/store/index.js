import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import owner from './owner'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    additem (state, data) {
      state.items.push({
        name: data,
        edit: false,
        model: data
      })
    }
  },
  actions: {
  },
  modules: {
    user,
    owner
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import owner from './owner'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    additem (state, data) {
      state.items.push({
        item: data,
        price: data,
        edit: false
      })
    }
  },
  actions: {
  },
  modules: {
    user,
    owner
  },
  plugins: [createPersistedState({
    key: 'goodjob',
    paths: ['user.token', 'owner.token']
  })]
})

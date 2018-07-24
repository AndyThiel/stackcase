import Vue from 'vue'
import Vuex from 'vuex'

import sessions from './sessions'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  actions: {
    init () {
      console.log('store init')
    },
  },

  modules: {
    sessions,
  },
})

// Hot module replacement for the store
if (module.hot) {
  module.hot.accept([
    './sessions',
  ], () => {
    store.hotUpdate({
      modules: {
        sessions: require('./sessions').default,
      },
    })
  })
}

export default store

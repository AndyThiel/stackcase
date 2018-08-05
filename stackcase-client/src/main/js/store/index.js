import Vue from 'vue'
import Vuex from 'vuex'

import sessions from './sessions'
import projects from './projects'
import stacks from './stacks'

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
    projects,
    stacks,
  },
})

// Hot module replacement for the store
if (module.hot) {
  module.hot.accept([
    './sessions',
    './projects',
    './stacks',
  ], () => {
    store.hotUpdate({
      modules: {
        sessions: require('./sessions').default,
        projects: require('./projects').default,
        stacks: require('./stacks').default,
      },
    })
  })
}

export default store

export default {
  namespaced: true,

  state () {
    return {
      sessions: [],
      displayOption: {
        key: 2,
        message: 'Row',
        link: '#',
      },
      focusSession: null,
      nextId: 1,
    }
  },

  getters: {

    displayOptionList: function () {
      return [
        {
          key: 1,
          message: 'Row Card',
          link: '#',
        },
        {
          key: 2,
          message: 'Row',
          link: '#',
        },
        {
          key: 3,
          message: 'Card',
          link: '#',
        },
        {
          key: 4,
          message: 'Label',
          link: '#',
        },
      ]
    },

    displayOption: state => {
      return state.displayOption
    },
    sessions: state => {
      return state.sessions
    },
    focusSession: state => {
      return state.focusSession
    },
    nextId: state => {
      return state.nextId
    },
  },

  mutations: {
    incrementNextId (state) {
      state.nextId++
    },

    updateModifiedRecord (state, value) {
      state.sessions[value.sessionIndex].modifiedValues = {
        ...value.modifiedRecord,
      }
    },

    addSession (state, session) {
      state.sessions.push(session)
    },

    removeSession (state, id) {
      const index = state.sessions.findIndex(
        session => session.id === id
      )
      if (index !== -1) {
        state.sessions.splice(index, 1)
      }
    },

    sessions (state, value) {
      state.sessions = value
    },
    displayOption (state, value) {
      state.displayOption = value
    },
    focusSession (state, value) {
      state.focusSession = value
    },
    nextId (state, value) {
      state.nextId = value
    },
  },

  actions: {
    updateModifiedRecord ({commit, state}, value) {
      const index = state.sessions.findIndex(
        session => session.id === value.sessionId
      )
      commit('updateModifiedRecord', {
        sessionIndex: index,
        modifiedRecord: value.modified,
      })
    },

    createSession ({commit, state}, values) {
      commit('addSession', {
        id: state.nextId,
        modifiedValues: null,
        ...values,
      })
      commit('incrementNextId')
    },

    changeDisplayOption ({commit}, option) {
      commit('displayOption', option)
    },

    deleteSession ({commit}, id) {
      commit('removeSession', id)
    },

    setFocusSession ({ commit }, value) {
      commit('focusSession', value)
    },
  },
}

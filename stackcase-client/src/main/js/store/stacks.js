import http from '../utils/http'

export default {
  namespaced: true,

  state () {
    return {
      stacks: [],
      loading: false,
      searchText: '',
    }
  },

  getters: {
    stacks: state => {
      if (state.searchText) {
        const reg = new RegExp(state.searchText.trim().toLowerCase().replace(/\s+/g, '|'))
        return state.stacks.filter(
          stack => stack.label.toLowerCase().search(reg) !== -1
        )
      } else {
        return state.stacks
      }
    },
    stacksMap: state => state.stacks.reduce((obj, stack) => {
      obj[stack.key] = stack
      return obj
    }, {}),
    loading: state => state.loading,
    searchText: state => state.searchText,
  },

  mutations: {
    stacks (state, value) {
      state.stacks = value
    },
    loading (state, value) {
      state.loading = value
    },
    searchText (state, value) {
      state.searchText = value
    },
  },

  actions: {

    async upsertStack ({ commit, dispatch }, value) {
      let data = {
        ...value.session.originalRecord,
        ...value.modified,
      }
      if (data.id === null) {
        await http.post('rest/stacks', data)
      } else {
        await http.put('rest/stacks', data)
      }
      dispatch('fetchstacks')
    },

    async fetchStacks ({ commit }) {
      commit('loading', true)
      const result = await http.get('rest/stacks')
      commit('stacks', result.data)
      commit('loading', false)
    },

    setSearchText ({ commit }, value) {
      commit('searchText', value)
    },
  },
}

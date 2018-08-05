import http from '../utils/http'

export default {
  namespaced: true,

  state () {
    return {
      projects: [],
      loading: false,
      searchText: '',
    }
  },

  getters: {
    projects: state => {
      if (state.searchText) {
        const reg = new RegExp(state.searchText.trim().toLowerCase().replace(/\s+/g, '|'))
        return state.projects.filter(
          project => project.label.toLowerCase().search(reg) !== -1
        )
      } else {
        return state.projects
      }
    },
    projectsMap: state => state.projects.reduce((obj, project) => {
      obj[project.key] = project
      return obj
    }, {}),
    loading: state => state.loading,
    searchText: state => state.searchText,
  },

  mutations: {
    projects (state, value) {
      state.projects = value
    },
    loading (state, value) {
      state.loading = value
    },
    searchText (state, value) {
      state.searchText = value
    },
  },

  actions: {

    async upsertProject ({ commit, dispatch }, value) {
      let data = {
        ...value.session.originalRecord,
        ...value.modified,
      }
      if (data.id === null) {
        await http.post('rest/projects', data)
      } else {
        await http.put('rest/projects', data)
      }
      dispatch('fetchProjects')
    },

    async fetchProjects ({ commit }) {
      commit('loading', true)
      const result = await http.get('rest/projects')
      commit('projects', result.data)
      commit('loading', false)
    },

    setSearchText ({ commit }, value) {
      commit('searchText', value)
    },
  },
}

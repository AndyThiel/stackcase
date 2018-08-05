import Vue from 'vue'
import VueRouter from 'vue-router'

import PageHome from './components/PageHome'
import PageProjectList from './components/PageProjects'
import PageProject from './components/PageProject'
import PageProjectEditor from './components/PageProjectEditor'
import PageProjectPreview from './components/PageProjectPreview'
import PageProjectDashboard from './components/PageProjectDashboard'
import PageStackList from './components/PageStacks'
import PageStack from './components/PageStack'
import PageStackEditor from './components/PageStackEditor'
import PageStackDetails from './components/PageStackDetails'
import PageStackDashboard from './components/PageStackDashboard'
import PageNotFound from './components/PageNotFound'

Vue.use(VueRouter)

const routes = [
  { path: '/projects/:projectid',
    component: PageProject,
    children: [
      { path: 'editor', name: 'ProjectEditor', component: PageProjectEditor },
      { path: 'preview', name: 'ProjectPreview', component: PageProjectPreview },
      { path: '', name: 'ProjectDashboard', component: PageProjectDashboard },
    ],
  },
  { path: '/projects', name: 'projects', component: PageProjectList },
  { path: '/stacks/:stackid',
    component: PageStack,
    children: [
      { path: 'editor', name: 'StackEditor', component: PageStackEditor },
      { path: 'details', name: 'StackDetails', component: PageStackDetails },
      { path: '', name: 'StackDashboard', component: PageStackDashboard },
    ],
  },
  { path: '/stacks', name: 'stacks', component: PageStackList },
  { path: '/', name: 'home', component: PageHome },
  { path: '*', component: PageNotFound },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
})

export default router

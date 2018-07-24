import Vue from 'vue'
import VueRouter from 'vue-router'

import PageHome from './components/PageHome'
import PageNotFound from './components/PageNotFound'

Vue.use(VueRouter)

const routes = [
  { path: '/stackcase/', name: 'home', component: PageHome },
  // { path: '/stackcase/facts', name: 'facts', component: PageFindFacts },
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

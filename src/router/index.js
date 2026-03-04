import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView   from '../views/HomeView.vue'
import Parte1View from '../views/Parte1View.vue'
import Parte2View from '../views/Parte2View.vue'
import Parte3View from '../views/Parte3View.vue'
import Parte4View from '../views/Parte4View.vue'
import Estat1View from '../views/Estat1View.vue'
import Estat2View from '../views/Estat2View.vue'
import Estat3View from '../views/Estat3View.vue'

const routes = [
  { path: '/',       component: HomeView,   name: 'home'   },
  { path: '/parte1', component: Parte1View, name: 'parte1' },
  { path: '/parte2', component: Parte2View, name: 'parte2' },
  { path: '/parte3', component: Parte3View, name: 'parte3' },
  { path: '/parte4', component: Parte4View, name: 'parte4' },
  { path: '/estat1', component: Estat1View, name: 'estat1' },
  { path: '/estat2', component: Estat2View, name: 'estat2' },
  { path: '/estat3', component: Estat3View, name: 'estat3' },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 72, behavior: 'smooth' }
    return { top: 0 }
  }
})

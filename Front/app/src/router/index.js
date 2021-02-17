import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import Home from '@/views/Home.vue'
import MainNav from '@/components/MainNav.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Accueil, children: [
    {path: '/login'},
    {path: '/signup'},
  ]},
  
  {path: '/:user',
    components: {
      default: Home,
      MainNav: MainNav
    },
    props: {
      default: {user: ':user'}
    },
    children: [
      {path: 'profile',
      component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

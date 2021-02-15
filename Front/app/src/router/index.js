import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import Profile from '@/views/Profile.vue'
import MainNav from '@/components/MainNav.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Accueil, children: [
    {path: '/login'},
    {path: '/signup'},
  ]},
  {path: '/:user',
    components: {
      default: Profile,
      MainNav: MainNav
    },
    props: {
      default: {user: ':user'}
    },
    children: [
      {path: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')}
    ]
  },
  {path: '/about',
  component: () => import('../views/About.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

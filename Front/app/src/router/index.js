import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import Home from '@/views/Home.vue'
import MainNav from '@/components/MainNav.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Accueil,
    children: [
      {path: 'login'},
      {path: 'signup'},
    ]
  },

  {
    path: '/home',
    components: {
      default: Home,
      MainNav
    },
    children: [
      {
        path: 'profil',
        component: () => import('../views/Profil.vue'),
      },

      {
        path: 'profil/modification',
        component: () => import('../views/ProfilModif.vue'),
        children: [
          {path: 'infos'},
          {path: 'mail'},
          {path: 'pass'}
        ]
      },
    
      {
        path: 'groupe',
        component: () => import('../views/Groupe.vue'),
        children: [
          {
            path: ':groupeName',
            component: () => import('../views/GroupeName.vue'),
            props: true
            },
        ]
      },
    ]
  },

  {
    path: '/test',
    component: () => import('../views/test.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

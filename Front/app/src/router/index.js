import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import Home from '@/views/Home.vue'
import MainNav from '@/components/MainNav.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: Accueil,
    children: [
      {path: 'login', name: 'login'},
      {path: 'signup', name: 'signup'},
    ]
  },

  {
    path: '/home',
    name: 'home',
    components: {
      default: Home,
      MainNav
    },
    children: [
      {
        path: 'profil',
        name: 'profil',
        component: () => import('../views/Profil.vue'),
      },

      {
        path: 'profil/modification',
        component: () => import('../views/ProfilModif.vue'),
        children: [
          {path: 'infos', name: 'infos'},
          {path: 'mail', name: 'mail'},
          {path: 'pass', name: 'pass'}
        ]
      },
    
      {
        path: 'groupe',
        name: 'groupe',
        component: () => import('../views/Groupe.vue'),
        children: [
          {
            path: 'creation',
            name: 'groupeCreation',
            component: () => import('../views/GroupeCreation.vue')
          },
        ]
      },

      {
        path: 'groupe/:groupeName',
        name: 'groupeName',
        component: () => import('../views/GroupeName.vue'),
        props: true
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

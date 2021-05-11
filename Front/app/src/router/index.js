import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import Home from '@/views/Home.vue'
import MainNav from '@/components/MainNav.vue'
import Footer from '@/views/Footer.vue'

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
      MainNav,
      Footer
    },
    children: [
      {
        path: 'profil',
        name: 'profil',
        component: () => /* webpackPrefetch: true */ import('../views/Profil.vue'),
      },

      {
        path: 'profil/modification',
        component: () => /* webpackPrefetch: true */ import('../views/ProfilModif.vue'),
        children: [
          { path: 'infos', name: 'infos' },
          { path: 'avatar', name: 'avatar' },
          { path: 'mail', name: 'mail' },
          { path: 'pass', name: 'pass' },
          { path: 'deleteUser', name: 'deleteUser' }
        ]
      },
    
      {
        path: 'groupes',
        name: 'groupes',
        component: () => /* webpackPrefetch: true */ import('../views/Groupe.vue'),
        props: true,
        children: [
          { path: 'creation', name: 'creationGroupe' },
          { 
            path: ':groupeProps',
            name: 'groupeProps',
            children: [
              { path: 'creation', name: 'creationParticipation' },
            ]
          }
        ]
      },

      {
        path: 'groupes/:groupeProps/:participationProps',
        name: 'participation',
        component: () => /* webpackPrefetch: true */ import('../views/Participation.vue'),
        props: true
      }
    ]
  },

  {
    path: '/test',
    component: () => import('../views/test.vue')
  },
  {
    path: '/test2',
    component: () => import('../views/test2.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

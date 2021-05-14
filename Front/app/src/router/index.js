import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import Home from '@/views/Home.vue'
import MainNav from '@/components/MainNav.vue'
import Footer from '@/views/Footer.vue'

function lazyLoad(view){
  return() => import(/* webpackPrefetch: true */ /* webpackPreload: true */`@/views/${view}.vue`)
}

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
        component: lazyLoad('Profil'),
      },

      {
        path: 'profil/modification',
        component: lazyLoad('ProfilModif'),
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
        component: lazyLoad('Groupe'),
        props: true,
        children: [
          { path: 'creation', name: 'creationGroupe' },
          { 
            path: ':groupeProps',
            name: 'groupeProps',
            children: [
              { path: 'creation', name: 'creationParticipation' },
            ]
          },
          {
            path: ':groupeProps/member',
            name: 'groupeMember',
            component: lazyLoad('Member'),
            props: true
          },
          {
            path: ':groupeProps/commSignaled',
            name: 'groupeCommSignaled',
            component: lazyLoad('GroupeCommSignaled'),
            props: true
          }
        ]
      },
      {
        path: 'groupes/:groupeProps/:participationProps',
        name: 'participation',
        component: lazyLoad('Participation'),
        props: true
      },
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

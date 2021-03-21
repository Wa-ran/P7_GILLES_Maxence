import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import User from '@/views/User.vue'
import MainNav from '@/components/MainNav.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',
  component: Accueil,
  children: [
    {path: 'login'},
    {path: 'signup'},
  ]},
  
  {path: '/user',
  components: {
    default: User,
    MainNav: MainNav
  },
  children: [
    {path: 'profil',
    component: () => import('../views/Profil.vue')},
    {path: 'profil/modif',
    component: () => import('../views/ModifProfil.vue'),
    children: [
      {path: 'infos'},
      {path: 'mail'},
      {path: 'pass'}
    ]}
  ]}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

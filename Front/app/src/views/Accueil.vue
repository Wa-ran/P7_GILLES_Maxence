<template>
  <div class="acceuil">
    <MainNav/>
    <img alt="Logo Groupomania" src="../assets/Groupomania/icon.svg">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App !"/> -->
    <transition name="fade">
      <router-view class="view"/>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import MainNav from '@/components/MainNav.vue'

export default {
  name: 'Home',
  components: {
    MainNav
  }
}
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity .25s;
}
.fade-enter-active {
  transition: opacity .4s .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="home">
    <MainNav/>
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App !"/> -->
    <router-view/>
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

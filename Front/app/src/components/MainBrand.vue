<template>
  <mdb-navbar-brand class="rounded transparent">
    <router-link to="/">
      <img class="rounded lighten-4 logo" color="red" alt="Accueil" src="../assets/Groupomania/icon-left-black-rsz.svg">
    </router-link>
  </mdb-navbar-brand>
</template>

<script>
import { mdbNavbarBrand } from 'mdbvue';

export default {
  name: "MainBrand",
  components: {
    mdbNavbarBrand
  }
}
</script>

<style lang="scss">
.logo {
  max-height: 50px;
}
</style>
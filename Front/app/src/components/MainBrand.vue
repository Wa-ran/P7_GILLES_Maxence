<template>
  <mdb-navbar-brand class="red lighten-4">
    <router-link to="/">
      <img class="lighten-4 logo" color="red" alt="Accueil" src="../assets/Groupomania/icon-left-black-rsz.svg">
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
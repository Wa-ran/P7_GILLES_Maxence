<template>
  <mdb-navbar-brand class="rounded logo">
    <router-link to="/">
      <img class="rounded" alt="Accueil" src="../assets/Groupomania/icon-left-dark.svg">
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
* {
  width: fit-content;
  max-width: 100%;
  margin: 0;
}
</style>
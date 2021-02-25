<template>
  <mdb-navbar-brand class="rounded transparent logo">
    <router-link to="/">
      <img class="rounded" color="red" alt="Accueil" src="../assets/Groupomania/icon-left-dark.svg">
    </router-link>
  </mdb-navbar-brand>
</template>

<script>
import { mdbNavbarBrand } from 'mdbvue';

export default {
  name: "MainBrand",
  components: {
    mdbNavbarBrand
  },
  props: {
    version: {
      required: false,
      default: 'dark',
      validator: function (value) {
        // The value must match one of these strings
        return ['dark', 'light', 'red'].indexOf(value) !== -1
      }
    }
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
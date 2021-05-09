<template>
  <h1 class="rounded">
    <router-link :to="brandPath">
      <img class="mx-2 rounded" alt="Accueil de Groupomania" src="../assets/Groupomania/icon-left-dark.svg">
    </router-link>
  </h1>
</template>

<script>
export default {
  name: "MainBrand",
  computed: {
    brandPath() {
      return this.$route.path.indexOf('home') > -1 ? '/home' : '/'
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 80%;
  max-height: 8vh;
}
h1 {
  display: block;
}
@media (max-width: 575px) {
  a {
    display: flex;
  }
}
</style>
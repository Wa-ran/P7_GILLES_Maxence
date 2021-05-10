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
  max-width: 85%;
  max-height: 8vh;
}
h1 {
  display: block;
}
@media (max-width: 575px) {
  header h1 {
    margin-top: 0.5rem;
    & a {
      display: flex;
      & img {
        max-width: 75%;
      }
    }
  }
}
</style>
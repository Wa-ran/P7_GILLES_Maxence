<template>
  <div class="rounded">
    <router-link :to="brandPath">
      <img class="mx-2 rounded" alt="Accueil" src="../assets/Groupomania/icon-left-dark.svg">
    </router-link>
  </div>
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
@media (max-width: 575px) {
  a {
    display: flex;
  }
}
</style>
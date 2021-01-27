<template>
  <div class="accueil">
    <mdb-card class="m-2 mt-4 pb-2">
      <mdb-card class="red lighten-4 m-3 mt-n3">
        <MainBrand/>
      </mdb-card>
      <div class="d-flex px-2 pt-1">
        <MainButton
          :path="'log'"
          :text="'Connection'"
        />
        <MainButton
          :path="'sign'"
          :text="'M\'inscrire'"
        />
      </div>
      <transition name="fade">
        <router-view/>
      </transition>
    </mdb-card>
    <img v-if="this.$route.path === '/'" alt="Logo Groupomania" src="../assets/Groupomania/icon.svg">
  </div>
</template>


<script>
import { mdbCard } from 'mdbvue';

import MainButton from "@/components/MainButton.vue"
import MainBrand from "@/components/MainBrand.vue"

export default {
  components: {
    MainButton,
    MainBrand,
    mdbCard
  }
}
</script>

<style lang="scss">

.fade-leave-active {
  transition: opacity .1s;
}
.fade-enter-active {
  transition: opacity .4s .125s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

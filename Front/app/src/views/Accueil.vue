<template>
  <div class="accueil">
    <mdb-card class="m-2 mt-4 pb-2 red lighten-5">
      <mdb-card v-mdb-waves="{ dark: true }" class="red lighten-4 m-3 mt-n3 onFocus">
        <MainBrand/>
      </mdb-card>
      <div class="d-flex justify-content-between px-3 pt-1">
        <MainButton
          :path="'/log'"
          :text="'Connection'"
          :currentPath=$route.path
          class="gmp-btn-accueil"
        />
        <MainButton
          :path="'/sign'"
          :text="'M\'inscrire'"
          :currentPath=$route.path
          class="gmp-btn-accueil"
        />
      </div>
      <card-slide>
        <router-view :currentPath=$route.path :key=$route.path></router-view>
      </card-slide>
    </mdb-card>
    <!-- <img v-if="this.$route.path === '/'" alt="Logo Groupomania" src="../assets/Groupomania/icon.svg"> -->
  </div>
</template>


<script>
import { mdbCard, mdbWaves } from 'mdbvue';

import MainButton from "@/components/MainButton.vue"
import MainBrand from "@/components/MainBrand.vue"
import cardSlide from '@/components/cardSlide';

export default {
  components: {
    mdbCard,
    MainButton,
    MainBrand,
    cardSlide
  },
  directives: {
    mdbWaves
  }
}
</script>

<style lang="scss">
.gmp-btn-accueil {
  min-width: 46%;
}
</style>

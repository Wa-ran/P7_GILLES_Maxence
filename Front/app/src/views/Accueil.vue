<template>
  <div class="accueil">
    <mdb-card class="m-2 mt-4 pb-2 red lighten-5">
      <mdb-card v-mdb-waves="{ dark: true }" class="red lighten-4 m-3 mt-n3 onFocus">
        <MainBrand/>
      </mdb-card>
      <div class="d-flex justify-content-between px-3 pt-1">
        <MainButton
          :path="'/login'"
          :text="'Connection'"
          :activePath=$route.path
          class="btn-accueil"
        />
        <MainButton
          :path="'/signup'"
          :text="'M\'inscrire'"
          :activePath=$route.path
          class="btn-accueil"
        />
      </div>
      <card-slide>
        <main-form v-if="this.$route.path !== '/'">
          <component :is='this.formComponent' ref="formComp"></component>
        </main-form>
      </card-slide>
    </mdb-card>
    <!-- <img v-if="this.$route.path === '/'" alt="Logo Groupomania" src="../assets/Groupomania/icon.svg"> -->
  </div>
</template>


<script>
import { mdbCard, mdbWaves } from 'mdbvue';

import MainButton from "@/components/MainButton.vue"
import MainBrand from "@/components/MainBrand.vue"
import CardSlide from '@/components/CardSlide';
import MainForm from '@/components/MainForm';

import login from '@/components/forms/login';
const signup = () => ({
  component: import('@/components/forms/signup')
})


export default {
  components: {
    mdbCard,
    MainButton,
    MainBrand,
    CardSlide,
    MainForm,
    login,
    signup
  },
  directives: {
    mdbWaves
  },
  computed: {
    formComponent() {
      return this.$route.path.replace('/', '')
    }
  },
  updated() {
    setTimeout(() => {
      document.querySelector('[autofocus]').focus();
    }, 300)
  }
}
</script>

<style lang="scss">
.btn-accueil {
  min-width: 46%;
}
</style>

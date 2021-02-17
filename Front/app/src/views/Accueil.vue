<template>
  <div class="accueil">
    <mdb-card class="m-2 mt-4 pb-2 gpm-base">
      <mdb-card v-mdb-waves="{ dark: true }" class="m-3 mt-n3 gpm-default">
        <MainBrand/>
      </mdb-card>
      <div class="d-flex justify-content-between px-3 pt-1">
        <MainButton
          :path="'/login'"
          :text="'Connection'"
          :activePath=$route.path
          class="btn-accueil gpm-shadow-focus gpm-default"
        />
        <MainButton
          :path="'/signup'"
          :text="'M\'inscrire'"
          :activePath=$route.path
          class="btn-accueil gpm-shadow-focus gpm-default"
        />
      </div>
      <card-slide>
        <main-form v-if="this.$route.path !== '/'" class="mt-n2 mb-3 mx-3 p-3 white gpm-shadow-focus gpm-default-light">
          <component :is='this.formComponent' ref="formComp"></component>
        </main-form>
      </card-slide>
    </mdb-card>
    <!-- <img v-if="this.$route.path === '/'" alt="Logo Groupomania" src="../assets/Groupomania/icon.svg"> -->
  </div>
</template>


<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbWaves from 'mdbvue/lib/components/mdbWaves';

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

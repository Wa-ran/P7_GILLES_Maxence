<template>
  <div>
    <mdb-card class="accueil m-2 mt-4 pb-2 gpm-base gpm-big-shadow">
      <mdb-card v-mdb-waves="{ dark: true }" class="m-3 mt-n3 gpm-grey-light gpm-attention-active">
        <MainBrand class="mx-auto my-2"/>
      </mdb-card>
      <div class="d-flex justify-content-between px-3 pt-1 w-100">
        <ButtonDoc
          @action="$router.push('/login')"
          :path="'/login'"
          :text="'Connection'"
          :activePath=$route.path
          :defaultColor="'gpm-grey-light gpm-lecture-active'"
          :activeColor="'gpm-lecture'"
          class="btn-accueil gpm-shadow-focus"
        />
        <ButtonDoc
          @action="$router.push('/signup')"
          :path="'/signup'"
          :text="'M\'inscrire'"
          :activePath=$route.path
          :defaultColor="'gpm-grey-light gpm-lecture-active'"
          :activeColor="'gpm-lecture'"
          class="btn-accueil gpm-shadow-focus"
        />
      </div>
      <AnimSlideDrop>
        <main-form
        v-if="this.$route.path !== '/'"
        :key="this.formComponent"
        :submitButton="'Envoyer'"
        class="w-auto mt-n2 mb-3 mx-3 p-3 gpm-shadow-focus gpm-lecture">
          <component :is='this.formComponent'></component>
        </main-form>
      </AnimSlideDrop>
    </mdb-card>
  </div>
</template>


<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbWaves from 'mdbvue/lib/components/mdbWaves';

import ButtonDoc from "@/components/ButtonDoc.vue"
import MainBrand from "@/components/MainBrand.vue"
import AnimSlideDrop from '@/components/AnimSlideDrop';
import MainForm from '@/components/MainForm';

import login from '@/views/forms/login';
const signup = () => ({
  component: import('@/views/forms/signup')
});

export default {
  components: {
    mdbCard,
    ButtonDoc,
    MainBrand,
    AnimSlideDrop,
    MainForm,
    login,
    signup
  },
  directives: {
    mdbWaves
  },
  computed: {
    formComponent() {
      let str = this.$route.path;
      return str.substring(str.lastIndexOf('/')+1)
    }
  },
  mounted() {
    window.sessionStorage.clear()
  },
  updated() {
    window.sessionStorage.clear();
    setTimeout(() => {
      document.querySelector('[autofocus]').focus();
    }, 300)
  }
}
</script>

<style lang="scss">
.accueil {
  max-width: 500px;
}
.btn-accueil {
  min-width: 46%;
}
</style>

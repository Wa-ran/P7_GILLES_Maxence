<template>
  <div>
    <mdb-card class="accueil m-2 mt-4 pb-2 gpm-base gpm-big-shadow">
      <mdb-card v-mdb-waves="{ dark: true }" class="m-3 mt-n3 gpm-default">
        <MainBrand class="mx-auto my-2"/>
      </mdb-card>
      <div class="d-flex justify-content-between px-3 pt-1 w-100">
        <MainButton
          @action="$router.push('/login')"
          :path="'/login'"
          :text="'Connection'"
          :activePath=$route.path
          class="btn-accueil gpm-shadow-focus gpm-default"
        />
        <MainButton
          @action="$router.push('/signup')"
          :path="'/signup'"
          :text="'M\'inscrire'"
          :activePath=$route.path
          class="btn-accueil gpm-shadow-focus gpm-default"
        />
      </div>
      <card-slide>
        <main-form
        v-if="this.$route.path !== '/'"
        :key="this.formComponent"
        :submitButton="'Envoyer'"
        :submitPath="'login'"
        class="w-auto mt-n2 mb-3 mx-3 p-3 white gpm-shadow-focus gpm-default-light">
          <component :is='this.formComponent'></component>
        </main-form>
      </card-slide>
    </mdb-card>
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
});


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
  // methods: {
  //   checkForm() {
  //     let form = document.querySelector('form');
  //     let data = {};
  //     form.classList.add('was-validated');
  //     if (form.checkValidity()) {
  //       document.querySelectorAll('[required]').forEach(function(elem) {
  //         return data[elem.name] = elem.value;
  //       });
  //       this.$store.dispatch('postForm', data)
  //       .then(() => this.$router.push('user'));
  //     }
  //   }
  // },
  updated() {
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

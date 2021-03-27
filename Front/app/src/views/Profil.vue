<template>
  <card-slide>
    <mdb-card class="w-100 mt-n2 p-4 white gpm-shadow-focus gpm-lecture">
        <div class="w-100">
          <wrap withComp="BlockSlide" class="w-100">

            <PitiButton
            @action="$router.push('/home')"
            :text="'Retour'"
            class="my-auto ml-3 gpm-attention gpm-warning-active"/>

            <div class="title my-3">
              Vos informations personnelles :
            </div>
            <div class="w-100 pl-2 d-flex" v-for="(item, index) in infos" :key="index">
              <div class="w-50 text-left">
                Votre {{ index }} : 
              </div>
              <div class="w-50 text-left font-weight-bold">
                {{ item }}
              </div>
            </div>
            <PitiButton
            @action="$router.push('profil/modif/infos')"
            :text="'Modifier'"
            class="mt-3 mx-auto gpm-attention gpm-warning-active"
            />
          </wrap>
        </div>

        <div class="w-100">
          <wrap withComp="BlockSlide" class="w-100">
            <div class="title my-3">
              Votre mail :
            </div>
            <div class="pl-2 w-100 d-flex justify-content-between">
              <div class="font-weight-bold">{{ mail }}</div>
              <PitiButton
              @action="$router.push('profil/modif/mail')"
              :text="'Modifier'"
              class="my-auto ml-3 gpm-attention gpm-warning-active"
              />
            </div>
          </wrap>
        </div>

        <div class="w-100">
          <hr class="my-4 gpm-base w-100">
          <wrap withComp="BlockSlide" class="w-100">
            <PitiButton
            @action="$router.push('profil/modif/pass')"
            :text="'Modifier votre mot de passe ?'"
            class="my-auto ml-3 gpm-attention gpm-warning-active"
            />
          </wrap>
        </div>
    </mdb-card>
  </card-slide>
</template>

<script>
import Wrap from '@/components/Wrap';
import CardSlide from '@/components/CardSlide';

import mdbCard from 'mdbvue/lib/components/mdbCard';
import PitiButton from '@/components/PitiButton.vue';

export default {
  name: 'modifProfil',
  components: {
    Wrap,
    CardSlide,
    mdbCard,
    PitiButton
  },
  computed: {
    mail() { return this.$store.state.profil.email },
    infos() {
      let infos = { ...this.$store.state.profil };
      delete infos.email;
      return infos
    }
  }
}
</script>
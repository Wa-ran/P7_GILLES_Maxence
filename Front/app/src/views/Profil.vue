<template>
  <card-slide>
    <mdb-card class="w-100 mt-n2 p-4 white gpm-shadow-focus gpm-default-light">
        <div class="w-100">
          <wrap withComp="BlockSlide" class="w-100">
            <div class="title">
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
            class="mt-3 mx-auto gpm-prior-light-ultra"
            />
          </wrap>
        </div>

        <div class="w-100">
          <wrap withComp="BlockSlide" class="w-100">
            <div class="title">
              Votre mail :
            </div>
            <div class="pl-2 w-100 d-flex justify-content-between">
              <div class="font-weight-bold">{{ mail }}</div>
              <PitiButton
              @action="$router.push('profil/modif/mail')"
              :text="'Modifier'"
              class="my-auto ml-3 gpm-prior-light-ultra"
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
            class="my-auto ml-3 gpm-prior-light-ultra"
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
<template>
  <div class="m-3">
    <TitleDoc
    :color="'gpm-lecture'">
      <h2 class="h4 m-1">
        Profil
      </h2>
    </TitleDoc>
    <AnimSlideDrop>
      <mdb-card class="w-100 pt-4 p-3 white gpm-shadow-focus gpm-lecture">
        <div class="w-100">
          <wrap withComp="AnimBlockSlide" class="w-100">

            <div class="mb-3">
              <h3 class="h5 text-left">Vos informations personnelles :</h3>
            </div>
            <div class="w-100 pl-2 d-flex" v-for="(item, index) in infos" :key="index">
              <div class="w-50 text-left btn-text-normal">
                {{ index }} : 
              </div>
              <div class="w-50 text-left font-weight-bold">
                {{ item }}
              </div>
            </div>
            <ButtonPiti
            @action="$router.push('profil/modification/infos')"
            :text="'Modifier'"
            class="mt-3 ml-auto gpm-attention gpm-warning-active"
            />
          </wrap>
        </div>

        <div class="w-100">
          <wrap withComp="AnimBlockSlide" class="w-100">
            <hr class="my-3 gpm-base w-100">
            <div class="my-3">
              <h3 class="h5 text-left">Votre mail :</h3>
            </div>
            <div class="pl-2 w-100 d-flex justify-content-between">
              <div class="font-weight-bold">{{ mail }}</div>
              <ButtonPiti
              @action="$router.push('profil/modification/mail')"
              :text="'Modifier'"
              class="my-auto ml-3 gpm-attention gpm-warning-active"
              />
            </div>
          </wrap>
        </div>

        <div class="w-100">
          <wrap withComp="AnimBlockSlide" class="w-100">
            <hr class="my-3 gpm-base w-100">
            <ButtonPiti
            @action="$router.push('profil/modification/pass')"
            :text="'Modifier votre mot de passe ?'"
            class="w-100 gpm-attention gpm-warning-active"
            />
          </wrap>
        </div>
      </mdb-card>
    </AnimSlideDrop>
  </div>
</template>

<script>
import Wrap from '@/components/Wrap';
import AnimSlideDrop from '@/components/AnimSlideDrop';
import TitleDoc from '@/components/TitleDoc.vue';
import ButtonPiti from '@/components/ButtonPiti.vue';

import mdbCard from 'mdbvue/lib/components/mdbCard';

export default {
  name: 'Profil',
  components: {
    Wrap,
    AnimSlideDrop,
    mdbCard,
    ButtonPiti,
    TitleDoc
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
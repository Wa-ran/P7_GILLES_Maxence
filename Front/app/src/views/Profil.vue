<template>
  <DocCard :color="'gpm-default'">
    <template #title>
      <h2 class="h4 m-1">
        Profil
      </h2>
    </template>

    <template>
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
          class="mt-3 ml-auto gpm-attention gpm-warning-active"/>
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
            class="my-auto ml-3 gpm-attention gpm-warning-active"/>
          </div>
        </wrap>
      </div>

      <div class="w-100">
        <wrap withComp="AnimBlockSlide" class="w-100">
          <hr class="my-3 gpm-base w-100">
          <div class="w-100 d-flex">
            <div class="my-3 w-100">
              <h3 class="h5 text-left">Photo de Profil :</h3>
            </div>
            <div class="w-50 d-flex flex-column">
              <Avatar :mini="false"
              class="w-100 rounded"/>
              <ButtonPiti
              @action="$router.push('profil/modification/avatar')"
              :text="'Modifier'"
              class="mt-n1 w-100 gpm-attention gpm-warning-active"/>
            </div>
          </div> 
        </wrap>
      </div>

      <div class="w-100">
        <wrap withComp="AnimBlockSlide" class="w-100">
          <hr class="my-3 gpm-base w-100">
          <ButtonPiti
          @action="$router.push('profil/modification/pass')"
          :text="'Modifier votre mot de passe ?'"
          class="w-100 gpm-attention gpm-warning-active"/>
        </wrap>
      </div>
    </template>
  </DocCard>
</template>

<script>
import Wrap from '@/components/Wrap';
import DocCard from '@/components/DocCard.vue';
import ButtonPiti from '@/components/ButtonPiti.vue';

export default {
  name: 'Profil',
  components: {
    Wrap,
    ButtonPiti,
    DocCard
  },
  computed: {
    mail() { return this.$store.state.profil.email },
    infos() {
      let infos = { ...this.$store.state.profil };
      delete infos.email;
      delete infos.id;
      return infos
    }
  }
}
</script>
<template>
  <wrap withComp="BlockSlide">
    <div v-for="(item, index) in profil" :key="index"
    class="w-100">
      <mdb-input
      class="d-flex input-group gpm-mist" 
      :id=index :name=index :label=index :value=item
      icon="user" type="text" 
      validate required autofocus lazy
      invalidFeedback="Non rempli"/>
    </div>

    <SelectDepts/>

    <hr class="my-4 mb-3 gpm-base w-100">
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="email" label="Email" name="email" :value='this.$store.state.profil.email'
      icon="envelope" type="email" 
      validate required autofocus lazy
      invalidFeedback="Non rempli"/>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="password" name="password" label="Mot de Passe"
      icon="lock-open" type="password" 
      validate required lazy
      invalidFeedback="Non rempli"/>
  </wrap>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';

import SelectDepts from '@/components/SelectDepts';
import Wrap from '@/components/Wrap';

export default {
  name: 'infos',
  components: {
    mdbInput,
    SelectDepts,
    Wrap
  },
  computed: {
    profil() {
      let profil = {...this.$store.state.profil};
      delete profil.departement;
      delete profil.email;
      delete profil.password;
      return profil
    }
  },
  mounted() {
    this.$store.dispatch('chooseSubmit', { backFct: 'putInfos', submitPath: '/user/profil' });
  }
}
</script>
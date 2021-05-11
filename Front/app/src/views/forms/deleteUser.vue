<template>
  <wrap withComp="AnimBlockSlide">
    <h3 class="h5 mb-4">
      Je veux supprimer mon compte
    </h3>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="email" label="Votre email actuel" name="email" :value='this.$store.state.profil.email'
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

import Wrap from '@/components/Wrap';

export default {
  name: 'deleteUser',
  components: {
    mdbInput,
    Wrap
  },
  async created() {
    await this.$store.dispatch('chooseSubmit', { backFct: 'deleteUser', submitPath: '/' });
  },
}
</script>
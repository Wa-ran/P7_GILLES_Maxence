<template>
  <wrap withComp="AnimBlockSlide">

    <h3 class="h5 mb-4">
      Modifier mon mot de passe
    </h3>

    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="passwordNew" name="passwordNew" label="Nouveau mot de passe"
      icon="lock-open" type="password" 
      validate required lazy
      invalidFeedback="Non rempli"
      @change.native="inputConf($event, 'password', true)"/>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="passwordNewConf" name="passwordNewConf" label="Veuillez confirmer"
      icon="lock-open" type="password" 
      validate required
      invalidFeedback="Non rempli"
      @change.native="inputConf($event, 'passwordNew')"/>

    <hr class="my-4 mb-3 gpm-base w-100">
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="email" label="Votre email" name="email" :value='this.$store.state.profil.email'
      icon="envelope" type="email" 
      validate required autofocus lazy
      invalidFeedback="Non rempli"/>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="password" name="password" label="Votre ancien mot de passe"
      icon="lock" type="password" 
      validate required lazy
      invalidFeedback="Non rempli"
      @change.native="inputConf($event, 'passwordNew', true)"/>
  </wrap>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';

import Wrap from '@/components/Wrap';

import inputConf from '@/mixins/inputConf';

export default {
  name: 'pass',
  components: {
    mdbInput,
    Wrap
  },
  async created() {
    await this.$store.dispatch('chooseSubmit', { backFct: 'putPass', submitPath: '/' });
  },
  mixins: [ inputConf ]
}
</script>
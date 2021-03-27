<template>
  <wrap withComp="BlockSlide">
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="newEmail" label="Nouvel email" name="newEmail"
      icon="envelope-open" type="email" 
      validate required autofocus lazy
      invalidFeedback="Non rempli"
      @change.native="inputConf($event, 'email', true)"/>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="newEmailConf" name="newEmailConf" label="Confirmez votre nouvel email"
      icon="envelope-open" type="email" 
      validate required lazy
      invalidFeedback="Non rempli"
      @change.native="inputConf($event, 'newEmail')"/>

    <hr class="my-4 mb-3 gpm-base w-100">
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="email" label="Votre email actuel" name="email" :value='this.$store.state.profil.email'
      icon="envelope" type="email" 
      validate required autofocus lazy
      invalidFeedback="Non rempli"
      @change.native="inputConf($event, 'newEmail', true)"/>
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

import inputConf from '@/mixins/inputConf';

export default {
  name: 'mail',
  components: {
    mdbInput,
    Wrap
  },
  mounted() {
    this.$store.dispatch('chooseSubmit', { backFct: 'putEmail', submitPath: '/home/profil' });
  },
  mixins: [ inputConf ]
}
</script>
<template>
  <wrap withComp="AnimBlockSlide">

    <div class="d-flex justify-content-between has-icon mb-3 mt-0">
      <mdb-icon far icon="user" size="2x" class="mr-3 my-0 prefix"/>
      <mdb-input
        class="d-flex pr-2 my-0 input-group gpm-mist" 
        id="nom" name="nom" label="Nom"
        type="text" 
        validate required lazy 
        autofocus
        invalidFeedback="Non rempli"/>
      <mdb-input
        class="d-flex my-0 input-group gpm-mist" 
        id="prenom" name="prenom" label="Prénom"
        type="text" 
        validate required lazy
        invalidFeedback="Non rempli"/>
    </div>

    <SelectDepts/>

    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="email" name="email" label="Email"
      icon="envelope-open" type="email" 
      validate required lazy
      invalidFeedback="Non rempli"/>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="emailConf" name="emailConf" label="Confirmez votre Email"
      icon="envelope" type="email" 
      validate required
      invalidFeedback="Non rempli"
      @change.native="inputConf($event, 'email')"/>

    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="password" name="password" label="Mot de Passe"
      icon="lock-open" type="password" 
      validate required lazy
      invalidFeedback="Non rempli"/>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="passwordConf" name="passwordConf" label="Confirmez votre mot de Passe"
      icon="lock" type="password" 
      validate required
      invalidFeedback="Non rempli"
      @change.native="inputConf($event, 'password')"/>
  </wrap>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';
import mdbIcon from 'mdbvue/lib/components/mdbIcon';

import SelectDepts from '@/components/SelectDepts';
import Wrap from '@/components/Wrap';

import inputConf from '@/mixins/inputConf'

export default {
  name: 'signup',
  components : {
    mdbInput,
    mdbIcon,
    SelectDepts,
    Wrap
  },
  mounted() {
    this.$store.dispatch('chooseSubmit', { backFct: 'postSignup', submitPath: 'login' })
  },
  mixins: [ inputConf ]
}
</script>
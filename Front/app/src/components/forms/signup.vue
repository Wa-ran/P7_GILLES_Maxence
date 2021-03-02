<template>
  <wrap withComp="BlockSlide">

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

    <div class="d-flex has-icon w-100 mt-4 mb-3">
      <mdb-icon far icon="address-card" size="2x" class="my-auto prefix"/>
      <select 
      name="departement"
      class="custom-select" @change="styleBold"
      aria-labelledby="selectLabel" required>
        <option selected disabled value="" id="selectLabel">Sélectionnez votre service</option>
        <option v-for="(dept, index) in deptsList" 
        :value="index" :key="index">
          {{ dept }}
        </option>
      </select>
    </div>

    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="email" name="email" label="Email"
      icon="envelope-open" type="email" 
      validate required lazy
      :invalidFeedback="this.emailError"/>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="emailConf" name="emailConf" label="Confirmez votre Email"
      icon="envelope" type="email" 
      validate required
      :invalidFeedback="this.emailConfError"
      @change.native="conf($event, 'email')"/>

    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="password" name="password" label="Mot de Passe"
      icon="lock-open" type="password" 
      validate required lazy
      :invalidFeedback="this.passwordError"
      @change.native="check($event.target)"/>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="passwordConf" name="passwordConf" label="Confirmez votre mot de Passe"
      icon="lock" type="password" 
      validate required
      :invalidFeedback="this.passwordConfError"
      @change.native="conf($event, 'password'); check($event.target)"/>
  </wrap>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';
import mdbIcon from 'mdbvue/lib/components/mdbIcon';
import Wrap from '@/components/Wrap';

import checkPassword from '@/mixins/checkPassword'

export default {
  name: 'signup',
  components : {
    mdbInput,
    mdbIcon,
    Wrap
  },
  data() {
    return {
      emailError: 'Non rempli',
      emailConfError: "Non rempli",
      passwordError: 'Non rempli',
      passwordConfError: "Non rempli"
    }
  },
  computed: {
    deptsList() {
      return this.$store.state.depts
    }
  },
  methods: {
    styleBold($event) { // JS car css ne suffit pas pour changer le style de select
      $event.target.style.fontWeight = 'bold';
    },
    conf(event, cible) {
      let error = "Ne correspond pas";
      let model = document.getElementById(cible);
      if (event.target.value !== model.value) {
        event.target.setCustomValidity(error);
        model.setCustomValidity(error);
        this[event.target.id + 'Error'] = this[model.id + 'Error'] = error;
      }
      else {
        event.target.setCustomValidity("");
        model.setCustomValidity("");
      }
    },
    check(input) {
      let custError = this.checkPassword(input.value);
      input.setCustomValidity(custError);
      this[input.id + 'Error'] = custError;
    }
  },
  created() {
    this.$store.dispatch('getDepts')
  },
  mixins: [ checkPassword ]
}
</script>
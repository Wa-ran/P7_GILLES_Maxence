<template>
  <wrap withComp="BlockSlide">

    <div class="d-flex justify-content-between md-form my-3">
      <mdb-icon far icon="user" size="2x" class="mr-2 prefix"/>
      <mdb-input
        class="d-flex pr-2 my-0 input-group" 
        id="nom" name="nom" label="Nom" v-model="inputs.nom.value"
        type="text" 
        validate required lazy 
        autofocus
        invalidFeedback="Non rempli"/>
      <mdb-input
        class="d-flex my-0 input-group" 
        id="prenom" name="prenom" label="Prénom" v-model="inputs.prenom.value" 
        type="text" 
        validate required lazy
        invalidFeedback="Non rempli"/>
    </div>

    <div class="d-flex md-form mt-4">
      <mdb-icon far icon="address-card" size="2x" class="mr-3 prefix"/>
      <select 
      name="departement" v-model="inputs.departement.value"
      class="custom-select" aria-labelledby="selectLabel" required>
        <option selected disabled value="" id="selectLabel">Sélectionnez votre service</option>
        <option v-for="option in optionsList" 
        :value="option.value" :key="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <mdb-input
      class="d-flex input-group" 
      id="email" name="email" label="Email" v-model="inputs.email.value" 
      icon="envelope-open" type="email" 
      validate required lazy
      invalidFeedback="Non rempli"/>
    <mdb-input
      class="d-flex input-group" 
      id="emailConf" name="emailConf" label="Confirmez votre Email" v-model="inputs.emailConf.value" 
      icon="envelope" type="text" 
      validate required
      invalidFeedback="Non rempli"/>

    <mdb-input
      class="d-flex input-group" 
      id="password" name="password" label="Mot de Passe" v-model="inputs.password.value" 
      icon="lock-open" type="password" 
      validate required lazy
      invalidFeedback="Non rempli"/>
    <mdb-input
      class="d-flex input-group" 
      id="passwordConf" name="passwordConf" label="Confirmez votre mot de Passe" v-model="inputs.passwordConf.value" 
      icon="lock" type="password" 
      required validate
      invalidFeedback="Non rempli"/>
  </wrap>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';
import mdbIcon from 'mdbvue/lib/components/mdbIcon';
import Wrap from '@/components/Wrap';

export default {
  name: 'signup',
  components : {
    mdbInput,
    mdbIcon,
    Wrap
  },
  data() {
    return {
      inputs: {
        nom: {
          value: '',
          valid: false
        },
        prenom: {
          value: '',
          valid: false
        },
        departement: {
          value: '',
          valid: false
        },
        email: {
          value: '',
          valid: false
        },
        emailConf: {
          value: '',
          valid: false
        },
        password: {
          value: '',
          valid: false
        },
        passwordConf: {
          value: '',
          valid: false
        }
      },
      valid: true
    }
  },
  computed: {
    optionsList() {
      return [
        {text: 'Direction', value:'1'},
        {text: 'Logistique', value:'2'},
        {text: 'Marketing', value:'3'},
        {text: 'Ressources Humaines', value:'4'},
        {text: 'Service Technique', value:'5'}
      ]
    },
    isValid() {
      let valid;
      for (let input in this.inputs) {
        if (!input.valid) {
          valid = false
          break
        }
        else {
          return valid = true
        }
      }
      return valid;
    }
  },
  methods: {
    validForm () {
      for (let input in this.inputs) {
        if (document.getElementById(input).validityState.valid) {
          input.valid = true
        }
      }
    }
  },
}
</script>

<style lang="scss">
.md-form.prefix {
  position: relative !important;
  margin-right: 1rem;
}
</style>
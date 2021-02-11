<template>
  <wrap withComp="BlockSlide">
    <div class="d-flex justify-content-between primaryColorFocusW my-3">
      <mdb-input class="d-flex pr-2 my-0" id="Nom" label="Nom" v-model="nom" icon="user" group type="text" validate required autofocus ref="autofocus" lazy/>
      <mdb-input class="d-flex my-0" id="Prenom" label="Prénom" v-model="prenom" group type="text" validate required lazy/>
    </div>
    <div class="d-flex primaryColorFocusW">
      <mdb-icon far icon="address-card" size="2x" class="mr-3" required/>
      <select @keydown.enter="isSelected" v-model="departement" class="custom-select" aria-labelledby="selectLabel">
        <option selected disabled value="null" id="selectLabel">Sélectionnez votre service</option>
        <option value="1">Logistique</option>
        <option value="2">Marketing</option>
        <option value="3">Ressources Humaines</option>
        <option value="4">Direction</option>
        <option value="5">Service Technique</option>
      </select>
    </div>
    <mdb-input class="d-flex" id="Email" label="Email" name="Email" v-model="email" icon="envelope-open" group type="email" validate required lazy/>
    <mdb-input class="d-flex" id="emailConf" label="Confirmez votre Email" v-model="emailConf" icon="envelope" group type="text" validate required/>
    <mdb-input class="d-flex" id="password" label="Mot de Passe" v-model="password" icon="lock-open" group type="password" validate required lazy/>
    <mdb-input class="d-flex" id="passwordConf" label="Confirmez votre mot de Passe" v-model="passwordConf" icon="lock" group type="password" required validate/>
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
      nom: '',
      prenom: '',
      departement: null,
      email: '',
      emailConf: '',
      password: '',
      passwordConf: ''
    }
  }
}
</script>
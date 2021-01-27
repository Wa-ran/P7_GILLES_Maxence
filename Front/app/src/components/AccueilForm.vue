<template>
  <mdb-card-body class="pt-0">
    <form>
      <div class="black-text">
        <div class="d-flex">
          <mdb-input class="d-flex pr-2" label="Nom" icon="user" group type="text" validate error="wrong" success="right" autofocus v-on:keyup.enter="this.$nextSibling.focus()"/>
          <mdb-input class="d-flex" label="Prénom" group type="text" validate error="wrong" success="right"/>
        </div>
        <mdb-input class="d-flex" label="Mot de Passe" icon="lock" group type="password" validate/>
        <div v-if="this.$route.name === 'sign'">
          <mdb-input class="d-flex" label="Email" icon="envelope" group type="email" validate error="wrong" success="right"/>
          <mdb-input class="d-flex" label="Confirmez votre Email" icon="exclamation-triangle" group type="text" validate error="wrong" success="right"/>
        </div>
      </div>
      <div class="d-flex flex-center py-4 mt-3">
        <MainButton
          :path="'/Waran'"
          :text="'Envoyer'"
          type="submit"
        />
      </div>
    </form>
  </mdb-card-body>
</template>

<script>
import { mdbInput, mdbCardBody } from 'mdbvue';
import MainButton from './MainButton.vue';

export default {
  name: 'LogSignForm',
  components: {
    mdbInput,
    mdbCardBody,
    MainButton
  }
}
</script>

<style lang="scss">
.md-form input {
  box-shadow: none !important;
}
</style>
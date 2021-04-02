<template>
  <wrap withComp="AnimBlockSlide">
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="email" label="Email" name="email" :value='email'
      icon="envelope" type="email" 
      validate required autofocus lazy/>
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
  name: 'login',
  components: {
    mdbInput,
    Wrap
  },
  computed: {
    email() {
      let value;
      if (this.$store.state.profil.email) {
        value = this.$store.state.profil.email
      } else {
        value = null
      }
      return value
    }
  },
  async created() {
    await this.$store.dispatch('chooseSubmit', { backFct: 'postLogin', submitPath: 'home' })
  }
}
</script>
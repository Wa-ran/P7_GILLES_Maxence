<template>
  <wrap withComp="BlockSlide">
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="email" label="Email" name="email" :placeholder='email'
      icon="envelope" type="email" 
      validate required autofocus lazy/>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="password" label="Mot de passe" name="password"
      icon="lock" type="password" 
      validate required lazy/>
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
        value = ''
      }
      return value
      }
  }
}
</script>
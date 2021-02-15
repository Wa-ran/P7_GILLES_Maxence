<template>
  <wrap withComp="BlockSlide">
    <mdb-input
      class="d-flex" 
      id="email" label="Email" name="email" v-model="email" 
      icon="envelope" group type="email" 
      validate required autofocus lazy/>
    <mdb-input
      class="d-flex" 
      id="password" label="Mot de passe" name="password" v-model="password"
      icon="lock" group type="password" 
      validate lazy/>
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
  data() {
    return {
      email: '',
      password: ''
    }
  },
}
</script>
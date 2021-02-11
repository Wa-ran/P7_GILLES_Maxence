<template>
  <wrap withComp="BlockSlide">
    <mdb-input class="d-flex" label="Email" icon="envelope" group type="email" v-model="email" validate error="wrong" success="right" autofocus ref="autofocus" lazy/>
    <mdb-input class="d-flex" label="Mot de passe" icon="lock" group type="password" v-model="password" validate lazy/>
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
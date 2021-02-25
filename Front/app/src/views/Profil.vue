<template>
  <card-slide>
    <main-form
    :submitButton="'Modifier'" :onSubmitGo="''"
    class="w-100 mt-3 mx-3 p-3 white gpm-shadow-focus gpm-default-light">

      <wrap withComp="BlockSlide">
        <div v-for="(item, index) in profil" :key="index">
          <mdb-input
          class="d-flex input-group" 
          :id=item :name=item :label=item
          icon="user" type="text" 
          validate required lazy/>
        </div>
        <p>Celui-là vient du serveur :) >> <span style="color: red">{{ profil }}</span></p>
      </wrap>

    </main-form>
  </card-slide>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';

import CardSlide from '@/components/CardSlide';
import MainForm from '@/components/MainForm';
import Wrap from '@/components/Wrap';

export default {
  name: 'Profil',
  components: {
    mdbInput,
    CardSlide,
    MainForm,
    Wrap
  },
  computed: {
    profil() { return this.$store.state.profil }
  }
}
</script>

<style lang="scss">
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
  position: relative;
}
.fade-enter-active {
  transition: all 0.3s 0.35s;
}
.fade-leave-active {
  transition: all 0.1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
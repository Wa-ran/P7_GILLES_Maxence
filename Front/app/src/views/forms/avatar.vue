<template>
  <wrap withComp="AnimBlockSlide" class="d-flex flex-column">

    <h3 class="h5 mb-4">
      Changez d'avatar
    </h3>

    <Avatar :mini="false"
    class="mx-auto w-75 rounded-lg"
    :class="imgSelected ? 'filterBW' : ''"/>

    <InputFile @img_selected="$nextTick(square)"/>

    <hr class="my-4 mb-3 gpm-base w-100">
    <mdb-input
      class="d-flex input-group gpm-mist disabled" 
      id="email" label="Email" name="email" :value='this.$store.state.profil.email'
      icon="envelope" type="email" 
      validate required lazy
      invalidFeedback="Non rempli"/>
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
import InputFile from '@/components/InputFile.vue';
import Wrap from '@/components/Wrap';

export default {
  name: 'infos',
  components: {
    mdbInput,
    InputFile,
    Wrap
  },
  data() {
    return {
      imgSelected: false
    }
  },
  methods: {
    square() { // Pour rendre l'image carrée, comme elle sera transformée par le serveur
      this.imgSelected = true;
      let preview = document.getElementById('preview');
      let h = preview.scrollHeight;
      let w = preview.scrollWidth;
      if (w > h) preview.style.height = w + "px"
      else preview.style.width = h + "px"
      preview.classList.add('rounded-lg')
    }
  },
  async created() {
    await this.$store.dispatch('chooseSubmit', { backFct: 'postAvatar', submitPath: 'return' })
  },
  watch: {
    url() {
      setTimeout(() => {
        this.square()
      }, 500)
    }
  },
}
</script>

<style lang="scss" scoped>
.filterBW {
  filter: grayscale(100%);
}
</style>
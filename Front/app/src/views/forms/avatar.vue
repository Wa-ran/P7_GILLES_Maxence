<template>
  <wrap withComp="AnimBlockSlide" class="d-flex flex-column">

    <h3 class="h5 mb-4">
      Changez d'avatar
    </h3>

    <Avatar :mini="false"
    class="mx-auto w-75"
    :class="url ? 'filterBW' : ''"/>

    <div class="mt-3 w-100 custom-file">
      <input type="file" class="w-100 custom-file-input" id="avatar" name="avatar" 
      autofocus
      accept="image/jpg,image/jpeg,image/pdf,image/webp"
      @change="filePreview">
      <label class="w-100 text-left custom-file-label" for="avatar">
        {{ file ? file : 'Votre image' }}
      </label>
    </div>

    <img v-if="url" :src="url"
    id="preview" alt="Votre nouvelle PP."
    class="mx-auto mt-3 w-75 z-depth-1 avatar"/>

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
import Wrap from '@/components/Wrap';

export default {
  name: 'infos',
  components: {
    mdbInput,
    Wrap
  },
  data() {
    return {
      url: null,
      file: null
    }
  },
  methods: {
    filePreview(event) {
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
      let value = event.target.value;
      this.file = value.substring(value.lastIndexOf('\\') + 1);
    },
    square() { // Pour rendre l'image carrée, comme elle sera transformée par le serveur
      let preview = document.querySelector('#preview')
      let h = preview.scrollHeight;
      let w = preview.scrollWidth;
      if (w > h) preview.style.height = w + "px"
      else preview.style.width = h + "px"
    }
  },
  watch: {
    url() {
      setTimeout(() => {
        this.square()
      }, 500)
    }
  },
  async created() {
    await this.$store.dispatch('chooseSubmit', { backFct: 'postAvatar', submitPath: 'return' });
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 10%;
}

.filterBW {
  filter: grayscale(100%);
}
</style>
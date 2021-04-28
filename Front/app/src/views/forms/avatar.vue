<template>
  <wrap withComp="AnimBlockSlide">

    <h3 class="h5 mb-4">
      Changez d'avatar
    </h3>

    <div class="w-100 custom-file">
      <input type="file" class="w-100 custom-file-input" id="avatar" name="avatar" 
      autofocus
      accept="image/jpg,image/jpeg,image/pdf,image/webp"
      @change="filePreview">
      <label class="w-100 text-left custom-file-label" for="avatar">{{ file ? file : 'Votre image' }}</label>
    </div>

    <div id="preview">
      <img v-if="url" :src="url" />
    </div>

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
    }
  },
  async created() {
    await this.$store.dispatch('chooseSubmit', { backFct: 'postAvatar', submitPath: '/home/profil' });
  }
}
</script>
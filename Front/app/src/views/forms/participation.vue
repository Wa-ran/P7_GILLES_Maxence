<template>
  <wrap withComp="AnimBlockSlide" class="w-100 mb-n3">
    <h3 class="h5">Nouvelle Participation</h3>
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="titre" label="Titre" name="titre"
      type="text" maxlength="50"
      validate required autofocus lazy
      invalidFeedback="Non rempli"/>
    <TextArea
      :hasClass="'d-flex flex-column input-group textarea'" 
      :id="'preview'" :name="'preview'" :label="'Résumé du contenu / Objectif.'"/>
    <TextArea
      :hasClass="'d-flex flex-column input-group textarea'" 
      :id="'article'" :name="'article'" :label="'Article ou premier commentaire.'"
      type="textarea"/>
  </wrap>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';

import Wrap from '@/components/Wrap';
import TextArea from '@/components/TextArea';

export default {
  name: 'participation',
  components: {
    mdbInput,
    Wrap,
    TextArea
  },
  async created() {
    await this.$store.dispatch('chooseSubmit', { backFct: 'postParticipation', submitPath: '/home/groupe/' + this.$route.params.groupeName })
  }
}
</script>
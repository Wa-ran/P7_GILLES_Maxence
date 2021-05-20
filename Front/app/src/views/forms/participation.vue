<template>
  <wrap withComp="AnimBlockSlide" class="w-100 mb-n3 p-3">
    <h3 class="h5">Nouvelle Participation</h3>
    <TextArea
      :id="'titre'" :name="'titre'" :label="'Titre'"
      maxlength="200"/>
    <TextArea
      :id="'preview'" :name="'preview'" :label="'Résumé du contenu / Objectif.'"/>
    <TextArea
      :id="'article'" :name="'article'" :label="'Article ou premier commentaire.'"/>
    
    <div class="w-100 d-flex justify-content-between">
      <div class="w-50">
        <div class="custom-control custom-switch"
        title="Une participation publique permet à n'importe quel utilisateur d'y commenter.">
          <input type="checkbox" class="custom-control-input" id="publique" name="publique">
          <label class="custom-control-label" for="publique">Publique</label>
        </div>
      </div>
      <div class="w-50">
        <div class="custom-control custom-switch"
        title="Cette participation sera mise en avant.">
          <input type="checkbox" class="custom-control-input" id="importance" name="importance">
          <label class="custom-control-label" for="importance">Important</label>
        </div>
      </div>
    </div>
    <InputFileDisplayer/>
  </wrap>
</template>

<script>
import InputFileDisplayer from '@/components/InputFileDisplayer.vue';
import Wrap from '@/components/Wrap';
import TextArea from '@/components/TextArea';

export default {
  name: 'participation',
  components: {
    InputFileDisplayer,
    Wrap,
    TextArea
  },
  async created() {
    await this.$store.dispatch('chooseSubmit', { backFct: 'postParticipation', submitPath: '/home/groupes/' + encodeURIComponent(this.$route.params.groupeProps) })
  }
}
</script>
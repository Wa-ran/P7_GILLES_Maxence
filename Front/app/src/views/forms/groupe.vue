<template>
  <wrap withComp="AnimBlockSlide" class="w-100 mb-n3 p-3">
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="groupe" label="Nom du groupe" name="groupe"
      v-model="groupeName"
      type="text" maxlength="100"
      validate required autofocus lazy
      invalidFeedback="Non rempli"/>
    <TextArea
      :id="'description'" :name="'description'" :label="'Description'"/>
    <div class="custom-control custom-switch"
    title="Un groupe publique permet à n'importe quel utilisateur d'y créer des participations.">
      <input type="checkbox" class="custom-control-input" id="publique" name="publique">
      <label class="custom-control-label" for="publique">Publique</label>
    </div>
    <InputFileDisplayer/>
  </wrap>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';
import InputFileDisplayer from '@/components/InputFileDisplayer.vue';
import TextArea from '@/components/TextArea';
import Wrap from '@/components/Wrap';

export default {
  name: 'groupe',
  components: {
    mdbInput,
    InputFileDisplayer,
    TextArea,
    Wrap
  },
  data() {
    return {
      groupeName: ''
    }
  },
  watch : {
    groupeName() {
      this.$store.dispatch('chooseSubmit', { backFct: 'postGroupe', submitPath: '/home/groupes/' + encodeURIComponent(this.groupeName) });    
    }
  }
}
</script>

<style lang="scss">
.md-form .prefix ~ textarea {
  width: 100% !important;
}
.md-form textarea.md-textarea {
  height: 0;
  border-radius: 5px !important;
  &:focus {
    height: auto;
    border: solid 2px #D4848A !important;
    box-shadow: none !important;
  }
}
</style>
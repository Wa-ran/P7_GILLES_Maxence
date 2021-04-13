<template>
  <wrap withComp="AnimBlockSlide" class="w-100 mb-n3">
    <mdb-input
      class="d-flex input-group gpm-mist" 
      id="groupe" label="Nom du groupe" name="groupe"
      v-model="groupeName"
      type="text" maxlength="100"
      validate required autofocus lazy
      invalidFeedback="Non rempli"/>
    <mdb-input
      class="d-flex flex-column input-group textarea" 
      id="description" name="description" label="Une petite description ?"
      value="Pas de description." @focus="$event.target.select()"
      type="textarea"
      validate required lazy/>
    <div class="custom-control custom-switch"
    title="Un groupe publique permet à n'importe quel utilisateur d'y créer des participations.">
      <input type="checkbox" class="custom-control-input" id="public" name="public">
      <label class="custom-control-label" for="public">Publique</label>
    </div>
  </wrap>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';

import Wrap from '@/components/Wrap';

export default {
  name: 'groupe',
  components: {
    mdbInput,
    Wrap
  },
  data() {
    return {
      groupeName: ''
    }
  },
  watch : {
    groupeName() {
      this.$store.dispatch('chooseSubmit', { backFct: 'postGroupe', submitPath: '/home/groupes/' + this.groupeName });    
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
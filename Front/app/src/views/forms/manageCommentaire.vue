<template>
  <mdbModal centered v-if="showModal">
    <MainForm class="w-100 gpm-attention p-3" :submitButton="'Oui'">

      <ButtonCircle
      @actionBtnCircle="$emit('closeModal')"
      class="gpm-warning gpm-alert-active btnDelete">
        <i class="p-1 fas fa-times fa-2x"></i>
      </ButtonCircle>

      <div class="pt-3 m-auto d-flex flex-column">
        <span class="mb-3">Voulez-vous {{ text }} ce commentaire ?</span>

        <span>" <span class="bold">{{ comm.contenu }}</span> "</span>
        <span class="text-left">de <span class="bold">{{ comm.nom }} {{ comm.prenom }}</span></span>

        <mdbInput :value="comm.id" name="idComm" class="hiddenInput"/>
        <mdbInput :value="comm.userId" name="idCreateur" class="hiddenInput"/>
        <mdbInput v-if="purpose == 'signal'" value="1" name="signal" class="hiddenInput"/>
      </div>

    </MainForm>
  </mdbModal>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';
import mdbModal from 'mdbvue/lib/components/mdbModal';

import ButtonCircle from '@/components/ButtonCircle.vue';
import MainForm from '@/components/MainForm.vue';

export default {
  name: 'manageCommentaire',
  components: {
    mdbInput,
    mdbModal,
    ButtonCircle,
    MainForm
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    purpose: String,
    comm: Object
  },
  computed: {
    text() {
      let text;
      switch (this.purpose) {
        case 'delete':
          text = 'supprimer'
          break;
        case 'signal':
          text = 'signaler'
          break;
        case 'approve':
          text = 'approuver'
          break;
      }
      return text
    }
  },
  methods: {
    async setSubmit() {
      if (this.showModal) {
        if (this.purpose === 'delete') 
          await this.$store.dispatch('chooseSubmit', { backFct: 'deleteCommentaire', submitPath: this.$route.path })
        else
          await this.$store.dispatch('chooseSubmit', { backFct: 'putSignalComment', submitPath: this.$route.path })        
      }
    }
  },
  watch: {
    showModal() {
      this.setSubmit()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal * {
  width: fit-content !important;
  margin: auto;
}

.btnDelete {
  position: absolute;
  right: -0.3rem;
  top: -0.3rem;
}
</style>
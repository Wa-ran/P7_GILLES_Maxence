<template>
  <mdb-modal
  :show="error">

    <div class="px-2 py-3 w-100 gpm-attention">

      <ButtonCircle class="gpm-warning"
      @click.native="endError">
        <i class="p-1 icon-size fas fa-times"></i>
      </ButtonCircle>

      <header class="w-100">
        <h1 class="h5 m-auto">
          Erreur {{ errStatus }}
        </h1>
      </header>

      <hr class="mt-1 mb-3 mx-auto gpm-alert w-75">

      <div class="mx-auto mb-2">
        {{ errMessage }}
      </div>

      <footer class="w-100 d-flex">
        <ButtonPiti class="m-auto gpm-warning"
        @click.native="endError(); $router.go(-1)"
        :text="'Retour'"/>
        <ButtonPiti class="m-auto gpm-warning"
        @click.native="endError"
        :text="'Fermer'"/>
      </footer>
    </div>
    
  </mdb-modal>
</template>

<script>
import mdbModal from 'mdbvue/lib/components/mdbModal';
import ButtonCircle from '@/components/ButtonCircle';
import ButtonPiti from '@/components/ButtonPiti';

export default {
  components: {
    mdbModal,
    ButtonCircle,
    ButtonPiti
  },
  computed: {
    error() {
      return this.$store.state.error.pending
    },
    errStatus() {
      return this.$store.state.error.status
    },
    errMessage() {
      return this.$store.state.error.msg
    }
  },
  methods: {
    endError() {
      this.$store.dispatch('setError', false);
    }
  },
  created() {
    this.endError()
  },
  updated() {
    this.endError()
  },
}
</script>

<style lang="scss" scoped>
.buttonCircle {
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  margin: 0 !important;
}
.icon-size {
  font-size: 1.5rem;
}
</style>
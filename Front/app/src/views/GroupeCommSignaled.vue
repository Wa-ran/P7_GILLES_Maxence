<template>
  <div class="pt-3">
    <div class="spinner-border" role="status" v-if="loading">
      <span class="sr-only">Chargement...</span>
    </div>

    <wrap withComp="AnimBlockSlide" class="mt-n3 w-fit">
      <div class="mb-3">
        <h3 class="pb-3 h5 text-left">
          Commentaires Signalés :
        </h3>
        <div v-for="(comm, index) of signaledList" :key="index" class="d-flex">
          <div class="px-2 pl-5 w-fit rounded z-depth-1 position-relative gpm-lecture">
            <Avatar :userId="comm.user" :imgClass="'rounded avatar-mini-left'"/>
            <router-link :to="comm.idParticipation.toString() + '#' + comm.id">
              {{ comm.contenu }}
            </router-link>
          </div>
        </div>
      </div>
    </wrap>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar';
import Wrap from '@/components/Wrap';

export default {
  name: 'GroupeCommSignaled',
  components: {
    Avatar,
    Wrap
  },
  props: ['groupeProps'],
  computed: {
    loading() {
      return this.$store.state.loading
    },
    signaledList() {
      return this.$store.state.groupeCommSignaled
    }
  },
  async created() {
    await this.$store.dispatch('GPMRequest', { backFct: 'getGroupeCommSignaled', data: this.groupeProps })
  }
}
</script>

<style lang="scss" scoped>
.avatar-mini-left {
  top: -20px;
  left: -5px;
}
</style>
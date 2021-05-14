<template>
  <div class="w-100 pt-3">
    <div class="spinner-border" role="status" v-if="loading">
      <span class="sr-only">Chargement...</span>
    </div>

    <wrap withComp="AnimBlockSlide" class="w-100 mt-n3">
      <h3 class="pb-3 h5 text-left">
        Membres :
      </h3>
      <Commentaire v-for="(member, index) of memberList" :key="index"
      :avatarId="member.id">

        <div class="pt-1 pl-4 ml-2 comm d-flex justify-content-between">
          <span>{{ member.nom }} {{ member.prenom }}</span>
          <span v-if="member.admin == 1" class="admin">
            Administrateur
          </span>
        </div>
      </Commentaire>
    </wrap>
  </div>
</template>

<script>
import Commentaire from '@/components/Commentaire';
import Wrap from '@/components/Wrap';

export default {
  name: 'Member',
  components: {
    Commentaire,
    Wrap
  },
  props: ['groupeProps'],
  computed: {
    loading() {
      return this.$store.state.loading
    },
    memberList() {
      return this.$store.state.groupeMember
    }
  },
  async created() {
    await this.$store.dispatch('GPMRequest', { backFct: 'getGroupeMember', data: this.groupeProps })
  }
}
</script>

<style lang="scss" scoped>
.admin {
  font-weight: bold;
}
</style>
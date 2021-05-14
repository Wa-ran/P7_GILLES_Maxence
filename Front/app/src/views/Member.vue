<template>
  <div class="pt-3">
    <div class="spinner-border" role="status" v-if="loading">
      <span class="sr-only">Chargement...</span>
    </div>

    <wrap withComp="AnimBlockSlide" class="mt-n3 w-fit">
      <div class="mb-3">
        <h3 class="pb-3 h5 text-left">
          Admin :
        </h3>
        <div v-for="(admin, index) of adminList" :key="index" class="d-flex">
          <div class="px-2 pl-5 w-fit rounded bold z-depth-1 position-relative gpm-lecture">
            <Avatar :userId="admin.user" :imgClass="'rounded avatar-mini-left'"/>
            {{ admin.nom }} {{ admin.prenom }}
          </div>
        </div>
      </div>

      <div class="mb-3">
        <h3 class="pb-3 h5 text-left">
          Membres :
        </h3>
        <div v-for="(member, index) of memberList" :key="index" class="d-flex">
          <div class="px-2 pl-5 w-fit rounded bold z-depth-1 position-relative gpm-lecture">
            <Avatar :userId="member.user" :imgClass="'rounded avatar-mini-left'"/>
            {{ member.nom }} {{ member.prenom }}
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
  name: 'Member',
  components: {
    Avatar,
    Wrap
  },
  props: ['groupeProps'],
  computed: {
    loading() {
      return this.$store.state.loading
    },
    memberList() {
      let list = this.$store.state.groupeMember;
      let members = [];
      for (let member of list) {
        if (member.admin === 0) members.push(member)
      }
      return members
    },
    adminList() {
      return this.$store.state.groupeMember
    }
  },
  async created() {
    await this.$store.dispatch('GPMRequest', { backFct: 'getGroupeMember', data: this.groupeProps })
  }
}
</script>

<style lang="scss" scoped>
.avatar-mini-left {
  top: -20px;
  left: -5px;
}
</style>
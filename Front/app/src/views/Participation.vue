<template>
  <div>
    <mdb-card class="mb-3 gpm-default">

      <div class="p-3 w-100">
        <h2 class="h5 m-1">
          {{ infos.titre }}
        </h2>      
      </div>

      <hr class="my-0 mx-auto w-75 black">

      <mdb-card-body class="rounded">
        <div class="h6 p-2">
          {{ infos.preview }}
        </div>
      </mdb-card-body>

    </mdb-card>

    <Commentaire>
      <template #sticker>
        <Avatar :userId="infos.createurId"/>
        <i class="far fa-user mx-1"></i>
        {{ infos.createurNom }} {{ infos.createurPrenom }}
      </template>
      {{ infos.article }}
    </Commentaire>

    <div v-for="comm in commList" :key="comm.id">
      <Commentaire>
        <template #sticker>
          <Avatar :userId="comm.userId"/>
          <i class="far fa-user mx-1"></i>
          {{ comm.nom }} {{ comm.prenom }}
        </template>
        {{ comm.contenu }}
      </Commentaire>
    </div>

    <MainForm class="w-100 z-depth-0 transparent">
      <Commentaire class="w-100">
        <template #sticker>
          Participez !
        </template>

        <TextArea
        class="mt-3 zind1"
        :id="'commentaire'" :name="'contenu'" :label="'Votre commentaire.'"/>
      </Commentaire>
    </Mainform>

  </div>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbCardBody from 'mdbvue/lib/components/mdbCardBody';

import Commentaire from '@/components/Commentaire.vue';
import MainForm from '@/components/MainForm.vue';
import TextArea from '@/components/TextArea.vue';

export default {
  name: 'Participation',
  components: {
    mdbCard,
    mdbCardBody,
    Commentaire,
    MainForm,
    TextArea
  },
  props: ['groupeName', 'participation'],
  computed: {
    infos() {
      return this.$store.state.participationInfos
    },
    commList() {
      return this.$store.state.commentaires
    }
  },
  methods: {
    userContact(id) {
      let contact = this.$store.state.contacts[id];
      return contact.nom + ' ' + contact.prenom
    },
    async getInfos() {
      await this.$store.dispatch('GPMRequest', { backFct: 'getParticipationInfos', data: this.participation })      
    },
    async getComment() {
      await this.$store.dispatch('GPMRequest', { backFct: 'getParticipationComment', data: this.participation })      
    },
    async setSubmit() {
      await this.$store.dispatch('chooseSubmit', { backFct: 'postCommentaire', submitPath: this.$route.path })
    }
  },
  async created() {
    await this.getInfos();
    await this.setSubmit();
    // setInterval(async() => {
      await this.getComment()
    // }, 1000)
  }
}
</script>

<style lang="scss">
.avatar {
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 10;
}
</style>